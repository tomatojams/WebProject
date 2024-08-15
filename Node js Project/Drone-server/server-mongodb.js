require("dotenv").config();

const express = require("express");
const amqp = require("amqplib");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));

const { MongoClient } = require("mongodb");

// MongoDB 연결
let db;
const url = process.env.MONGODB_URL;
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB 연결 성공");
    db = client.db("drone");
  })
  .catch((err) => {
    console.log(err);
  });

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
            
            // 데이터베이스에 비동기적으로 저장 (필요 시)
            db.collection("server_message")
              .insertOne(position)
              .catch((dbError) => {
                console.error("Error saving to MongoDB:", dbError);
              });

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
    // 버퍼에서 최신 5개 드론 위치 데이터를 가져옴
    const recentPositions = messageBuffer.slice(0, 5); // 버퍼의 첫 5개 항목 반환
    res.json(recentPositions); // 클라이언트에게 버퍼 데이터를 반환
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
