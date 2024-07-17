import { useState, useEffect } from "react";
import style from "./app.module.css"; // 직접 만든  css에서 모듈로 불러옴

export default function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const _onChange = (e) => {
    setTodo(e.target.value);
  };
  let foreach = [];
  const _onSubmit = (e) => {
    e.preventDefault();
    if (todo === "") {
      return;
    } else {
      setTodoList((prev) => [...prev, todo]);
      setTodo("");
    }
  };

  const _onPushX = (liIndex) => {
    // console.log("hello")
    setTodoList(todoList.filter((item, index) => liIndex !== index));
    // filter는 리턴으로조건에 맞는 배열을 리턴함 따라서 todoList라는 상태값을
    // 다른 배열로 리턴하기때문에 성립

    // index는 파이썬의 enumerate와 같다고 보면됨.
  };

  useEffect(() => {
    console.log(todoList);
    // console.log(todoList.map((item, index) => (
    //   <li key={index}>{item} <button onClick={_onXclick}>x</button></li>
    // )))
  }, [todoList]);

  return (
    <>
      <form onSubmit={_onSubmit}>
        <label style={{ fontSize: "16", fontWeight: "600" }} htmlFor="todo">
          To do List({todo.length})
        </label>
        <br />
        <input
          id="todo"
          className={style.input}
          onChange={_onChange}
          type="text"
          value={todo}
        />
        <button>추가</button>
      </form>
      <hr />
      <ul>
        {
          todoList.map((item, index) => (
            // map은 반환값이 있다.
            // index는 enumerate처럼 쓰인다.

            <li key={index}>
              {item} <button onClick={() => _onPushX(index)}>x</button>
            </li>
          ))

          // index를 삭제할때 전달한다.
          // ()=>_onPushX(index)라는 참조형식은 클릭하고나서 실행이됨
          // 이벤트시에만 호출하기 ()안에는 (event)이므로 실제로 _onPushX(event,index)임
          // _onPushX라고만 쓰면 참조가 아니라 호출이 되므로 렌더링시마다 호출
          // onClick{_onXclick(index)}는 생성될떄마다 호출되므로 에러
        }
      </ul>

      {
        todoList.forEach((item, index) =>
          foreach.push(index + item.toUpperCase())
        )
        // forEach에는 반환값이 없다.
      }
      <br />
      {foreach}
    </>
  );
}
