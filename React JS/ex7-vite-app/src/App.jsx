import { useState, useEffect } from "react";

function Hello() {
  function Hi() {
    console.log("created :)"); // 생성될때
    //소멸될때 clean up function이 실행된다.
    return Bye; // clean up function 소멸될때 -> 분석등에 사용
  }
  function Bye() {
    console.log("destroyed :(");
  }
  useEffect(Hi, []);
  return <h1>Hi</h1>;
}

export default function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <>
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
      {showing ? <Hello /> : null}
    </>
  );
}
