const amqp = require("amqplib");

async function sendDronePosition() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const queue = "drone_positions";

  await channel.assertQueue(queue, { durable: false });

  // 서울의 초기 위치 설정
  let latitude = 37.5665; // 서울의 위도
  let longitude = 126.978; // 서울의 경도

  setInterval(() => {
    // 위치 데이터를 조금씩 변경하여 시뮬레이션
    latitude += (Math.random() - 0.5) * 0.001;
    longitude += (Math.random() - 0.5) * 0.001;

    const position = {
      droneId: "drone_1",
      latitude: latitude,
      longitude: longitude,
    };

    // RabbitMQ로 메시지 전송
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(position)));
    console.log("Sent:", position);
  }, 2000); // 2초마다 위치 전송
}

sendDronePosition().catch(console.error);
