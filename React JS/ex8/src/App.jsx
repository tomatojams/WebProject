import { useState, useEffect } from "react";

export default function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]); // to do list
  const onChange = (e) => {
    setToDo(e.target.value);
  };
  useEffect(() => {
    console.log(toDos);
  }, [toDos]); // toDos가 변경될 때마다 실행

  const onSubmit = (e) => {
    // form 태그의 기본 이벤트를 막아준다.
    e.preventDefault();

    if (toDo === "") {
      return;
    } else {
      // toDoS.push(toDo); //일반적인 JS 상태변수는 이렇게 변경하면 안됨 state 함수를 이용해야함
      setToDos((prevArray) => [...prevArray, toDo]); // ...-> spread operator 배열을 풀어 element를 반환

      setToDo("");
    }
  };

  return (
    <>
      <h4>My to do list ({toDos.length})</h4>
      <form onSubmit={onSubmit}>
        <input
          value={toDo}
          onChange={onChange}
          type="text"
          placeholder="to do list 내용을 적어주세요."
        />
        <button
        // form 태그 안에 button 태그가 있으면 submit 버튼으로 동작한다.
        >
          추가
        </button>{" "}
      </form>
    </>
  );
}
