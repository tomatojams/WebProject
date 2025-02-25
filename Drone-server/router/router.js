import express from "express";
import dotenv from "dotenv";
import amqp from "amqplib";
dotenv.config();

const amqp_url = process.env.AMQP_URL;

import { droneStateMessageBuffer } from "../consume func/funcNew_ver2.js";
import { MarkModel, SensorListModel, UserModel, DroneHistory, OneTimeSentMessage } from "../schema/schema.js";


const droneRouter = () => {
  const router = express.Router();

  // 최근 드론 위치 가져오기
  router.get("/api/positions", (req, res) => {
    try {
      const currentTime = Date.now(); // 현재 시간 (Unix timestamp)
      const sliceNumber = process.env.FETCH_COUNT || 10; // 가져올 메시지 개수 (기본값 10)
      const expirationTime = process.env.DRONE_EXPIRATION_TIME || 30000; // 드론 데이터 유효 시간 (기본값 30초)

      // 최신 sliceNumber 만큼의 메시지 가져오기
      const recentPositions = droneStateMessageBuffer.slice(0, sliceNumber);

      // expirationTime 이내의 메시지만 필터링 후, 배열의 뒤에서부터 덮어씌움
      const filteredPositions = recentPositions
        .filter((position) => currentTime - position.timestamp <= expirationTime) // 설정된 시간 이내 데이터만 남김
        .reduceRight((acc, position) => {
          // reduceRight를 사용하여 뒤에서부터 처리
          const { droneId } = position.drone;
          acc[droneId] = {
            droneId,
            latitude: position.drone.location.latitude,
            longitude: position.drone.location.longitude,
            name: position.drone.name,
          };
          return acc;
        }, {});

      // 객체의 값들을 배열로 변환하여 응답
      res.json(Object.values(filteredPositions));
    } catch (error) {
      console.error("Error fetching drone positions:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  router.get("/api/drone/:droneId", (req, res) => {
    const { droneId } = req.params;

    try {
      const droneMessage = droneStateMessageBuffer.find((msg) => msg.drone.droneId === droneId);

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
  router.get("/api/marks", async (req, res) => {
    try {
      const latestSensor = await MarkModel.findOne().sort({ createdAt: -1 }).exec();
      if (latestSensor) {
        const sensor = {
          id: latestSensor.sensor_id,
          lat: latestSensor.latitude,
          lon: latestSensor.longitude,
          state: latestSensor.state,
        };
        res.json(sensor);
      } else {
        res.status(404).json({ error: "서버에 센서 데이터가 없습니다." });
      }
    } catch (error) {
      console.error("Error fetching sensor:", error);
      res.status(500).json({ error: "센서 데이터를 가져오는 데 실패했습니다." });
    }
  });

  // 송신명령

  router.post("/api/drone/control2", async (req, res) => {
    const { droneId, enum: enumType, command } = req.body;
  
    if (!droneId || !enumType || !command) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    try {
      // 1. 드론 정보를 DB에서 조회
      const droneInfo = await DroneHistory.findOne({ droneId });
  
      if (!droneInfo) {
        return res.status(404).json({ error: "Drone not found" });
      }
  
      // 2. 드론 정보를 사용해 나머지 필드 채우기
      const commandRecord = new OneTimeSentMessage({
        message_type: enumType,
        sender_id: "Client", // 송신자 정보
        timestamp: Date.now(), 
        drone: {
          droneId: droneInfo.droneId,
          name: droneInfo.name,
          frequency: droneInfo.frequency,
          bandwidth: droneInfo.bandwidth,
          allow_track: droneInfo.allow_track,
          allow_takeover: droneInfo.allow_takeover,
          class_name: droneInfo.class_name,
          radio_resources: droneInfo.radio_resources,
          location: droneInfo.location, 
          operator_location: droneInfo.operator_location, 
          home_location: droneInfo.home_location, 
          speed_ms: droneInfo.speed_ms, 
          ground_or_sky: droneInfo.ground_or_sky, 
          rssi: droneInfo.rssi, 
        },
      });
  
      // 3. 명령을 DB에 저장
      await commandRecord.save();
  
      // 4. RabbitMQ로 메시지 전송
      const connection = await amqp.connect(amqp_url);
      const channel = await connection.createChannel();
      const queue = "Client_message";
  
      await channel.assertQueue(queue, { durable: false });
  
      const messageToSend = {
        droneId,
        enum: enumType,
        command,
        timestamp: Date.now(),
      };
  
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(messageToSend)));
      console.log(`Sent message to RabbitMQ: ${JSON.stringify(messageToSend)}`);
  
      return res.status(200).json({ message: "Command processed and sent to RabbitMQ successfully" });
    } catch (error) {
      console.error("Error processing drone control command:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  
  // 드론 리스트 가져오기

  router.get("/api/dronelist", async (req, res) => {
    try {
      const drones = await DroneHistory.find({}).sort({ createdAt: -1 }).exec(); // 모든 새로운 드론 정보 가져오기
      if (drones.length > 0) {
        res.json(drones);
      } else {
        // 데이터가 없을 때 빈 배열을 반환
        res.status(200).json([]);
      }
    } catch (error) {
      console.error("Error fetching new drones:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // 드론 리스트 전체 삭제
  router.delete("/api/dronelist", async (req, res) => {
    try {
      const result = await DroneHistory.deleteMany({}); // 모든 드론 데이터를 삭제
      res
        .status(200)
        .json({ message: "All drones deleted successfully", deletedCount: result.deletedCount });
    } catch (error) {
      console.error("Error deleting drone list:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // 센서 리스트 가져오기
  router.get("/api/sensorlist", async (req, res) => {
    try {
      const sensors = await SensorListModel.find({}).sort({ createdAt: -1 }).exec(); // 모든 새로운 센서 정보 가져오기
      if (sensors.length > 0) {
        res.json(sensors);
      } else {
        res.status(404).json({ error: "No sensor data available." });
      }
    } catch (error) {
      console.error("Error fetching new sensors:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // 센서 삭제 API
  router.delete("/api/sensor/:sensor_id", async (req, res) => {
    const { sensor_id } = req.params;

    try {
      // 센서를 sensor_id로 찾아서 삭제
      const result = await SensorListModel.findOneAndDelete({ sensor_id });

      if (result) {
        res.status(200).json({ message: `Sensor with ID ${sensor_id} deleted successfully.` });
      } else {
        res.status(404).json({ error: "Sensor not found." });
      }
    } catch (error) {
      console.error("Error deleting sensor:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // 센서 반경 업데이트 API
  router.put("/api/sensor/:sensor_id", async (req, res) => {
    const { sensor_id } = req.params;
    const { radius } = req.body;
    console.log("Received radius value:", radius);
    // radius가 없거나 숫자가 아니면 오류 반환
    if (radius == null || typeof radius !== "number" || radius <= 0) {
      return res.status(400).json({ error: "Invalid radius value." });
    }

    try {
      const updatedSensor = await SensorListModel.findOneAndUpdate(
        { sensor_id },
        { radius },
        { new: true }
      );

      if (updatedSensor) {
        res.status(200).json({ message: "Radius updated successfully.", sensor: updatedSensor });
      } else {
        res.status(404).json({ error: "Sensor not found." });
      }
    } catch (error) {
      console.error("Error updating sensor radius:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // 로그인 API
  router.post("/api/login", async (req, res) => {
    const { id, password } = req.body;

    try {
      // MongoDB에서 유저 찾기
      const user = await UserModel.findOne({ id });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // 비밀번호 비교
      if (user.password !== password) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // 로그인 성공
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router;
};

export default droneRouter;
