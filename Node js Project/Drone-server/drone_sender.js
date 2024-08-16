const amqp = require("amqplib");

async function sendDronePosition() {
  // const connection = await amqp.connect("amqp://localhost");
  const connection = await amqp.connect("amqp://127.0.0.1");
  const channel = await connection.createChannel();
  const queue = "drone_positions";

  await channel.assertQueue(queue, { durable: false });

  // 서울의 초기 위치 설정
  let latitude = 37.5665; // 서울의 위도
  let longitude = 126.978; // 서울의 경도

  setInterval(() => {
    // 위치 데이터를 조금씩 변경하여 시뮬레이션
    latitude += (Math.random() - 0.5) * 0.0002;
    longitude += (Math.random() - 0.5) * 0.0002;

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

/* message:
{
  'message_type': 'Found', 'sender_id': '2acc44fa47a63222241391a15a0d086365da5aa8efd1d505d99beb5e2436ed85',
    'timestamp': 1723803106725, 'drone':
  {
    'name': 'Mavic Air', 'drone_id': '64:60:1f:7a:b0:5e', 'frequency': '2452', 'bandwidth': '5', 'allow_track': True,
      'allow_takeover': True, 'class_name': 'Air', 'radio_resources': 1
  }
} */