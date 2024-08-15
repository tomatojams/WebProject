require("dotenv").config();

const express = require("express");
const amqp = require("amqplib");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));

// MongoDB Atlas 연결 설정
const mongoUrl = process.env.MONGODB_URL;
mongoose
  .connect(mongoUrl)
  .then(() => console.log("DB 연결 성공"))
  .catch((err) => console.error("DB 연결 실패:", err));

// Mongoose 스키마 및 모델 정의
const positionSchema = new mongoose.Schema(
  {
    droneId: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { timestamps: true }
); // timestamps 옵션으로 createdAt과 updatedAt 자동 추가

const positionSchema2 = new mongoose.Schema({
  messageType: {
    type: String,
    enum: ["INFO", "WARNING", "ERROR", "VERIFY", "TEST"], // 가능한 값들
    required: true,
  },
  sender_Id: { type: String, required: true },
  droneId: { type: String, required: true },

  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  location: { type: String, required: true },
  dron_info: {
    name: { type: String },
    freq: { type: String },
  },
});

// `server_message` 컬렉션을 명시적으로 지정
const Position = mongoose.model(
  "ServerMessage",
  positionSchema,
  "server_message"
);

// 메시지를 버퍼로 임시 저장할 메모리 기반의 큐
const messageBuffer = [];

// RabbitMQ에서 메시지 소비 및 버퍼에 저장
async function consumeDronePosition() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queue = "drone_positions";

    await channel.assertQueue(queue, { durable: false });
    console.log("Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(
      queue,
      async (msg) => {
        if (msg !== null) {
          try {
            const position = JSON.parse(msg.content.toString());
            console.log("Received message:", position);

            // 버퍼에 드론 데이터 저장
            messageBuffer.unshift(position); // 버퍼에 새로운 데이터 추가
            if (messageBuffer.length > 100) {
              // 버퍼 크기 제한 (예: 100개)
              messageBuffer.pop();
            }

            // 데이터베이스에 비동기적으로 저장
            const positionDoc = new Position(position);
            const savedPosition = await positionDoc.save();
            console.log("Position saved to MongoDB:", savedPosition);

            // 메시지가 성공적으로 처리되었으면 확인 메시지를 보냄
            channel.ack(msg);
          } catch (error) {
            console.error("Error processing message:", error);
            channel.nack(msg); // 메시지 실패 처리
          }
        }
      },
      {
        noAck: false,
      }
    );
  } catch (error) {
    console.error("Failed to consume messages:", error);
  }
}

consumeDronePosition();

// API 엔드포인트 추가: 최근 5개 드론 위치 데이터 제공
app.get("/api/positions", async (req, res) => {
  try {
    // MongoDB에서 최신 5개 드론 위치 데이터 가져오기
    const recentPositions = await Position.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .exec();
    res.json(recentPositions); // 클라이언트에게 MongoDB 데이터를 반환
  } catch (error) {
    console.error("Error fetching drone positions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Express 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
