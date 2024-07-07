import { useState } from "react";
import Button from "./Button";
import styles from "./App.module.css";

export default function App() {
  const [counter, setCounter] = useState(0);
  const onClick = () => setCounter((prev) => prev + 1);
  console.log('call a api');
  return (
    <>
      <h1 className={styles.title}>{counter}</h1>
      <Button onClick={onClick} text={"Click me"} />

    </>
  );
}

// export default App
