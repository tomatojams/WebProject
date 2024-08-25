import dotenv from "dotenv";
import express from "express";
import amqp from "amqplib";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

dotenv.config();
const root = process.cwd();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(root + `/public`));

app.use(morgan("combined"));

const mongoUrl = process.env.MONGODB_LOCAL_URL;
mongoose
  .connect(mongoUrl)
  .then(() => console.log("DB 연결 성공"))
  .catch((err) => console.error("DB 연결 실패:", err));

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

const BUFFER_SIZE = 30;
const messageBuffer = [];
const trackedDrones = new Set();

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
            console.log("Received message:", droneMessageContent);

            messageBuffer.unshift(droneMessageContent);
            if (messageBuffer.length > BUFFER_SIZE) {
              messageBuffer.pop();
            }

            const droneId = droneMessageContent.drone.droneId;
            if (!trackedDrones.has(droneId)) {
              trackedDrones.add(droneId);
              console.log(`New drone detected: ${droneId}`);
            }

            const DroneMessageDoc = new DroneMessage(droneMessageContent);
            const savedDroneMessage = await DroneMessageDoc.save();
            console.log("DroneMessage saved to MongoDB:", savedDroneMessage);

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

consumeDroneMessage();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
