import axios from "axios";

const fetchDronePositions = async () => {
  const res = await axios.get("/api/positions"); // 데이터를 비동기적으로 가져옴

  const groupedPositions = res.data.reduce((acc, position) => {
    acc[position.droneId] = position; // 드론 ID를 키로 사용하여 데이터를 그룹화
    return acc;
  }, {});

  return Object.values(groupedPositions).sort((a, b) => a.droneId.localeCompare(b.droneId)); // 드론 ID를 기준으로 정렬된 배열을 반환
};

export { fetchDronePositions };
