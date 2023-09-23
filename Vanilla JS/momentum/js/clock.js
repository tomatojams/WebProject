const clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date();
  // const day = date.getDate();
  // const month = String(date.getMonth()).padStart(2, "0");
  // const year = date.getFullYear();
  const hour = (String(date.getHours())).padStart(2, "0");
  const minute = (String(date.getMinutes())).padStart(2, "0");
  const second = (String(date.getSeconds())).padStart(2, "0");
  const nowTime = `${hour}:${minute}:${second}`;

  clock.innerText = nowTime;
}

getClock();
setInterval(getClock, 1000);
