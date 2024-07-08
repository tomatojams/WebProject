import { useState, useEffect } from "react";
import Button from "./Button";
import styles from "./App.module.css";

export default function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setCounter((prev) => prev + 1);
  console.log('I run all the time');
  const _upDate = (e) => {
    // e.preventDefault();
    setKeyword(e.target.value);
   }
 
  useEffect(()=>(console.log("once")), []);
  return (
    <>
      <input onChange={_upDate} type="text" placeholder="Search here..." value={keyword}/>
      <h1 className={styles.title}>{counter}</h1>
      <Button onClick={onClick} text={"Click me"} />

    </>
  );
}
