"use strict";

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _socket = _interopRequireDefault(require("socket.io"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var root = process.cwd();
app.set('view engine', 'pug');
app.set('views', root + '/src/views');
app.use('/public', _express["default"]["static"](root + '/src/public'));
app.get('/', function (_, res) {
  return res.render('home');
});
app.get('/*', function (_, res) {
  return res.redirect('/');
});

var handleListen = function handleListen() {
  return console.log('Listening on http://localhost:3001');
};

var httpServer = _http["default"].createServer(app); // Socket.IO  서버 생성


var wsServer = (0, _socket["default"])(httpServer); // 이벤트 핸들링

wsServer.on('connection', function (socket) {
  // 강제접속->모든 연결된 소켓을 특정방에 강제입장 시킬때
  // -> wsServer.socketsJoin('announcement');
  socket.onAny(function (e) {
    return console.log("Socket event: ".concat(e));
  }); // 모든 이벤트에대해서 로그출력
  // console.log(socket);

  console.log(wsServer.socket.adapter); // "Enter_room"은 임의로 만들어진 이벤트이름

  socket.on('Enter_room', function (msg, showRoom) {
    socket.nickName = msg.name;
    socket.join(msg.room); // 실제로 방에 들어가는 조작

    showRoom(); // 클라이언트 함수 허락

    console.log(socket.rooms); // 서버의 emit은 본인을 제외하고 보내진다.
    // 발신자도 포함하려면 io.to 를 쓰면 됨.

    socket.to(msg.room).emit('joined', socket.nickName);
  }); //socket에서 제공하는 이벤트 'disconnecting' 완전히 끊기기전에 굿바이가능
  //disconnect 연결이 완전히 끊김

  socket.on('disconnecting', function () {
    socket.rooms.forEach(function (room) {
      socket.to(room).emit('bye', socket.nickName);
    });
  });
  socket.on('new_message', function (msg, roomName, done) {
    socket.to(roomName).emit('new_message', "".concat(socket.nickName, ": ").concat(msg));
    done();
  }); // socket.on('name_message', (name, roomName) => {
  //   socket.nickName = name;
  //   socket.to(roomName).emit('name_message', `New Friend: ${name}`);
  // });
});
httpServer.listen(3001, handleListen); // 3001 포트를 이제 WebSocket도 사용가능