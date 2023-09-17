const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

const greeting = document.querySelector('#greeting');
const HIDDEN_CLASS = 'hidden';
const USERNAME_KEY = 'username';

// 여러 인사말을 배열에 저장
const greetings = [
  'Hello,',
  'How was yesterday?',
  'Hey,',
  'Have a great day,',
  'Greetings,'
];

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASS);
  const str_value = loginInput.value;
  localStorage.setItem(USERNAME_KEY, str_value);
  paintGreeting(str_value);
}

function paintGreeting(str_value) {
  greeting.classList.remove(HIDDEN_CLASS);
  // 랜덤한 인사말 선택
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  greeting.innerText = `${randomGreeting} ${str_value}`;
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) { 
  loginForm.classList.remove(HIDDEN_CLASS);
  loginForm.addEventListener('submit', onLoginSubmit);
} else {
  paintGreeting(savedUsername);
}
