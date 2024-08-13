// 환경 변수 설정 파일 가져오기
require("dotenv").config();

// Node.js 웹 프레임워크
const express = require("express");
// RabbitMQ 상호작용 라이브러리
const amqp = require("amqplib");
const cors = require("cors");

// Mongoose 라이브러리
const mongoose = require("mongoose");

const app = express();
// JSON 형식으로 요청 본문을 자동으로 파싱하기 위한 express.json() 미들웨어 사용
app.use(express.json());
app.use(cors());

// MongoDB 연결 및 모델 정의
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

const droneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Drone = mongoose.model('Drone', droneSchema);

// RabbitMQ에서 메시지 소비 및 데이터베이스 저장
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
            // 메시지 파싱
            const position = JSON.parse(msg.content.toString());
            console.log("Received message:", position);

            // 드론 데이터 저장
            const result = await Drone.create({
              name: position.droneId,
              latitude: position.latitude,
              longitude: position.longitude,
            });

            // MongoDB에 데이터가 성공적으로 삽입되었음을 로그에 기록
            console.log("Data successfully inserted into MongoDB:", result);

            // 메시지 확인 및 큐에서 제거
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
    // 최신 드론 위치 데이터를 반환하는 API
    res.json({ success: true });
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
