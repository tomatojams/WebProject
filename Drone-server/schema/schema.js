import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const mongoUrl = process.env.MONGODB_LOCAL_URL;

// MongoDB 연결
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

export { DroneMessage, MarkModel };
