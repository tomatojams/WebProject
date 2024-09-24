import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';

const app = express();
const root = process.cwd();

app.set('view engine', 'pug');
app.set('views', root + '/src/views');
app.use('/public', express.static(root + '/src/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const handleListen = () => console.log('Listening on http://localhost:3001');
const httpServer = http.createServer(app);
// Socket.IO  서버 생성
const wsServer = SocketIO(httpServer);

// 이벤트 핸들링
wsServer.on('connection', (socket) => {

  // 강제접속->모든 연결된 소켓을 특정방에 강제입장 시킬때
  // -> wsServer.socketsJoin('announcement');

  socket.onAny((e) => console.log(`Socket event: ${e}`));
  // 모든 이벤트에대해서 로그출력
  // console.log(socket);

  // "Enter_room"은 임의로 만들어진 이벤트이름


  socket.on('Enter_room', (msg, showRoom) => {
    socket.nickName = msg.name;
    socket.join(msg.room); // 실제로 방에 들어가는 조작

    showRoom(); // 클라이언트 함수 허락
    console.log(socket.rooms);

    // 서버의 emit은 본인을 제외하고 보내진다.
    // 발신자도 포함하려면 io.to 를 쓰면 됨.
    socket.to(msg.room).emit('joined', socket.nickName);
  });

  //socket에서 제공하는 이벤트 'disconnecting' 완전히 끊기기전에 굿바이가능
  //disconnect 연결이 완전히 끊김
  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit('bye', socket.nickName);
    });
  });

  socket.on('new_message', (msg, roomName, done) => {
    socket.to(roomName).emit('new_message', `${socket.nickName}: ${msg}`);
    done();
  });

  // socket.on('name_message', (name, roomName) => {
  //   socket.nickName = name;
  //   socket.to(roomName).emit('name_message', `New Friend: ${name}`);
  // });
});

httpServer.listen(3001, handleListen); // 3001 포트를 이제 WebSocket도 사용가능
