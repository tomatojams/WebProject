import { useState, useEffect } from "react";

export default function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
  },[])

  return (
    <>
      <h1>The Coins!</h1>
      {loading? <strong>Loading</strong>: null }
    </>
  );
}
