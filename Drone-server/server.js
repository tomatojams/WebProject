import dotenv from "dotenv";
import express from "express";
import cors from "cors";
// 로깅 미들웨어
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { messageBuffer, consumeDroneMessage, consumeMarkMessage } from "./consume func/func.js";
import { MarkModel } from "./schema/schema.js";

dotenv.config();
// 폴더루트 변수선언
const root = process.cwd();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(root + `/public`));

app.use(morgan("combined"));

// Swagger setup
const swaggerDocument = YAML.load(path.join(root, "openapi.yaml"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// RabbitMQ 메세지소비
consumeDroneMessage();
consumeMarkMessage();

// 최근 드론 위치 가져오기
app.get("/api/positions", (req, res) => {
  try {
    let sliceNumber = process.env.FETCH_COUNT;
    const recentPositions = messageBuffer.slice(0, sliceNumber);

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
    // 최신 센서 데이터 1개 조회
    const latestSensor = await MarkModel.findOne().sort({ createdAt: -1 }).exec();
    if (latestSensor) {
      // 센서 데이터 반환
      const sensor = {
        id: latestSensor.sensor_id,
        lat: latestSensor.latitude,
        lon: latestSensor.longitude,
        state: latestSensor.state,
      };
      res.json(sensor); // 클라이언트에서 예상하는 형태로 반환
    } else {
      res.status(404).json({ error: "서버에 센서 데이터가 없습니다." });
    }
  } catch (error) {
    console.error("Error fetching sensor:", error);
    res.status(500).json({ error: "센서 데이터를 가져오는 데 실패했습니다." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API doc is http://localhost:${PORT}/docs`);
});
