const clockTitle = document.querySelector(".js-clock");

function getClock() {
  const christmas = new Date("2023/12/25");
  const toDay = new Date();
  const diffSec = christmas.getTime() - toDay.getTime();
  const diffDays = String(Math.floor(diffSec / (24 * 60 * 60 * 1000)));
  const diffHours = String(
    Math.floor(diffSec / (60 * 60 * 1000)) - diffDays * 24
  ).padStart(2, "0");
  const diffMinutes = String(
    Math.floor(diffSec / (60 * 1000)) - diffDays * 24 * 60 - diffHours * 60
  ).padStart(2, "0");
  const diffSeconds = String(
    Math.floor(diffSec / 1000) -
      diffDays * 24 * 60 * 60 -
      diffHours * 60 * 60 -
      diffMinutes * 60
  ).padStart(2, "0");

  clockTitle.innerText = `${diffDays}d ${diffHours}h ${diffMinutes}m ${diffSeconds}s`;
}
getClock();
setInterval(getClock, 1000);
