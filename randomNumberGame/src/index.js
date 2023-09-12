const limitForm = document.querySelector("#limit-form input");
const userNumberForm = document.querySelector("#number-form");
const userInput = document.querySelector("#number-form input");
const game = document.querySelector("#game");
const victory = document.querySelector("#victory");

let userNumber = 0;
let limitValue = 0;

console.log(limitForm);

function setLimit(event) {
  limitValue = parseInt(limitForm.value);
}

function setNumber(event) {
  event.preventDefault();

  userNumber = parseInt(userInput.value);
  const comNumber = Math.floor(Math.random() * (limitValue + 1));
  game.innerText =
    "your number is " + userNumber + ", com numerical is " + comNumber;

  if (userNumber === comNumber) {
    victory.innerText = "Your won!";
  } else {
    victory.innerText = "Your lost!";
  }
}

limitForm.addEventListener("input", setLimit);
userNumberForm.addEventListener("submit", setNumber);
