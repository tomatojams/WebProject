const socket = io(); // 서버와 연결

const welcome = document.getElementById('welcome');
const roomName = welcome.querySelector('#roomName');
const room = document.querySelector('#room');

room.hidden = true;

let roomTitle;

// 대화추가
function addYourMessage(message) {
  const messageList = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  li.classList.add('your_message');
  messageList.appendChild(li);
}

function addFriendMessage(message) {
  const messageList = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  li.classList.add('friend_message');
  messageList.appendChild(li);
}

function addSystemMessage(message) {
  const messageList = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  li.classList.add('sys_mess');
  messageList.appendChild(li);
}

function handleNameSubmit(e) {
  e.preventDefault();
  const input = room.querySelector('#comment_input_name');
  // 서버는 어느방인지 모르기때문에 방이름도 보내야함
  socket.emit('name_message', input.value, roomTitle);
}

// 메세지 입력
function handleMessageSubmit(e) {
  e.preventDefault();
  const input = room.querySelector('#comment_input');
  // 서버는 어느방인지 모르기때문에 방이름도 보내야함
  socket.emit('new_message', input.value, roomTitle, () => {
    addYourMessage(input.value);
    input.value = '';
  });
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room: ${roomTitle}`;
  const msgForm = room.querySelector('#message');
  msgForm.addEventListener('submit', handleMessageSubmit);
}

function handleRoomSubmit(e) {
  e.preventDefault();
  const room = roomName.querySelector('#comment_input_name');
  const name = roomName.querySelector('#comment_input_nickname');

  //1. 이벤트 명을 정할수있음 2. object를 보낼수있음 (number, string도 가능)
  //3. function도 보낼 수 있음(마지막 변수여야함) 4. 여러개의 데이타를 보내도 됨.
  socket.emit('Enter_room', { room: room.value, name: name.value }, showRoom);
  roomTitle = room.value;
  input.value = '';
}

roomName.addEventListener('submit', handleRoomSubmit);

// 서버메세지

socket.on('joined', (name) => {
  addSystemMessage(`${name} has joind`);
});

socket.on('bye', (msg) => {
  addSystemMessage(`${msg} is left`);
});

socket.on('new_message', (msg) => {
  addFriendMessage(msg);
});

// socket.on('name_message', (msg) => {
//   addSystemMessage(msg);
// });
