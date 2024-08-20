const amqp = require("amqplib");

async function sendDronePosition(droneId, initialLat, initialLng, droneName) {
  const connection = await amqp.connect("amqp://127.0.0.1");
  const channel = await connection.createChannel();
  const queue = "Drone_message";

  await channel.assertQueue(queue, { durable: false });

  // 초기 위치 설정
  let latitude = initialLat;
  let longitude = initialLng;

  setInterval(() => {
    // 위치 데이터를 조금씩 변경하여 시뮬레이션
    latitude += (Math.random() - 0.5) * 0.0002;
    longitude += (Math.random() - 0.5) * 0.0002;

    // 메시지 포맷에 맞춘 데이터 생성
    const position = {
      message: "FOUND", // message 타입은 고정
      sender_id: "2acc44fa47a63222241391a15a0d086365da5aa8efd1d505d99beb5e2436ed85",
      drone: {
        name: droneName, // 드론 이름
        frequency: 2452, // 주파수 고정
        bandwidth: 5, // 대역폭 고정
        allow_track: true, // 추적 허용 여부 고정
        allow_takeover: true, // 인수 허용 여부 고정
        class_name: "Air", // 클래스 이름 고정
        radio_resources: 1, // 무선 자원 고정
        droneId: droneId, // 드론 ID
        latitude: latitude, // 변경된 위도
        longitude: longitude, // 변경된 경도
      },
    };

    // RabbitMQ로 메시지 전송
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(position)));
    console.log(`Sent: ${droneName}`, position);
  }, 1000); // 2초마다 위치 전송
}

// 두 대의 드론 설정: 초기 위치는 약간의 차이를 둠
sendDronePosition("64:60:1f:7a:b0:5e", 37.5665, 126.978, "Mavic Air");
sendDronePosition("12:34:56:78:9a:bc", 37.5667, 126.9782, "Phantom 4");
