const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const frontSocket = new WebSocket(`ws://${window.location.host}`);

frontSocket.addEventListener("open", () => {
  console.log("open 이벤트 발생: 서버에 연결됨");
  const clientName = prompt(" 이름을 입력하세요:");
  frontSocket.send(JSON.stringify({ type: "username", name: clientName }));
});

frontSocket.addEventListener("message", async (message) => {
  console.log("도착한 메세지:", await message);

  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.appendChild(li);
});

frontSocket.addEventListener("close", () => console.log("connection closed"));

// setTimeout(() => {
//   frontSocket.send("클라이언트입니다.");
// }, 3000);

function handleSubmit(e) {
  e.preventDefault();
  const input = messageForm.querySelector("input");
  frontSocket.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
