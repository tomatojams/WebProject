import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();
const amqp_url = process.env.AMQP_URL;

// 센서 위치를 생성하는 함수
const generateSensorPosition = (latitude, longitude) => {
  return {
    sensor_id: `sensor-${Date.now()}`,
    latitude: latitude + (Math.random() - 0.5) * 0.0001, // 위치를 조금씩 변동
    longitude: longitude + (Math.random() - 0.5) * 0.0001,
    state: Math.random() > 0.5, // 랜덤으로 상태 설정
  };
};

let connection;
let channel;
const droneQueue = "Drone_state_message"; // 신버전 메시지 큐로 변경
const sensorQueue = "Mark_message";

// 연결 및 채널을 생성하는 함수
const createConnectionAndChannel = async () => {
  connection = await amqp.connect(amqp_url);
  channel = await connection.createChannel();
  await channel.assertQueue(droneQueue, { durable: false });
  await channel.assertQueue(sensorQueue, { durable: false });
};

// 드론 위치를 주기적으로 전송하는 함수
const sendDronePosition = async (droneId, initialLat, initialLng, droneName) => {
  try {
    // 채널이 없으면 새로 생성
    if (!channel) {
      await createConnectionAndChannel();
    }

    let latitude = initialLat;
    let longitude = initialLng;

    // 드론 위치 전송
    setInterval(() => {
      latitude += (Math.random() - 0.5) * 0.0002;
      longitude += (Math.random() - 0.5) * 0.0002;

      const position = {
        message_type: "Track", // 새로운 메시지 타입
        sender_id: "2acc44fa47a63222241391a15a0d086365da5aa8efd1d505d99beb5e2436ed85", // 송신자 정보
        timestamp: Date.now(), // 현재 시간을 Unix timestamp로 사용
        drone: {
          droneId, // 고유한 드론 ID를 사용
          name: droneName,
          frequency: 2452,
          bandwidth: 5,
          allow_track: true,
          allow_takeover: true,
          class_name: "Air",
          radio_resources: 1,
          location: {
            latitude, // 위치 정보는 location 객체 내부로 이동
            longitude,
            altitude: Math.random() * 100, // 랜덤 고도 값
          },
          speed_ms: Math.random() * 15, // 임의의 속도 값
          ground_or_sky: 1, // 하늘 상태로 설정 (0: 지상, 1: 하늘)
          rssi: Math.random() * 100, // 신호 강도 값
        },
      };

      channel.sendToQueue(droneQueue, Buffer.from(JSON.stringify(position)));
      console.log(`Sent drone position: ${droneName}`, position);
    }, 2000); // 1초마다 드론 위치 전송
  } catch (error) {
    console.error("Error in sending drone position:", error);
  }
};

// 센서 위치를 한 번만 전송하는 함수
const sendSensorPosition = async (latitude, longitude) => {
  try {
    // 채널이 없으면 새로 생성
    if (!channel) {
      await createConnectionAndChannel();
    }

    const sensorPosition = generateSensorPosition(latitude, longitude);

    channel.sendToQueue(sensorQueue, Buffer.from(JSON.stringify(sensorPosition)));
    console.log(`Sent sensor position:`, sensorPosition);
  } catch (error) {
    console.error("Error in sending sensor position:", error);
  }
};

// 초기화 및 드론 및 센서 위치 전송 호출
const init = async () => {
  await createConnectionAndChannel();

  // 각 드론마다 고유한 drone_id 사용
  sendDronePosition("64:60:1f:7a:b0:5e", 37.5665, 126.978, "Mavic Air");
  // sendDronePosition("12:34:56:78:9a:bc", 37.5667, 126.9782, "Phantom 4");
  // sendDronePosition("a1:b2:c3:d4:e5:f6", 37.5668, 126.9784, "Inspire 2");
  // sendDronePosition("11:22:33:44:55:66", 37.5669, 126.9786, "Mavic Mini");

  await sendSensorPosition(37.5665, 126.978); // 센서 위치를 한 번만 전송
};

init();
