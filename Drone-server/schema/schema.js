import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const mongoUrl = process.env.MONGODB_LOCAL_URL;

// MongoDB 연결
mongoose
  .connect(mongoUrl)
  .then(() => console.log("DB 연결 성공"))
  .catch((err) => console.error("DB 연결 실패:", err));

// 신버젼 DroneSchema

const DroneStateMessageSchema = new mongoose.Schema(
  {
    message_type: {
      type: String,
      enum: [
        "Track",
        "Takeover",
        "Disconnected",
        "Release",
        "Found",
        "Idle",
        "Takeover Successful",
        "Takeover Failed",
        "Update Info",
        "Tracking drone",
        "Tracking Failed",
        "Mitigation",
        "Mitigation Successful",
        "Mitigation Failed",
        "Manual Takeover",
        "Block Operator",
        "Stop Tracking",
        "Stop Takeover",
        "Stop Mitigation",
        "Tracking disconnected",
        "Revert Takeover",
        "Landing Successful",
      ],
      required: true,
    },
    sender_id: { type: String, required: true }, // 송신자 정보
    timestamp: { type: Number, required: true }, // 타임스탬프 (Unix timestamp)

    // 추가적인 드론 정보는 다른 스키마로 중첩 가능
    drone: {
      drone_id: { type: String, required: false },
      name: { type: String, required: false },
      frequency: { type: Number, required: false },
      bandwidth: { type: Number, required: false },
      allow_track: { type: Boolean, required: false },
      allow_takeover: { type: Boolean, required: false },
      class_name: { type: String, required: false },
      radio_resources: { type: Number, required: false },
      location: {
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false },
        altitude: { type: Number, required: false },
      },
      operator_location: {
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false },
        altitude: { type: Number, required: false },
      },
      home_location: {
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false },
        altitude: { type: Number, required: false },
      },
      speed_ms: { type: Number, required: false },
      ground_or_sky: { type: Number, enum: [0, 1, 2], required: false }, // 0: 지상, 1: 하늘
      rssi: { type: Number, required: false },
    },
  },
  { timestamps: true } // 자동으로 createdAt, updatedAt 생성
);

// ServerMessageType 스키마
const ServerMessageSchema = new mongoose.Schema(
  {
    message_type: {
      type: String,
      enum: ["sync_time", "settings", "categorylist", "Found WEP Key"],
      required: true,
    },
    sender_id: { type: String, required: true },
    timestamp: { type: Number, required: true }, // Unix timestamp
    // 추가적인 서버 관련 메시지 정보를 여기에 추가 가능
  },
  { timestamps: true }
);

// SensorMessageType 스키마
const SensorMessageSchema = new mongoose.Schema(
  {
    message_type: {
      type: String,
      enum: ["Found WEP Packet"],
      required: true,
    },
    sender_id: { type: String, required: true },
    timestamp: { type: Number, required: true }, // Unix timestamp
    // 추가적인 센서 관련 정보를 여기에 추가 가능
  },
  { timestamps: true }
);

// 익스포트 형식 맞추기
const DroneStateMessage = mongoose.model("DroneStateMessage", DroneStateMessageSchema);
const ServerMessage = mongoose.model("ServerMessage", ServerMessageSchema);
const SensorMessage = mongoose.model("SensorMessage", SensorMessageSchema);

export { DroneStateMessage, ServerMessage, SensorMessage };

// // 구버젼 DroneSchema 정의
// const DroneSchema = new mongoose.Schema(
//   {
//     message: {
//       type: String,
//       enum: ["FOUND", "WARNING", "ERROR", "VERIFY", "TEST"],
//       required: true,
//     },
//     sender_id: { type: String, required: true },
//     drone: {
//       name: { type: String, required: false },
//       frequency: { type: Number, required: false },
//       bandwidth: { type: Number, required: false },
//       allow_track: { type: Boolean, required: false },
//       allow_takeover: { type: Boolean, required: false },
//       class_name: { type: String, required: false },
//       radio_resources: { type: Number, required: false },
//       droneId: { type: String, required: false },
//       latitude: { type: Number, required: false },
//       longitude: { type: Number, required: false },
//     },
//   },
//   { timestamps: true }
// );

// const DroneMessage = mongoose.model("ServerMessage", DroneSchema, "server_message");

// MarkSchema 정의
const sensorSchema = new mongoose.Schema(
  {
    sensor_id: { type: String, required: true },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
    state: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

const MarkModel = mongoose.model("Mark", sensorSchema, "marks");

export { MarkModel };
