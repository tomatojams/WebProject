"use strict";

var messageList = document.querySelector('ul');
var nickForm = document.querySelector('#nick');
var messageForm = document.querySelector('#message');
var frontSocket = new WebSocket("ws://".concat(window.location.host)); // window.location.host는 현재 웹 페이지의 호스트 주소를 반환
// 이벤트마다 핸들러 만듬

frontSocket.addEventListener('open', function () {
  console.log('open 이벤트 발생: 서버에 연결됨'); // const clientName = prompt(" 이름을 입력하세요:");
  // frontSocket.send(JSON.stringify({ type: "username", name: clientName }));
});
frontSocket.addEventListener('message', function _callee(message) {
  var li;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = console;
          _context.next = 3;
          return regeneratorRuntime.awrap(message);

        case 3:
          _context.t1 = _context.sent;

          _context.t0.log.call(_context.t0, '도착한 메세지:', _context.t1);

          li = document.createElement('li');
          li.innerText = message.data;
          messageList.appendChild(li);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
frontSocket.addEventListener('close', function () {
  return console.log('connection closed');
}); // setTimeout(() => {
//   frontSocket.send("클라이언트입니다.");
// }, 3000);

function handleNickSubmit(e) {
  e.preventDefault();
  var input = nickForm.querySelector('input');
  frontSocket.send(makeMessage('nickname', input.value));
}

function handleCommentSubmit(e) {
  e.preventDefault();
  var input = messageForm.querySelector('input');
  frontSocket.send(makeMessage('message', input.value));
  var li = document.createElement('li');
  li.innerText = input.value;
  li.classList.add('your_message');
  messageList.appendChild(li);
  input.value = '';
}

function makeMessage(type, payload) {
  return JSON.stringify({
    type: type,
    payload: payload
  }); //ES6 축약형식, 실제로는 {type: type, payload: payload} 형식
}

messageForm.addEventListener('submit', handleCommentSubmit);
nickForm.addEventListener('submit', handleNickSubmit);