import axios from "axios";

// 드론 위치 데이터를 가져오는 함수
const fetchDronePositions = async () => {
  try {
    const res = await axios.get("/api/positions"); // 데이터를 비동기적으로 가져옴

    const groupedPositions = res.data.reduce((acc, position) => {
      acc[position.droneId] = position; // 드론 ID를 키로 사용하여 데이터를 그룹화
      return acc;
    }, {});

    return Object.values(groupedPositions).sort((a, b) => a.droneId.localeCompare(b.droneId)); // 드론 ID를 기준으로 정렬된 배열을 반환
  } catch (error) {
    console.error("Error fetching drone positions:", error);
    throw error; // 에러를 클라이언트에서 처리할 수 있도록 throw
  }
};

// 마크 데이터를 가져오는 함수
const fetchMarkData = async () => {
  try {
    const res = await axios.get("/api/marks");
    return res.data; // 데이터 구조가 클라이언트에서 처리할 수 있는 형태여야 합니다
  } catch (error) {
    console.error("Error fetching mark data:", error);
    throw error;
  }
};

// 드론들의 리스트를 가져오는 함수
const fetchDroneList = async () => {
  try {
    const res = await axios.get("/api/dronelist"); // 데이터를 비동기적으로 가져옴
    return res.data;
  } catch (error) {
    console.error("Error fetching drone list:", error);
    throw error;
  }
};

// 센서 리스트를 가져오는 함수
const fetchSensorList = async () => {
  try {
    const res = await axios.get("/api/sensorlist"); // 데이터를 비동기적으로 가져옴
    return res.data;
  } catch (error) {
    console.error("Error fetching sensor list:", error);
    throw error;
  }
};

// 드론 리스트 삭제 함수
const deleteDroneList = async () => {
  try {
    const res = await axios.delete("/api/dronelist"); // 삭제 API 호출
    console.log(res.data.message); // 성공 메시지 출력
  } catch (error) {
    console.error("Error deleting drone list:", error);
  }
};

export { fetchDronePositions, fetchMarkData, fetchDroneList, fetchSensorList, deleteDroneList };
