const limitForm = document.querySelector("#limit-form input");
const userNumberForm = document.querySelector("#number-form");
const userInput = document.querySelector("#number-form input");
const game = document.querySelector("#game");
const victory = document.querySelector("#victory");

let userNumber = 0;
let limitValue = 0;

function setLimit(event) {
  limitValue = parseInt(limitForm.value, 10);
}

function setNumber(event) {
  event.preventDefault();

  if (parseInt(userInput.value, 10) > limitValue) {
    game.innerText = "the number should be between 0 and " + limitValue;
    victory.innerText = "Enter new number";
  } else {
    userNumber = parseInt(userInput.value, 10);
    const comNumber = Math.floor(Math.random() * (limitValue + 1));
    game.innerText =
      "your number is " + userNumber + ", computer number is " + comNumber;

    if (userNumber === comNumber) {
      victory.innerText = "Your won!";
    } else {
      victory.innerText = "Your lost!";
    }
  }
}


limitForm.addEventListener("input", setLimit);
userNumberForm.addEventListener("submit", setNumber);
