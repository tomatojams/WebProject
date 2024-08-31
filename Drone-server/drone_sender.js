import amqp from "amqplib";

const sendDronePosition = async (droneId, initialLat, initialLng, droneName) => {
  try {
    const connection = await amqp.connect("amqp://127.0.0.1");
    const channel = await connection.createChannel();
    const queue = "Drone_message";

    await channel.assertQueue(queue, { durable: false });

    let latitude = initialLat;
    let longitude = initialLng;

    setInterval(() => {
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

// 두 대의 드론 설정: 초기 위치는 약간의 차이를 둠
sendDronePosition("64:60:1f:7a:b0:5e", 37.5665, 126.978, "Mavic Air");
sendDronePosition("12:34:56:78:9a:bc", 37.5667, 126.9782, "Phantom 4");
sendDronePosition("a1:b2:c3:d4:e5:f6", 37.5668, 126.9784, "Inspire 2");
sendDronePosition("11:22:33:44:55:66", 37.5669, 126.9786, "Mavic Mini");
