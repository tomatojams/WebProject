const amqp = require("amqplib");

async function sendDronePosition() {
  const connection = await amqp.connect("amqp://127.0.0.1");
  const channel = await connection.createChannel();
  const queue = "Drone_message";

  await channel.assertQueue(queue, { durable: false });

  // 서울의 초기 위치 설정
  let latitude = 37.5665; // 서울의 위도
  let longitude = 126.978; // 서울의 경도

  setInterval(() => {
    // 위치 데이터를 조금씩 변경하여 시뮬레이션
    latitude += (Math.random() - 0.5) * 0.0002;
    longitude += (Math.random() - 0.5) * 0.0002;

    // 메시지 포맷에 맞춘 데이터 생성
    const position = {
      message: "FOUND", // message 타입은 고정
      sender_id: "2acc44fa47a63222241391a15a0d086365da5aa8efd1d505d99beb5e2436ed85",
      drone: {
        name: "Mavic Air", // 드론 이름 고정
        frequency: 2452, // 주파수 고정
        bandwidth: 5, // 대역폭 고정
        allow_track: true, // 추적 허용 여부 고정
        allow_takeover: true, // 인수 허용 여부 고정
        class_name: "Air", // 클래스 이름 고정
        radio_resources: 1, // 무선 자원 고정
        droneId: "64:60:1f:7a:b0:5e", // 드론 ID 고정
        latitude: latitude, // 변경된 위도
        longitude: longitude, // 변경된 경도
      },
    };

    // RabbitMQ로 메시지 전송
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(position)));
    console.log("Sent:", position);
  }, 2000); // 2초마다 위치 전송
}

sendDronePosition().catch(console.error);
