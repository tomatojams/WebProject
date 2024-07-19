import { useState, useEffect, useRef } from "react";

export default function App() {
  const tomato = useRef(); // document.getElementByID
  setTimeout(() => {
    // console.log(tomato.current.focus());

    // 변수.current가 현재 element이다
    console.log(tomato.current.placeholder);
  }, 3000);

  return (
    <>
      <div className="App">
        <div>Hi</div>
        <input ref={tomato} type="text" placeholder="las" />
      </div>
    </>
  );
}
