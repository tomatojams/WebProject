import { useState, useEffect, useRef } from "react";

const useClick = (customFunc) => {
  const element = useRef();

  // console.log(element);
  useEffect(() => {
    if (typeof customFunc !== "function") {
      return;
    }
    if (element.current) {
      // 현재 엘리먼트
      element.current.addEventListener("click", customFunc); // 엘리먼트가 Mount, updatre
    }
    return () => element.current.removeEventListener("click", customFunc); // 엘리먼트가 Unmount
  }, []); // 한번만 add되도록
  return element;
};

export default function App() {
  const sayHello = () => console.log("Hello");
  // const sayHello = "hello";
  const tomato = useClick(sayHello);

  return (
    <>
      <div className="App">
        <h1 ref={tomato}>Hi</h1>
      </div>
    </>
  );
}
