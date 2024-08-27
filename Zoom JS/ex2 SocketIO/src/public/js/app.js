const messageList = document.querySelector('ul');
const nickForm = document.querySelector('#nick');
const messageForm = document.querySelector('#message');
const frontSocket = new WebSocket(`ws://${window.location.host}`);

frontSocket.addEventListener('open', () => {
  console.log('open 이벤트 발생: 서버에 연결됨');
  // const clientName = prompt(" 이름을 입력하세요:");
  // frontSocket.send(JSON.stringify({ type: "username", name: clientName }));
});

frontSocket.addEventListener('message', async (message) => {
  console.log('도착한 메세지:', await message);

  const li = document.createElement('li');
  li.innerText = message.data;
  messageList.appendChild(li);
});

frontSocket.addEventListener('close', () => console.log('connection closed'));

// setTimeout(() => {
//   frontSocket.send("클라이언트입니다.");
// }, 3000);

function handleNickSubmit(e) {
  e.preventDefault();
  const input = nickForm.querySelector('input');
  frontSocket.send(makeMessage('nickname', input.value));
}

function handleCommentSubmit(e) {
  e.preventDefault();
  const input = messageForm.querySelector('input');
  frontSocket.send(makeMessage('message', input.value));
  const li = document.createElement('li');
  li.innerText = input.value;

  li.classList.add('your_message');
  messageList.appendChild(li);
  input.value = '';
}

function makeMessage(type, payload) {
  return JSON.stringify({ type, payload });
  //ES6 축약형식, 실제로는 {type: type, payload: payload} 형식
}

messageForm.addEventListener('submit', handleCommentSubmit);
nickForm.addEventListener('submit', handleNickSubmit);
