import dotenv from "dotenv";
import express from "express";
import amqp from "amqplib";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import axios from "axios";
import wifi from "node-wifi"; // Wi-Fi 정보 추적을 위해 사용
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

dotenv.config();
const root = process.cwd();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(root + `/public`));

app.use(morgan("combined"));

// Swagger setup
const swaggerDocument = YAML.load(path.join(root, "openapi.yaml"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MongoDB 연결
const mongoUrl = process.env.MONGODB_LOCAL_URL;
mongoose
  .connect(mongoUrl)
  .then(() => console.log("DB 연결 성공"))
  .catch((err) => console.error("DB 연결 실패:", err));

// DroneSchema 정의
const DroneSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      enum: ["FOUND", "WARNING", "ERROR", "VERIFY", "TEST"],
      required: true,
    },
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
);

const DroneMessage = mongoose.model("ServerMessage", DroneSchema, "server_message");

// MarkSchema 정의
const MarkSchema = new mongoose.Schema(
  {
    mark1: { latitude: Number, longitude: Number }, // 서버 위치
    mark2: { latitude: Number, longitude: Number }, // 센서 위치
    mark3: { latitude: Number, longitude: Number }, // 클라이언트 위치
  },
  { timestamps: true }
);

const MarkModel = mongoose.model("Mark", MarkSchema, "marks");

let markBuffer = null; // 전역 변수로 설정
const BUFFER_SIZE = 30;
const messageBuffer = [];
const trackedDrones = new Set();

// Wi-Fi 설정 초기화
wifi.init({
  iface: null, // 기본 인터페이스를 사용
});

// 카카오 API를 사용하여 IP 기반으로 위치 추적
const getLocationByKakao = async () => {
  try {
    // IP 정보를 얻음
    const response = await axios.get("https://ipinfo.io/json", {
      headers: { Authorization: `Bearer ${process.env.IPINFO_API_TOKEN}` },
    });
    const ip = response.data.ip;

    // 카카오 API 호출
    const geoResponse = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=<longitude>&y=<latitude>`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
          KA: "sdk/1.0 os/javascript origin=http://localhost:5000",
        },
      }
    );

    const loc = geoResponse.data.documents[0];
    return {
      latitude: parseFloat(loc.y),
      longitude: parseFloat(loc.x),
    };
  } catch (error) {
    console.error("카카오 API를 통한 위치 조회 실패:", error);
    return null;
  }
};


// 서버 위치 갱신 함수
const updateServerLocation = async () => {
  let location = null;

  try {
    // Wi-Fi 정보를 가져옴
    const networks = await wifi.scan();
    if (networks.length > 0) {
      console.log("Available Wi-Fi networks:", networks.map((net) => net.ssid).join(", "));
      // Wi-Fi 기반으로 위치를 얻는 로직이 있으면 여기에 추가 가능
    } else {
      console.warn("No Wi-Fi networks found. Falling back to Kakao API-based location.");
    }
  } catch (error) {
    console.error("Wi-Fi 기반 위치 추적 실패:", error.message);
  }

  // 카카오 API 기반으로 위치를 얻음
  location = await getLocationByKakao();

  if (location) {
    markBuffer = {
      ...markBuffer,
      mark1: location,
    };
    console.log("Server location updated:", markBuffer.mark1);
  } else {
    console.error("서버 위치를 가져오지 못했습니다.");
  }
};

// 10초마다 서버 위치 갱신
setInterval(updateServerLocation, 10000);

// Drone 메시지 소비
const consumeDroneMessage = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queue = "Drone_message";

    await channel.assertQueue(queue, { durable: false });
    console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(
      queue,
      async (msg) => {
        if (msg !== null) {
          try {
            const droneMessageContent = JSON.parse(msg.content.toString());
            // console.log("Received message:", droneMessageContent);

            messageBuffer.unshift(droneMessageContent);
            if (messageBuffer.length > BUFFER_SIZE) {
              messageBuffer.pop();
            }

            const droneId = droneMessageContent.drone.droneId;
            if (!trackedDrones.has(droneId)) {
              trackedDrones.add(droneId);
              // console.log(`New drone detected: ${droneId}`);
            }

            const DroneMessageDoc = new DroneMessage(droneMessageContent);
            const savedDroneMessage = await DroneMessageDoc.save();
            // console.log("DroneMessage saved to MongoDB:", savedDroneMessage);

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
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queue = "Mark_message";

    await channel.assertQueue(queue, { durable: false });
    console.log(`Waiting for mark messages in ${queue}. To exit press CTRL+C`);

    channel.consume(
      queue,
      async (msg) => {
        if (msg !== null) {
          try {
            const markMessageContent = JSON.parse(msg.content.toString());
            // console.log("Received mark message:", markMessageContent);

            markBuffer = {
              ...markBuffer,
              mark2: markMessageContent,
            };

            const MarkDoc = new MarkModel(markBuffer);
            const savedMark = await MarkDoc.save();
            // console.log("Mark saved to MongoDB:", savedMark);

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

consumeDroneMessage();
consumeMarkMessage();

// 최근 드론 위치 가져오기
app.get("/api/positions", (req, res) => {
  try {
    const recentPositions = messageBuffer.slice(0, 5);

    const filteredPositions = recentPositions.map((position) => ({
      droneId: position.drone.droneId,
      latitude: position.drone.latitude,
      longitude: position.drone.longitude,
      name: position.drone.name,
    }));

    res.json(filteredPositions);
  } catch (error) {
    console.error("Error fetching drone positions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 특정 드론의 위치 가져오기
app.get("/api/drone/:droneId", (req, res) => {
  const { droneId } = req.params;

  try {
    const droneMessage = messageBuffer.find((msg) => msg.drone.droneId === droneId);

    if (!droneMessage) {
      return res.status(404).json({ error: "Drone not found" });
    }

    res.json(droneMessage);
  } catch (error) {
    console.error("Error fetching drone details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 마크 데이터 가져오기
app.get("/api/marks", async (req, res) => {
  try {
    if (markBuffer) {
      res.json(markBuffer);
    } else {
      const latestMark = await MarkModel.findOne().sort({ createdAt: -1 }).exec();
      if (latestMark) {
        res.json(latestMark);
      } else {
        res.status(404).json({ error: "No marks found" });
      }
    }
  } catch (error) {
    console.error("Error fetching marks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API doc is http://localhost:${PORT}/docs`);
});
