import amqp from "amqplib";

// 서버의 기준 위치 설정
const serverLatitude = 37.740642559182625;
const serverLongitude = 127.1852350893005;

const sendDronePosition = async (droneId, droneName) => {
  try {
    const connection = await amqp.connect("amqp://127.0.0.1");
    const channel = await connection.createChannel();
    const queue = "Drone_message";

    await channel.assertQueue(queue, { durable: false });

    let latitude = serverLatitude;
    let longitude = serverLongitude;

    setInterval(() => {
      // 위치를 기준 위치에서 약간의 변화를 줌
      latitude += (Math.random() - 0.5) * 0.0002;
      longitude += (Math.random() - 0.5) * 0.0002;

      const position = {
        message: "FOUND",
        sender_id: "2acc44fa47a63222241391a15a0d086365da5aa8efd1d505d99beb5e2436ed85",
        drone: {
          name: droneName,
          frequency: 2452,
          bandwidth: 5,
          allow_track: true,
          allow_takeover: true,
          class_name: "Air",
          radio_resources: 1,
          droneId,
          latitude,
          longitude,
        },
      };

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(position)));
      console.log(`Sent: ${droneName}`, position);
    }, 1000); // 1초마다 위치 전송
  } catch (error) {
    console.error("Error in sending drone position:", error);
  }
};

// 센서 위치 전송 함수 (1분마다 실행)
const sendSensorPosition = async () => {
  try {
    const connection = await amqp.connect("amqp://127.0.0.1");
    const channel = await connection.createChannel();
    const queue = "Mark_message";

    await channel.assertQueue(queue, { durable: false });

    setInterval(() => {
      const position = {
        latitude: serverLatitude + (Math.random() - 0.5) * 0.0002,
        longitude: serverLongitude + (Math.random() - 0.5) * 0.0002,
      };

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(position)));
      console.log("Sent Sensor Position:", position);
    }, 60000); // 1분마다 위치 전송
  } catch (error) {
    console.error("Error in sending sensor position:", error);
  }
};

// 드론 위치 전송
sendDronePosition("64:60:1f:7a:b0:5e", "Mavic Air");
sendDronePosition("12:34:56:78:9a:bc", "Phantom 4");
sendDronePosition("a1:b2:c3:d4:e5:f6", "Inspire 2");
sendDronePosition("11:22:33:44:55:66", "Mavic Mini");

// 센서 위치 전송
sendSensorPosition();
