// Drone 메시지 소비
import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();
const amqp_url = process.env.AMQP_URL;

// 상태 변수와 타이머 변수 정의
let isReceiving = false; // 메시지를 받고 있는지 여부
let markMessageTimeout;
const MARK_MESSAGE_TIMEOUT_INTERVAL = 10000; // 10초

let markBuffer = null; // 전역 변수로 설정
const BUFFER_SIZE = 30;
const messageBuffer = [];
const trackedDrones = new Set();
import { DroneMessage, MarkModel } from "../schema/schema.js";

const consumeDroneMessage = async () => {
  try {
    const connection = await amqp.connect(amqp_url);
    const channel = await connection.createChannel();
    const queue = "Drone_message";

    await channel.assertQueue(queue, { durable: false });
    console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(
      queue,
      async (msg) => {
        if (msg !== null) {
          if (!isReceiving) {
            isReceiving = true;
            printStatus("Receiving Drone message"); // 처음 메시지 받을 때만 출력
          }
          resetMarkMessageTimeout(); // 타이머 리셋

          try {
            const droneMessageContent = JSON.parse(msg.content.toString());
            messageBuffer.unshift(droneMessageContent);
            if (messageBuffer.length > BUFFER_SIZE) {
              messageBuffer.pop();
            }

            const droneId = droneMessageContent.drone.droneId;
            if (!trackedDrones.has(droneId)) {
              trackedDrones.add(droneId);
            }

            const DroneMessageDoc = new DroneMessage(droneMessageContent);
            const savedDroneMessage = await DroneMessageDoc.save();

            channel.ack(msg);
          } catch (error) {
            console.error("Error processing message:", error);
            channel.nack(msg);
          }
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Failed to consume messages:", error);
  }
};

// Mark 메시지 소비
const consumeMarkMessage = async () => {
  try {
    const connection = await amqp.connect(amqp_url);
    const channel = await connection.createChannel();
    const queue = "Mark_message";

    await channel.assertQueue(queue, { durable: false });
    console.log(`Waiting for mark messages in ${queue}. To exit press CTRL+C`);

    resetMarkMessageTimeout(); // 초기 타이머 설정

    channel.consume(
      queue,
      async (msg) => {
        if (msg !== null) {
          if (!isReceiving) {
            isReceiving = true;
            printStatus("Receiving Sonsor message"); // 처음 메시지 받을 때만 출력
          }
          resetMarkMessageTimeout(); // 타이머 리셋

          try {
            const markMessageContent = JSON.parse(msg.content.toString());
            markBuffer = {
              ...markBuffer,
              mark2: markMessageContent,
            };

            const MarkDoc = new MarkModel(markBuffer);
            const savedMark = await MarkDoc.save();

            channel.ack(msg);
          } catch (error) {
            console.error("Error processing mark message:", error);
            channel.nack(msg);
          }
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Failed to consume mark messages:", error);
  }
};

// 타이머 리셋 함수
const resetMarkMessageTimeout = () => {
  clearTimeout(markMessageTimeout);
  markMessageTimeout = setTimeout(() => {
    isReceiving = false;
    printStatus("Waiting for Drone messages..."); // 10초 이상 메시지가 없으면 출력
  }, MARK_MESSAGE_TIMEOUT_INTERVAL);
};

// 상태 출력 함수
const printStatus = (status) => {
  console.log(`[${getCurrentTime()}] ${status}`);
};

// 현재 시간을 형식에 맞게 반환하는 함수
const getCurrentTime = () => {
  return new Date().toLocaleString();
};

export { markBuffer, messageBuffer, consumeDroneMessage, consumeMarkMessage };
