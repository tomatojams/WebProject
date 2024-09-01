import axios from "axios";

// 드론 위치 데이터를 가져오는 함수
const fetchDronePositions = async () => {
  const res = await axios.get("/api/positions"); // 데이터를 비동기적으로 가져옴

  const groupedPositions = res.data.reduce((acc, position) => {
    acc[position.droneId] = position; // 드론 ID를 키로 사용하여 데이터를 그룹화
    return acc;
  }, {});

  return Object.values(groupedPositions).sort((a, b) => a.droneId.localeCompare(b.droneId)); // 드론 ID를 기준으로 정렬된 배열을 반환
};

// 마크 데이터를 가져오는 함수
const fetchMarkData = async () => {
  const res = await axios.get("/api/marks");
  return res.data; // 데이터 구조가 클라이언트에서 처리할 수 있는 형태여야 합니다
};


export { fetchDronePositions, fetchMarkData };
