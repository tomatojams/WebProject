const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

//const link = document.querySelector('a');
const greeting = document.querySelector('#greeting');
const HIDDEN_CLASS = 'hidden';
const USERNAME_KEY = 'username';

function onLoginSubmit(event) {

    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASS);
    const str_value = loginInput.value;
    localStorage.setItem(USERNAME_KEY, str_value);
    paintGreeting(str_value);
}

// function handleLinkClick(event) {
//     event.preventDefault();
//     console.dir(event);

// }
function paintGreeting(str_value) {
    

    greeting.classList.remove(HIDDEN_CLASS);
    greeting.innerText = `Hello ${str_value}`;
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) { 
    loginForm.classList.remove(HIDDEN_CLASS);
    loginForm.addEventListener('submit', onLoginSubmit);

} else {
    paintGreeting(savedUsername);
}
    


