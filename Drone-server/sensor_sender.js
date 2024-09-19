import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();
const amqp_url = process.env.AMQP_URL;

// 센서 위치를 생성하는 함수
const generateSensorPosition = (latitude, longitude) => {
  return {
    sensor_id: `sensor-${Date.now()}`, // 센서 ID는 현재 시간을 기준으로 변경
    latitude: latitude + (Math.random() - 0.5) * 0.0001, // 위치를 조금씩 변동
    longitude: longitude + (Math.random() - 0.5) * 0.0001,
    state: Math.random() > 0.5, // 랜덤으로 상태 설정
  };
};

let connection;
let channel;
const sensorQueue = "Mark_message"; // 센서 메시지 큐

// 연결 및 채널을 생성하는 함수
const createConnectionAndChannel = async () => {
  connection = await amqp.connect(amqp_url);
  channel = await connection.createChannel();
  await channel.assertQueue(sensorQueue, { durable: false });
};

// 센서 위치를 주기적으로 전송하는 함수 (5초마다)
const sendSensorPosition = async (initialLat, initialLng) => {
  try {
    // 채널이 없으면 새로 생성
    if (!channel) {
      await createConnectionAndChannel();
    }

    let latitude = initialLat;
    let longitude = initialLng;

    // 5초마다 센서 위치 전송
    setInterval(() => {
      const sensorPosition = generateSensorPosition(latitude, longitude);
      channel.sendToQueue(sensorQueue, Buffer.from(JSON.stringify(sensorPosition)));
      console.log(`Sent sensor position:`, sensorPosition);
    }, 5000); // 5초마다 센서 위치 전송
  } catch (error) {
    console.error("Error in sending sensor position:", error);
  }
};

// 초기화 및 센서 위치 전송 호출
const init = async () => {
  await createConnectionAndChannel();

  // 센서 위치 전송 (서울 좌표로 테스트)
  sendSensorPosition(37.5665, 126.978); // 5초마다 센서 위치를 전송
};

init();
