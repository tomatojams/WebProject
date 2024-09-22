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

// 가상 센서 좌표 데이터를 생성하는 함수 (단일 좌표)
const generateMockSensorPosition = () => {
  const now = new Date();
  return {
    id: `sensor-${now.getTime()}`, // 고유 ID 생성
    lat: 37.5665, // 센서를 드론의 고정된 중심 좌표에 고정
    lon: 126.978, // 고정된 longitude
    state: Math.random() > 0.5, // 상태는 랜덤으로 설정
    createdAt: now.toISOString(), // 생성 시간 추가
  };
};

// 가상 센서 리스트 데이터를 생성하는 함수
const generateMockSensorListData = (sensorId, latitude, longitude) => {
  const now = new Date();
  return {
    sensor_id: sensorId,
    latitude,
    longitude,
    state: Math.random() > 0.5, // 상태는 랜덤으로 설정
    radius: 100, // 기본 반경 값
    createdAt: now.toISOString(), // 생성 시간 추가
  };
};

// 드론 위치 데이터를 가상으로 생성하는 함수
const fetchDronePositions = async () => {
  try {
    const mockData = [
      generateMockDronePosition("64:60:1f:7a:b0:5e", "Mavic Air", 37.5665, 126.978),
      generateMockDronePosition("12:34:56:78:9a:bc", "Phantom 4", 37.5667, 126.9782),
      generateMockDronePosition("a1:b2:c3:d4:e5:f6", "Inspire 2", 37.5668, 126.9784),
      generateMockDronePosition("11:22:33:44:55:66", "Mavic Mini", 37.5669, 126.9786),
      generateMockDronePosition("a7:b8:c9:d0:e1:f2", "DJI Spark", 37.567, 126.9788),
      generateMockDronePosition("b3:c4:d5:e6:f7:g8", "DJI Matrice", 37.5671, 126.979),
    ];

    return mockData.sort((a, b) => a.droneId.localeCompare(b.droneId));
  } catch (error) {
    console.error("Error fetching drone positions:", error);
    throw error;
  }
};
// 개별 드론 정보 가져오기 함수 (위치 변동 반영)
const fetchSelectedDroneData = async (droneId) => {
  try {
    // 현재 드론 위치 데이터를 다시 불러와서
    const droneStateMessageBuffer = await fetchDronePositions();
    const droneMessage = droneStateMessageBuffer.find((drone) => drone.droneId === droneId);

    if (!droneMessage) {
      throw new Error("Drone not found");
    }

    // 위치 정보도 다시 변동시킴
    const updatedLocation = {
      latitude: droneMessage.latitude + (Math.random() - 0.5) * 0.0002, // 위치를 새로 변동
      longitude: droneMessage.longitude + (Math.random() - 0.5) * 0.0002,
      altitude: Math.random() * 100, // 랜덤 고도 값
    };

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
        location: updatedLocation, // 변동된 위치 반영
        speed_ms: Math.random() * 15, // 임의의 속도 값
        ground_or_sky: 1, // 하늘 상태로 설정
        rssi: Math.random() * 100, // 신호 강도 값
      },
    };

    return droneDetail;
  } catch (error) {
    console.error("Error fetching drone details:", error);
    throw error;
  }
};

// 가상 센서 좌표 데이터를 생성하는 함수
const fetchMarkData = async () => {
  try {
    const mockData = generateMockSensorPosition();
    return mockData;
  } catch (error) {
    console.error("Error fetching mark data:", error);
    throw error;
  }
};

// 가상 센서 리스트 데이터를 생성하는 함수
const fetchSensorList = async () => {
  try {
    const mockSensorList = [
      generateMockSensorListData("sensor-134546436256", 37.5665, 126.978),
      generateMockSensorListData("sensor-256756245226", 37.567, 126.979),
      generateMockSensorListData("sensor-564343235235", 37.568, 126.98),
      generateMockSensorListData("sensor-898234238293", 37.569, 126.981),
      generateMockSensorListData("sensor-423423423423", 37.57, 126.982),
    ];
    return mockSensorList;
  } catch (error) {
    console.error("Error fetching sensor list:", error);
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
