// 가상 드론 위치 데이터를 생성하는 함수
const generateMockDronePosition = (droneId, name, latitude, longitude) => {
  return {
    droneId,
    name,
    latitude: latitude + (Math.random() - 0.5) * 0.0002, // 위치를 조금씩 변동
    longitude: longitude + (Math.random() - 0.5) * 0.0002,
    frequency: 2452,
    bandwidth: 5,
    allow_track: true,
    allow_takeover: true,
    class_name: "Air",
    radio_resources: 1,
    location: {
      latitude,
      longitude,
      altitude: Math.random() * 100, // 랜덤 고도 값
    },
    speed_ms: Math.random() * 15, // 임의의 속도 값
    ground_or_sky: 1, // 하늘 상태로 설정 (0: 지상, 1: 하늘)
    rssi: Math.random() * 100, // 신호 강도 값
  };
};

// 가상 센서 데이터를 생성하는 함수
const generateMockSensorData = () => {
  return {
    id: `sensor-${Date.now()}`, // 서버에서 보내는 sensor_id는 id로 변환
    lat: 37.5665, // 센서를 드론의 고정된 중심 좌표에 고정
    lon: 126.978, // 고정된 longitude
    state: Math.random() > 0.5, // 상태는 랜덤으로 설정
  };
};

// 드론 위치 데이터를 가상으로 생성하는 함수
const fetchDronePositions = async () => {
  try {
    // 가상 드론 데이터 생성
    const mockData = [
      generateMockDronePosition("64:60:1f:7a:b0:5e", "Mavic Air", 37.5665, 126.978),
      generateMockDronePosition("12:34:56:78:9a:bc", "Phantom 4", 37.5667, 126.9782),
      generateMockDronePosition("a1:b2:c3:d4:e5:f6", "Inspire 2", 37.5668, 126.9784),
      generateMockDronePosition("11:22:33:44:55:66", "Mavic Mini", 37.5669, 126.9786),
      generateMockDronePosition("a7:b8:c9:d0:e1:f2", "DJI Spark", 37.567, 126.9788), // 추가된 드론
      generateMockDronePosition("b3:c4:d5:e6:f7:g8", "DJI Matrice", 37.5671, 126.979), // 추가된 드론
    ];

    return mockData.sort((a, b) => a.droneId.localeCompare(b.droneId)); // 드론 ID를 기준으로 정렬된 배열을 반환
  } catch (error) {
    console.error("Error fetching drone positions:", error);
    throw error;
  }
};

// 개별 드론 정보 가져오기 함수
const fetchSelectedDroneData = async (droneId) => {
  try {
    const droneStateMessageBuffer = await fetchDronePositions(); // 위치 정보로부터 버퍼 생성
    const droneMessage = droneStateMessageBuffer.find((drone) => drone.droneId === droneId);

    if (!droneMessage) {
      throw new Error("Drone not found");
    }

    // 서버 형식에 맞춰서 세부 드론 정보 제공
    const droneDetail = {
      message_type: "Update Info",
      sender_id: "2acc44fa47a63222241391a15a0d086365da5aa8efd1d505d99beb5e2436ed85",
      timestamp: Date.now(),
      drone: {
        droneId: droneMessage.droneId,
        name: droneMessage.name,
        frequency: droneMessage.frequency,
        bandwidth: droneMessage.bandwidth,
        allow_track: droneMessage.allow_track,
        allow_takeover: droneMessage.allow_takeover,
        class_name: droneMessage.class_name,
        radio_resources: droneMessage.radio_resources,
        location: droneMessage.location,
        speed_ms: droneMessage.speed_ms,
        ground_or_sky: droneMessage.ground_or_sky,
        rssi: droneMessage.rssi,
      },
    };

    return droneDetail;
  } catch (error) {
    console.error("Error fetching drone details:", error);
    throw error;
  }
};

// 가상 마크 데이터를 생성하는 함수 (단일 객체로 반환)
const fetchMarkData = async () => {
  try {
    const mockData = generateMockSensorData(); // 객체로 반환
    return mockData;
  } catch (error) {
    console.error("Error fetching mark data:", error);
    throw error;
  }
};

// 가상 드론 리스트를 가져오는 함수
const fetchDroneList = async () => {
  try {
    const mockData = await fetchDronePositions();
    return mockData;
  } catch (error) {
    console.error("Error fetching drone list:", error);
    throw error;
  }
};

// 가상 센서 리스트를 가져오는 함수
const fetchSensorList = async () => {
  try {
    const mockData = [generateMockSensorData()]; // 단일 고정 센서 데이터 반환
    return mockData;
  } catch (error) {
    console.error("Error fetching sensor list:", error);
    throw error;
  }
};

// 가상 드론 리스트 삭제 함수
const deleteDroneList = async () => {
  try {
    console.log("모든 가상 드론 데이터 삭제 완료");
  } catch (error) {
    console.error("Error deleting drone list:", error);
  }
};

// 가상 Sensor 삭제 함수
const deleteSensor = async (sensorId) => {
  try {
    console.log(`Sensor with ID ${sensorId} 삭제 완료`);
  } catch (error) {
    throw new Error("Sensor 삭제에 실패했습니다.");
  }
};

export {
  fetchDronePositions,
  fetchSelectedDroneData,
  fetchMarkData,
  fetchDroneList,
  fetchSensorList,
  deleteDroneList,
  deleteSensor,
};
