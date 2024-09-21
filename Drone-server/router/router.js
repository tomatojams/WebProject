import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { droneStateMessageBuffer } from "../consume func/funcNew.js";
import { MarkModel, SensorListModel, UserModel, DroneHistory } from "../schema/schema.js";

// import로 받아와도 되지만 매개변수로 받아도 됨
// import { droneCommands } from "../server.js";

const droneRouter = (droneCommands) => {
  const router = express.Router();

  // 최근 드론 위치 가져오기
  router.get("/api/positions", (req, res) => {
    try {
      let sliceNumber = process.env.FETCH_COUNT;
      const recentPositions = droneStateMessageBuffer.slice(0, sliceNumber);

      // 드론 위치 필드를 droneId로 변경
      const filteredPositions = recentPositions.map((position) => ({
        droneId: position.drone.droneId,
        latitude: position.drone.location.latitude,
        longitude: position.drone.location.longitude,
        name: position.drone.name,
      }));

      res.json(filteredPositions);
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
  router.post("/api/drone/control", (req, res) => {
    const { droneId, enum: enumType, command } = req.body;

    if (!droneId || !enumType || !command) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 드론 명령을 처리
    if (command === "start") {
      if (!droneCommands[droneId]) {
        droneCommands[droneId] = {}; // 드론이 처음 등록되었을 때 객체 생성
      }
      droneCommands[droneId][enumType] = true; // 해당 enum을 활성화
    } else if (command === "stop") {
      if (droneCommands[droneId]) {
        droneCommands[droneId][enumType] = false; // 해당 enum을 비활성화
      }
    }

    return res.status(200).json({ message: "Command processed successfully" });
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
