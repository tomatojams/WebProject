import amqp from "amqplib";
import dotenv from "dotenv";
import { DroneStateMessage, MarkModel } from "../schema/schema.js";

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
const consumeDroneStateMessage = async () => {
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
          if (!isReceivingNewFormat) {
            isReceivingNewFormat = true;
            printStatusNew("Receiving Drone State message");
          }
          resetDroneStateMessageTimeout(); // 타이머 리셋

          try {
            const droneStateMessageContent = JSON.parse(msg.content.toString());
            droneStateMessageBuffer.unshift(droneStateMessageContent);
            if (droneStateMessageBuffer.length > NEW_BUFFER_SIZE) {
              droneStateMessageBuffer.pop();
            }

            const droneId = droneStateMessageContent.drone.drone_id;
            if (!trackedNewDrones.has(droneId)) {
              trackedNewDrones.add(droneId);
            }

            const DroneStateMessageDoc = new DroneStateMessage(droneStateMessageContent);
            const savedDroneStateMessage = await DroneStateMessageDoc.save();

            console.log("Drone state message saved:", savedDroneStateMessage);
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
