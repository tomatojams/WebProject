// DB설정파일 가져옴
require("dotenv").config();
// Node js 웹 프레임워크
const express = require("express");
// ORM 직렬화해 DB에 저장하게함 JS 객체 -> JSON
const { Sequelize, DataTypes } = require("sequelize");
// RabbitMQ 상호작용 라이브러리 메세지 큐 비동기작업
const amqp = require("amqplib");
const cors = require("cors");

const app = express();
// JSON 형식으로 요청본문을 자동으로 파싱하기 위한 express.json() 미들웨어사용
app.use(express.json());
app.use(cors());

// MySQL 연결 설정
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

// Drone 모델 정의
const Drone = sequelize.define(
  "Drone",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// 데이터베이스 연결 및 모델 동기화
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection to MySQL has been established successfully.");
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
// 테이블 생성
initializeDatabase();

// 메모리 버퍼 초기화
let buffer = []; // 캐시 버퍼

// 데이터베이스에서 최신 데이터로 버퍼를 업데이트하는 함수
async function updateBuffer() {
  // 새로 추가된 부분
  try {
    const positions = await Drone.findAll({
      order: [["createdAt", "DESC"]], // 최신 데이터가 위로 오도록 정렬
      limit: 5, // 최근 5개 데이터만 가져옴
    });
    buffer = positions; // 버퍼 업데이트
  } catch (error) {
    console.error("Error updating buffer:", error);
  }
}

// 데이터베이스에서 버퍼를 초기화
updateBuffer(); // 새로 추가된 부분

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
          // 파싱
          const position = JSON.parse(msg.content.toString());
          console.log("Received:", position);

          // 드론 데이터 저장
          await Drone.create({
            name: position.droneId,
            latitude: position.latitude,
            longitude: position.longitude,
          });

          // 버퍼 업데이트
          await updateBuffer(); // 새로 추가된 부분

          channel.ack(msg); // 메시지 확인 및 큐에서 제거
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
app.get("/api/positions", (req, res) => {
  // async 제거
  try {
    // 버퍼에서 최신 5개 드론 위치 데이터 제공
    res.json(buffer); // 새로 추가된 부분
  } catch (error) {
    console.error("Error fetching drone positions from buffer:", error); // 새로 추가된 부분
    res.status(500).json({ error: "Internal Server Error" }); // 새로 추가된 부분
  }
});

// Express 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
