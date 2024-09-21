import dotenv from "dotenv";
import express from "express";
import cors from "cors";
// import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import {
  droneStateMessageBuffer,
  consumeDroneStateMessage,
  consumeMarkMessage,
} from "./consume func/funcNew.js";
import { UserModel, MarkModel, DroneHistory, SensorListModel } from "./schema/schema.js";
import droneRouter from "./router/router.js";

dotenv.config();
const root = process.cwd();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(root + `/public`));
// 로그 미들웨어
// app.use(morgan("combined"));
// 글로벌로 `droneCommands` 변수를 선언
export let droneCommands = {}; // 각 드론의 활성화된 상태를 저장하는 객체
// Swagger setup
const swaggerDocument = YAML.load(path.join(root, "openapi.yaml"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// RabbitMQ 메세지 소비
consumeDroneStateMessage(droneCommands); // 신버전 드론 메시지 소비
consumeMarkMessage();

// 라우터
const router = droneRouter();
app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API doc is http://localhost:${PORT}/docs`);
});
