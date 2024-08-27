import http from 'http';
import WebSocket from 'ws';
import express from 'express';
const app = express();
const root = process.cwd();

// ws 기능을 해도 http 기능이 필요함 1. view 2. static file 3. home 4. redirect이 필요하기때문

app.set('view engine', 'pug');
app.set('views', root + '/src/views'); // 절대경로 + 디렉토리에 Pug 템플릿위치(src는 뺌)
app.use('/public', express.static(root + '/src/public')); // 정적파일을 제공하는 미들웨어 함수를 사용

app.get('/', (_, res) => res.render('home')); // "/" 경로일때 home.pug  템플릿을 렌더링해서 응답
app.get('/*', (_, res) => res.redirect('/')); // 모든 경로에 대해 "/"로 리다이렉트

const handleListen = () => console.log('Listening on http://localhost:3001');

// http 서버 상수로 서버자체에 접근가능
// WebSocket.Server는 필수가 아님 WebSocket만 사용해도 됨

const NewServer = http.createServer(app);
const wss = new WebSocket.Server({ server: NewServer });
// WebSocket 서버 생성하며 http 서버를 사용하도록 설정

// 클라이언트별로 구별해서 모두에게 보내줄수있음
const socketList = [];

// backSocket을 받을때부터 클라이언트는 구별되어있음 backSocket은 현재 연결된 각각 다른
// 클라이언트
wss.on('connection', (backSocket) => {
  // 자바스크립트의 동적 속성 추가
  backSocket.nickname = '익명';
  socketList.push(backSocket);

  console.log(' connection event:연결신청이 왔음');

  backSocket.on('message', (message) => {
    let msg;

    msg = JSON.parse(message);

    switch (msg.type) {
      case 'nickname':
        if (msg.payload) {
          backSocket.nickname = msg.payload;
          backSocket.send('이름이 입력되었습니다.');
          console.log('New Member:', msg.payload);
        } else {
          backSocket.send('이름을 입력해주세요.');
        }
        break;
      case 'message':
        console.log(`${backSocket.nickname}에게서 도착한 메세지:`, msg.payload);
        socketList.forEach((asocket) => {
          if (asocket !== backSocket) {
            // 보낸 본인을 제외하고 나머지에게 보냄
            asocket.send(`${backSocket.nickname}:${msg.payload}`);
          }
        });
        break;
    }
  });

  backSocket.on('close', () => console.log('클라이언트 연결끊김'));

  backSocket.send('채팅방에 연결되었습니다.');
}); //on() 은 backend에 연결된 사람의 정보(클라이언트) 제공 (socket에서옴)
NewServer.listen(3001, handleListen); // 3001 포트를 이제 WebSocket도 사용가능
