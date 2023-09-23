const toDoForm = document.getElementById("todo-form");
// const toDoInput = toDoForm.querySelector("input");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const TODO_KEY = "todos";

let toDos = []; // const로 하면 나중에 한번 넣으면 변경불가능하기때문에 새로 로딩하지않고 업데이되는
//정보를 반영못하기때문에 새로 업데이트되는 정보를 반영하기위해 let으로 선언

// 로컬스토리지에 저장하는 함수
// 저장할때는 JSON.stringify로 자바스크립트 오브젝트를 스트링으로 변환해서 저장
// 불러올때는 JSON.parse로 스트링을 자바스크립트 오브젝트로 변환해서 불러옴
function saveToDos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(toDos));
  // 어떤 자바스크립트 오브젝트도 json 형태의 스트링으로 변환해서 저장
  // <-> JSON.parse
}

// 삭제버튼을 누르면 해당 리스트를 삭제
// 어떤 리스트에서 이벤트가 일어났는지 알려면 event.target을 사용
// 부모엘리먼트인 리스트를 알수있음  parentElement
// 그래서 부모엘리먼트 삭제
// 중요 target = button, parentElement = li
//console.log(event.target.parentElement.innerText); 어느엘리먼트가 부모인지 내부 메세지로 확인가능

function deleteToDo(event) {
  const li = event.target.parentElement;

  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  // li.id는 html id 라서 숫자가 아니라 스트링
  // filter안에서 함수를 부르거나 익명함수로 작성
  //filter하 하나하나의 엘리먼트마다 함수를 호출하기때문에 엘리먼트에 대응하는 리턴함수를 써줌

  saveToDos();
  li.remove();
}

// 각각의 toDo 마다 리스트 스팬(행엘리먼트) 버튼을 생성해서 리스트에 넣고 toDoList html 엘리먼트에 넣음

function painToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id; // li에 id 부여
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.id = "deleteBtn"; // 버튼에 id 부여
  button.innerText = "x";

  button.addEventListener("click", deleteToDo);
  // 버튼이 생성되면서 이벤트리스너를 추가해주기때문에 함수내에 있어도 실행됨.

  li.appendChild(span); // li의 하위에 span을 넣음
  li.appendChild(button);
  toDoList.appendChild(li); // todo list에 list 삽입
}

// toDoForm에 submit 이벤트가 발생하면 새로고침을 막고(event.preventDefault)
// 임시로 저장된 입력값을 toDos에 넣어두고 그림
// 그리고 로컬저장소에 기록함

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value; // 값을 보관
  toDoInput.value = ""; // 보관하고 삭제
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };

  toDos.push(newTodoObj); // toDos 리스트에 새로운 오브젝트 추가
  painToDo(newTodoObj);
  saveToDos();
}

// 세이브된 toDo가 있다면 toDos로 로컬스토리지에서 가져와서 복구하고 각각의 아이템마다  paintToDo를 실행

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODO_KEY);
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos); // json 형태의 스트링을 자바스크립트 리스트 오브젝트로 변환
  toDos = parsedToDos; // toDos 복구
  parsedToDos.forEach((item) => painToDo(item)); // 하나하나의 엘리먼트를 패러미터를 자동으로 전달해줌
  //parsedToDos.forEach(painToDo); 인자를 자동으로 전달하기때문에 이렇게 해도 똑같음
  // 익명함수쓰는 방식  paintToDo(item)은 함수자체가 아니라 그냥 라인
}
