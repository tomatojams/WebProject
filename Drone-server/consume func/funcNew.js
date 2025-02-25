import amqp from "amqplib";
import dotenv from "dotenv";
import {
  DroneHistory,
  SentMessage,
  DroneStateMessage,
  MarkModel,
  SensorListModel,
} from "../schema/schema.js";

dotenv.config();
const amqp_url = process.env.AMQP_URL;

// 상태 변수와 타이머 변수 정의
let isReceivingNewFormat = false; // 신버전 메시지를 받고 있는지 여부
let droneStateMessageTimeout;
const DRONE_STATE_MESSAGE_TIMEOUT_INTERVAL = 10000; // 10초

const NEW_BUFFER_SIZE = process.env.BUFFER;
const droneStateMessageBuffer = [];
const trackedNewDrones = new Set();

// 신버전 드론 메시지 소비 함수
const consumeDroneStateMessage = async (droneCommands) => {
  try {
    const connection = await amqp.connect(amqp_url);
    const channel = await connection.createChannel();
    const queue = "Drone_state_message"; // 신버전 메시지 큐

    await channel.assertQueue(queue, { durable: false });
    console.log(`Waiting for drone state messages in ${queue}. To exit press CTRL+C`);

    channel.consume(
      queue,
      async (msg) => {
        if (msg !== null) {
          try {
            const droneStateMessageContent = JSON.parse(msg.content.toString());
            const droneId = droneStateMessageContent.drone.droneId;
            // 메시지 버퍼에 저장 및 DB에 저장
            droneStateMessageBuffer.unshift(droneStateMessageContent);
            if (droneStateMessageBuffer.length > NEW_BUFFER_SIZE) {
              droneStateMessageBuffer.pop();
            }

            // 기존드론 리스트에 없는 드론일때만 1.추적드론에 저장 2.DB에 저장시도
            if (!trackedNewDrones.has(droneId)) {
              trackedNewDrones.add(droneId);
              // DB에 드론이 존재하는지 확인 후 중복이 없다면 저장 (upsert 사용)
              await DroneHistory.findOneAndUpdate(
                { droneId: droneId }, // droneId가 존재하는지 확인
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
                { upsert: true, new: true } // 중복되지 않으면 추가 (업서트)
              );
              console.log(`Drone with ID: ${droneId} saved to DB`);
            }

            const DroneStateMessageDoc = new DroneStateMessage(droneStateMessageContent);
            const savedDroneStateMessage = await DroneStateMessageDoc.save();
            console.log("Drone state message saved");

            // 새로운 기능: 클라이언트에서 활성화된 enum에 따라 메시지 수정 및 전송
            if (droneCommands[droneId]) {

              const activeEnums = Object.keys(droneCommands[droneId]).filter(
                (enumType) => droneCommands[droneId][enumType]
              );

              if (activeEnums.length > 0) {
                for (const enumType of activeEnums) {
                  // 메시지 타입을 클라이언트에서 지정한 enum으로 수정
                  const modifiedMessage = { ...droneStateMessageContent, message_type: enumType };

                  // 1. 전송 전 메시지를 sent_message 콜렉션에 저장 (message_type 만 변경됨)
                  const sentMessageDoc = new SentMessage(modifiedMessage);

                  // 저장 직전에 데이터 확인을 위해 로그 추가
                  console.log("Saving modified message to SentMessage");

                  await sentMessageDoc.save(); // DB에 저장

                  // 2. 수정된 메시지를 다시 RabbitMQ로 전송
                  // const targetQueue = `Modified_${queue}`;
                  const targetQueue = `Client_message`;
                  await channel.assertQueue(targetQueue, { durable: false });
                  channel.sendToQueue(targetQueue, Buffer.from(JSON.stringify(modifiedMessage)));
                  console.log(`Sent modified message with type ${enumType}:`);
                }
              }
              
            }

            channel.ack(msg);
          } catch (error) {
            console.error("Error processing drone state message:", error);
            channel.nack(msg);
          }
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Failed to consume drone state messages:", error);
  }
};

// Mark 메시지 소비 함수
const consumeMarkMessage = async () => {
  try {
    const connection = await amqp.connect(amqp_url);
    const channel = await connection.createChannel();
    const queue = "Mark_message"; // Mark 메시지 큐

    await channel.assertQueue(queue, { durable: false });
    console.log(`Waiting for mark messages in ${queue}. To exit press CTRL+C`);

    channel.consume(
      queue,
      async (msg) => {
        if (msg !== null) {
          if (!isReceivingNewFormat) {
            isReceivingNewFormat = true;
            printStatusNew("Receiving Mark message");
          }

          try {
            const markMessageContent = JSON.parse(msg.content.toString());

            console.log("Received Mark Message:", markMessageContent);

            // 중복 확인 후 새로운 센서 데이터만 sensorlists에 저장
            await SensorListModel.findOneAndUpdate(
              { sensor_id: markMessageContent.sensor_id }, // sensor_id 중복 확인
              {
                $setOnInsert: {
                  sensor_id: markMessageContent.sensor_id,
                  latitude: markMessageContent.latitude,
                  longitude: markMessageContent.longitude,
                  state: markMessageContent.state,
                },
              },
              { upsert: true, new: true } // 중복된 경우 추가하지 않음
            );
            // 중복확인안하고 저장
            const markDoc = new MarkModel(markMessageContent);
            const savedMark = await markDoc.save();

            console.log("Mark message saved:", savedMark);
            channel.ack(msg);
          } catch (error) {
            console.error("Error processing mark message:", error);
            channel.nack(msg); // 에러 발생 시 메시지를 다시 큐에 추가
          }
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Failed to consume mark messages:", error);
  }
};

// 신버전 타이머 리셋 함수
const resetDroneStateMessageTimeout = () => {
  clearTimeout(droneStateMessageTimeout);
  droneStateMessageTimeout = setTimeout(() => {
    isReceivingNewFormat = false;
    printStatusNew("Waiting for new format messages...");
  }, DRONE_STATE_MESSAGE_TIMEOUT_INTERVAL);
};

// 상태 출력 함수 (신버전 메시지)
const printStatusNew = (status) => {
  console.log(`[${getCurrentTime()}] ${status}`);
};

// 현재 시간을 형식에 맞게 반환하는 함수
const getCurrentTime = () => {
  return new Date().toLocaleString();
};

export { droneStateMessageBuffer, consumeDroneStateMessage, consumeMarkMessage };
