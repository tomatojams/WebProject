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
        "Migrate",
      ],
      required: true,
    },
    sender_id: { type: String, required: true }, // 송신자 정보
    timestamp: { type: Number, required: true }, // 타임스탬프 (Unix timestamp)

    // 추가적인 드론 정보는 다른 스키마로 중첩 가능
    drone: {
      droneId: { type: String, required: false }, // 필드명을 droneId로 수정
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
  },
  { timestamps: true }
);

// 새로운 드론 저장
const DroneHistorySchema = new mongoose.Schema(
  {
    droneId: { type: String, required: true },
    name: { type: String, required: true },
    frequency: { type: Number, required: false },
    bandwidth: { type: Number, required: false },
    allow_track: { type: Boolean, required: false },
    allow_takeover: { type: Boolean, required: false },
    class_name: { type: String, required: false },
    radio_resources: { type: Number, required: false },
  },
  { timestamps: true }
);

// MarkSchema 정의
const sensorSchema = new mongoose.Schema(
  {
    sensor_id: { type: String, required: true },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
    state: { type: Boolean, required: false, default: false },
    radius: { type: Number, required: false, default: 100 },
  },
  { timestamps: true }
);
// 유저스키마
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// 몽고DB collection 연결
const DroneHistory = mongoose.model("DroneHistory", DroneHistorySchema, "dronehistorylists");
const SentMessage = mongoose.model("SentMessage", DroneStateMessageSchema);
const DroneStateMessage = mongoose.model("DroneStateMessage", DroneStateMessageSchema);
const ServerMessage = mongoose.model("ServerMessage", ServerMessageSchema);
const SensorMessage = mongoose.model("SensorMessage", SensorMessageSchema);
const UserModel = mongoose.model("User", userSchema);
const MarkModel = mongoose.model("Mark", sensorSchema, "marks");
const SensorListModel = mongoose.model("SensorList", sensorSchema, "sensorlists");
// 추가된부분
const OneTimeSentMessage = mongoose.model(
  "OneTimeSentMessage",
  DroneStateMessageSchema,
  "onetimesentmessages"
);

export {
  MarkModel,
  SensorListModel,
  UserModel,
  DroneStateMessage,
  ServerMessage,
  SensorMessage,
  SentMessage,
  DroneHistory,
  // 추가된부품
  OneTimeSentMessage,
};
