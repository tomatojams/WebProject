import { useState, useEffect } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollar, setDollar] = useState
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
      .then((response) => response.json())
      .then((json) => setCoins(json));

    setLoading(false);
  }, []);

  // 비트코인 가격 추출
  const btc = coins[0].quotes.USD.price;
  const _onChange = () => {
    
  }

  const _onSubmit = () => {
    setDollar 
  }

  return (
    <>
      <h1>The Coins!</h1>
      {loading ? <strong>Loading</strong> : null}
      <hr />
      <ul>
        {coins.map((coin, index) => (
          <li key={index}>
            
            {coin.name}({coin.symbol}) : {coin.quotes.USD.price / btc}BTC
          </li>
          
        ))}
      </ul>
      <hr />
      <form>
        <input type="number" onChange={_onChange} />
        <button onClick={()=>(_onSubmit)}> to BTC</button>
      </form>
    </>
  );
}
