const amqp = require("amqplib");

async function sendDronePosition(useSSHTunnel = false) {
  let connection;

  // SSH 터널을 사용하는 경우와 그렇지 않은 경우를 구분
  if (useSSHTunnel) {
    connection = await amqp.connect("amqp://127.0.0.1:5673"); // SSH 터널 포트로 연결
    console.log("Connected to RabbitMQ via SSH Tunnel on port 5673");
  } else {
    connection = await amqp.connect("amqp://127.0.0.1:5672"); // 기본 포트로 연결
    console.log("Connected to RabbitMQ directly on port 5672");
  }

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
  }, 1500); // 2초마다 위치 전송
}

// SSH 터널링을 사용하는 경우와 그렇지 않은 경우에 따라 함수 호출
sendDronePosition(true).catch(console.error); // SSH 터널링 사용
// sendDronePosition(false).catch(console.error);  // SSH 터널링 사용 안함
