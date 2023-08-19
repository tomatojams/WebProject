const toDoForm = document.getElementById("todo-form");
// const toDoInput = toDoForm.querySelector("input");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

function handleToDoSubmit(event) {
  event.preventDefault();
  toDoInput.value = "";
}

toDoForm.addEventListener("submit", handleToDoSubmit);
