"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  console.log(" Hi 클라이언트");
  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>증가</button>
    </>
  );
}
