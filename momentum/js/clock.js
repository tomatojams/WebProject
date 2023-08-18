const clock = document.querySelector('h2#clock');

function getClock(){
    const date = new Date();
    const day = date.getDate();
    const month = (String(date.getMonth())).padStart(2, '0');
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const nowTime = `${hour}:${minute}:${second}`;

    clock.innerText = nowTime;
}


getClock();
setInterval(getClock,1000)