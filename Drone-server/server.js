require("dotenv").config();

const express = require("express");
const amqp = require("amqplib");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
// 파일 접근을 위한 fs, path 모듈 추가

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));

// morgan 미들웨어 설정: 모든 요청을 콘솔에 로그로 출력
app.use(morgan("combined"));

// MongoDB Atlas 연결 설정
// const mongoUrl = process.env.MONGODB_URL;
const mongoUrl = process.env.MONGODB_LOCAL_URL;
mongoose
  .connect(mongoUrl)
  .then(() => console.log("DB 연결 성공"))
  .catch((err) => console.error("DB 연결 실패:", err));

// Mongoose 스키마 및 모델 정의
const DroneSchema = new mongoose.Schema(
  {
    message: { type: String, enum: ["FOUND", "WARNING", "ERROR", "VERIFY", "TEST"], required: true },
    sender_id: { type: String, required: true },
    drone: {
      name: { type: String, required: false },
      frequency: { type: Number, required: false },
      bandwidth: { type: Number, required: false },
      allow_track: { type: Boolean, required: false },
      allow_takeover: { type: Boolean, required: false },
      class_name: { type: String, required: false },
      radio_resources: { type: Number, required: false },
      droneId: { type: String, required: false },
      latitude: { type: Number, required: false },
      longitude: { type: Number, required: false },
    },
  },
  { timestamps: true }
); // timestamps 옵션으로 createdAt과 updatedAt 자동 추가

// `server_message` 컬렉션을 명시적으로 지정
const DroneMessage = mongoose.model("ServerMessage", DroneSchema, "server_message");

// 메시지를 버퍼로 임시 저장할 메모리 기반의 큐
const BUFFER_SIZE = 30;
const messageBuffer = [];

// 클라이언트 요청을 위한 드론 목록
const trackedDrones = new Set();

// RabbitMQ에서 메시지 소비 및 버퍼에 저장
async function consumeDroneMessage() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queue = "Drone_message";

    await channel.assertQueue(queue, { durable: false });
    console.log("Waiting for messages in %s. To exit press CTRL+C", queue);

    // channel.consume(queue, callback, options)
    channel.consume(
      queue,
      async (msg) => {
        if (msg !== null) {
          try {
            const droneMessageContent = JSON.parse(msg.content.toString());
            console.log("Received message:", droneMessageContent);

            // 버퍼에 드론 데이터 저장
            messageBuffer.unshift(droneMessageContent);
            if (messageBuffer.length > BUFFER_SIZE) {
              messageBuffer.pop();
            }

            // 새로운 드론인지 확인 후 클라이언트에 추가
            const droneId = droneMessageContent.drone.droneId;
            if (!trackedDrones.has(droneId)) {
              trackedDrones.add(droneId);
              // 클라이언트에 새로운 드론 정보를 전송할 수 있음
              console.log(`New drone detected: ${droneId}`);
            }

            // 데이터베이스에 비동기적으로 저장
            const DroneMessageDoc = new DroneMessage(droneMessageContent);
            const savedDroneMessage = await DroneMessageDoc.save();
            console.log("DroneMessage saved to MongoDB:", savedDroneMessage);

            // 메시지가 성공적으로 처리되었으면 sender에게확인 메시지를 보냄
            channel.ack(msg);
          } catch (error) {
            console.error("Error processing message:", error);
            //에러나도
            channel.nack(msg);
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

consumeDroneMessage();

// API 엔드포인트 추가: 최근 5개 드론 위치 데이터 제공
app.get("/api/positions", (req, res) => {
  try {
    // 메모리 버퍼에서 최신 5개 드론 위치 데이터 가져오기
    const recentPositions = messageBuffer.slice(0, 5);

    // 최근 클라이언트 요청 기록
    lastClientRequest = {
      timestamp: new Date(),
      endpoint: "/api/positions",
      method: req.method,
      query: req.query,
    };

    // 클라이언트에게 보내줄 데이터 필터링
    const filteredPositions = recentPositions.map((position) => ({
      droneId: position.drone.droneId,
      latitude: position.drone.latitude,
      longitude: position.drone.longitude,
      name: position.drone.name, // 이름 필드 추가
    }));

    res.json(filteredPositions); // 필터링된 데이터를 클라이언트에게 반환
  } catch (error) {
    console.error("Error fetching drone positions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 드론 ID를 기준으로 세부 정보 제공
app.get("/api/drone/:droneId", async (req, res) => {
  const { droneId } = req.params;

  try {
    // 메모리 버퍼에서 드론 ID로 데이터를 검색
    const droneMessage = messageBuffer.find((msg) => msg.drone.droneId === droneId);

    if (!droneMessage) {
      return res.status(404).json({ error: "Drone not found" });
    }

    // 클라이언트에게 드론 세부 정보 반환
    res.json(droneMessage);
  } catch (error) {
    console.error("Error fetching drone details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Express 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});