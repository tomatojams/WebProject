const aedes = require('aedes')();
const mqttBroker = require('net').createServer(aedes.handle);
const mqttPort = 3000; // 📌 127.0.0.1

mqttBroker.on('connection', _ => console.log(`CONNECT`));
aedes.on('subscribe', (topic, client) => {
    console.log("📌 Subscribe");
    console.log(`- topic : ${topic[0].topic} / QoS : ${topic[0].qos}`);
    console.log(`- client.id : ${client.id}`)
});
aedes.on('publish', (packet, client) => {
    if(!client) return;
    console.log(`🔗 publish : ${packet.payload.toString()} - ${new Date().toISOString()}`);
});
mqttBroker.listen(mqttPort, _ => console.log("MQTT broker listening", mqttPort));