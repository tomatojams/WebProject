import amqp from "amqplib";
import dotenv from "dotenv";
import { DroneHistory, DroneStateMessage, MarkModel, SensorListModel } from "../schema/schema.js";

dotenv.config();
const amqp_url = process.env.AMQP_URL;

// 상수 정의
const DRONE_STATE_MESSAGE_TIMEOUT_INTERVAL = 10000; // 타임아웃 간격 (10초)
const NEW_BUFFER_SIZE = process.env.BUFFER; // 드론 메시지 버퍼 크기

// 상태 변수 정의
let isReceivingNewFormat = false; // 신버전 메시지를 받고 있는지 여부
const droneStateMessageBuffer = []; // 드론 상태 메시지 버퍼
const trackedNewDrones = new Set(); // 추적된 새로운 드론 ID 저장

// 유틸리티 함수
const printStatusNew = (status) => {
  // 상태 메시지를 출력
  console.log(`[${getCurrentTime()}] ${status}`);
};

const getCurrentTime = () => {
  // 현재 시간을 반환
  return new Date().toLocaleString();
};

// 데이터베이스 작업
const saveDroneStateMessage = async (droneStateMessageContent) => {
  // 드론 메시지 저장 로직
  const droneId = droneStateMessageContent.drone.droneId;

  // 메시지를 버퍼에 추가
  droneStateMessageBuffer.unshift(droneStateMessageContent);
  if (droneStateMessageBuffer.length > NEW_BUFFER_SIZE) {
    droneStateMessageBuffer.pop(); // 버퍼 크기를 초과하면 오래된 메시지 제거
  }

  // 새로운 드론 ID인지 확인하고 처리
  if (!trackedNewDrones.has(droneId)) {
    trackedNewDrones.add(droneId); // 새로운 드론 ID를 추적 목록에 추가
    await DroneHistory.findOneAndUpdate(
      { droneId: droneId },
      {
        $setOnInsert: {
          droneId: droneId,
          name: droneStateMessageContent.drone.name,
          frequency: droneStateMessageContent.drone.frequency,
          bandwidth: droneStateMessageContent.drone.bandwidth,
          allow_track: droneStateMessageContent.drone.allow_track,
          allow_takeover: droneStateMessageContent.drone.allow_takeover,
          class_name: droneStateMessageContent.drone.class_name,
          radio_resources: droneStateMessageContent.drone.radio_resources,
        },
      },
      { upsert: true, new: true } // 중복되지 않으면 새로운 데이터로 추가
    );
    console.log(`Drone with ID: ${droneId} saved to DB`);
  }

  // 드론 상태 메시지를 데이터베이스에 저장
  const DroneStateMessageDoc = new DroneStateMessage(droneStateMessageContent);
  await DroneStateMessageDoc.save();
  console.log("Drone state message saved");
};

const saveMarkMessage = async (markMessageContent) => {
  // 마크 메시지 저장 로직
  await SensorListModel.findOneAndUpdate(
    { sensor_id: markMessageContent.sensor_id },
    {
      $setOnInsert: {
        sensor_id: markMessageContent.sensor_id,
        latitude: markMessageContent.latitude,
        longitude: markMessageContent.longitude,
        state: markMessageContent.state,
      },
    },
    { upsert: true, new: true } // 중복되지 않으면 새로운 데이터로 추가
  );

  // 마크 메시지를 데이터베이스에 저장
  const markDoc = new MarkModel(markMessageContent);
  const savedMark = await markDoc.save();
  console.log("Mark message saved:", savedMark);
};

// 메시지 소비 함수
const consumeDroneStateMessage = async () => {
  try {
    const connection = await amqp.connect(amqp_url); // RabbitMQ 연결
    const channel = await connection.createChannel(); // 채널 생성
    const queue = "Drone_state_message"; // 드론 상태 메시지 큐 이름

    await channel.assertQueue(queue, { durable: false }); // 큐가 존재하지 않으면 생성
    console.log(`Waiting for drone state messages in ${queue}. To exit press CTRL+C`);

    channel.consume(
      queue,
      async (msg) => {
        if (msg !== null) {
          try {
            const droneStateMessageContent = JSON.parse(msg.content.toString()); // 메시지 파싱
            await saveDroneStateMessage(droneStateMessageContent); // 메시지 저장
            channel.ack(msg); // 메시지 처리 확인
          } catch (error) {
            console.error("Error processing drone state message:", error);
            channel.nack(msg); // 에러 발생 시 메시지 다시 큐로 반환
          }
        }
      },
      { noAck: false } // 메시지 자동 확인 비활성화
    );
  } catch (error) {
    console.error("Failed to consume drone state messages:", error);
  }
};

const consumeMarkMessage = async () => {
  try {
    const connection = await amqp.connect(amqp_url); // RabbitMQ 연결
    const channel = await connection.createChannel(); // 채널 생성
    const queue = "Mark_message"; // 마크 메시지 큐 이름

    await channel.assertQueue(queue, { durable: false }); // 큐가 존재하지 않으면 생성
    console.log(`Waiting for mark messages in ${queue}. To exit press CTRL+C`);

    channel.consume(
      queue,
      async (msg) => {
        if (msg !== null) {
          if (!isReceivingNewFormat) {
            isReceivingNewFormat = true; // 신버전 메시지 상태로 전환
            printStatusNew("Receiving Mark message"); // 상태 출력
          }

          try {
            const markMessageContent = JSON.parse(msg.content.toString()); // 메시지 파싱
            console.log("Received Mark Message:", markMessageContent);
            await saveMarkMessage(markMessageContent); // 메시지 저장
            channel.ack(msg); // 메시지 처리 확인
          } catch (error) {
            console.error("Error processing mark message:", error);
            channel.nack(msg); // 에러 발생 시 메시지 다시 큐로 반환
          }
        }
      },
      { noAck: false } // 메시지 자동 확인 비활성화
    );
  } catch (error) {
    console.error("Failed to consume mark messages:", error);
  }
};

export { droneStateMessageBuffer, consumeDroneStateMessage, consumeMarkMessage };
