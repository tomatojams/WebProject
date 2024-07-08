import { useState, useEffect } from "react";
import Button from "./Button";
import styles from "./App.module.css";

export default function App() {
  // useEffect를 쓰지 않으면 하나의 state가 변경되면 모든 state가 다시 렌더링된다.
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setCounter((prev) => prev + 1);


  const _upDate = (e) => setKeyword(e.target.value);
  // 시작시에만 실행
  useEffect(() => console.log("I run only once"), []);
  // ㅋ카운터가 변경하면 실행
  useEffect(() => console.log("I run when counter changes"), [counter]);
  // keyword가 변경하면 실행
  useEffect(() => {
    if ((keyword !== "" && keyword.length > 5) || keyword === "good") {
      console.log("Search:", keyword);
    }
  }, [keyword]);

  // useEffect(() => console.log("I run when countr& keyword changes"), [keyword, counter]);
  // e둘중 하나라도 변경되면 실행된다.

  return (
    <>
      <input
        value={keyword}
        onChange={_upDate}
        type="text"
        placeholder="Search here..."
      />
      <h1 className={styles.title}>{counter}</h1>
      <Button onClick={onClick} text={"Click me"} />
    </>
  );
}
