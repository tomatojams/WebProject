import axios from "axios";

// 드론 위치 데이터를 가져오는 함수
const fetchDronePositions = async () => {
  try {
    const res = await axios.get("/api/positions");
    // 데이터를 비동기적으로 가져옴

    const groupedPositions = res.data.reduce((acc, position) => {
      acc[position.droneId] = position;
      // 드론 ID를 키로 사용하여 데이터를 그룹화
      return acc;
    }, {});

    return Object.values(groupedPositions).sort((a, b) => a.droneId.localeCompare(b.droneId));
    // 드론 ID를 기준으로 정렬된 배열을 반환
  } catch (error) {
    console.error("Error fetching drone positions:", error);
    throw error;
    // 에러를 클라이언트에서 처리할 수 있도록 throw
  }
};

// 서버로 드론 제어 명령을 전송하는 함수
const sendControlCommand = async (droneId, enumType, isActive) => {
  try {
    const command = isActive ? "stop" : "start";
    const response = await axios.post("/api/drone/control", {
      droneId: droneId,
      enum: enumType,
      command: command,
    });
    console.log("Command sent:", response.data);
  } catch (error) {
    console.error("Error sending command:", error);
  }
};

// 추가부분
const sendControlCommand2 = async (droneId, enumType, isActive) => {
  try {
    const command = isActive ? "stop" : "start";
    const response = await axios.post("/api/drone/control2", {
      droneId: droneId,
      enum: enumType,
      command: command,
    });
    console.log("Command sent:", response.data);
  } catch (error) {
    console.error("Error sending command:", error);
  }
};

// 개별 드론 정보 가져옴
const fetchSelectedDroneData = async (droneId) => {
  const res = await axios.get(`/api/drone/${droneId}`);
  return res.data;
};

// 마크 데이터를 가져오는 함수
const fetchMarkData = async () => {
  try {
    const res = await axios.get("/api/marks");
    return res.data;
    // 데이터 구조가 클라이언트에서 처리할 수 있는 형태여야 합니다
  } catch (error) {
    console.error("Error fetching mark data:", error);
    throw error;
  }
};

// 드론들의 리스트를 가져오는 함수
const fetchDroneList = async () => {
  try {
    const res = await axios.get("/api/dronelist");
    // 데이터를 비동기적으로 가져옴
    return res.data;
  } catch (error) {
    console.error("Error fetching drone list:", error);
    throw error;
  }
};

// 센서 리스트를 가져오는 함수
const fetchSensorList = async () => {
  try {
    const res = await axios.get("/api/sensorlist");
    // 데이터를 비동기적으로 가져옴
    return res.data;
  } catch (error) {
    console.error("Error fetching sensor list:", error);
    throw error;
  }
};

// 드론 리스트 삭제 함수
const deleteDroneList = async () => {
  try {
    const res = await axios.delete("/api/dronelist");
    // 삭제 API 호출
    console.log(res.data.message);
    // 성공 메시지 출력
  } catch (error) {
    console.error("Error deleting drone list:", error);
  }
};

// Sensor 삭제 API 호출 함수
const deleteSensor = async (sensorId) => {
  try {
    const response = await axios.delete(`/api/sensor/${sensorId}`);
    return response.data;
  } catch (error) {
    throw new Error("Sensor 삭제에 실패했습니다.");
  }
};

// 로그인
const loginfunc = async (id, password) => {
  const response = await axios.post("/api/login", { id, password });
  return response;
};

// 로그인 정보 가져오기 (서버 미구현)
const getSession = async (id) => {
  const response = await axios.post("/api/getsession", { id });
  return response;
};

export {
  fetchDronePositions,
  fetchSelectedDroneData,
  fetchMarkData,
  fetchDroneList,
  fetchSensorList,
  deleteDroneList,
  deleteSensor,
  sendControlCommand,
  // 추가부분
  sendControlCommand2,
  loginfunc,
  getSession,
};
