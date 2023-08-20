const toDoForm = document.getElementById("todo-form");
// const toDoInput = toDoForm.querySelector("input");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const TODO_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(toDos)); // 스트링으로 변환해서 저장
}

function deleteToDo(event) {
  const li = event.target.parentElement; // target is button and it's parent is li
  li.remove();
}

function painToDo(newTodo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = newTodo;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span); // li의 하위에 span을 넣음
  li.appendChild(button);
  toDoList.appendChild(li); // todo list에 list 삽입
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value; // 값을 보관
  toDoInput.value = ""; // 보관하고 삭제
  toDos.push(newTodo);
  painToDo(newTodo);
  saveToDos();
}


toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODO_KEY);
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach((item)=> painToDo(item)); // 하나하나의 엘리먼트를 패러미터를 자동으로 전달해줌
}
