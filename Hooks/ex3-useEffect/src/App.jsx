import { useState, useEffect } from "react";

export default function App() {
  const sayHello = () => {
    console.log("hello");
  };
  const [number, setNumber] = useState(0);
  const [aNumber, setAnumber] = useState(0);
  useEffect(sayHello, [number]);//componentDidMount(), componentDidUpdate(), componentWillUnmount()

  return (
    <>
      <div className="App">
        <div>Hi</div>
        <button onClick={() => setNumber(number + 1)}>{number}</button>
        <button onClick={() => setAnumber(aNumber + 1)}>{aNumber}</button>
      </div>
    </>
  );
}
