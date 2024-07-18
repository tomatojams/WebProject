import { useState, useEffect } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  const [dollar, setDollar] = useState("");
  const [coinDollar, setCoinDollar] = useState("");

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
      .then((response) => response.json())
      .then((json) => setCoins(() => json));
    // console.log(btc);
    setLoading(false);
  }, []); // coins라고 적으면 차단

  const _onChage = (e) => {
    setDollar(e.target.value);
    console.log(dollar);
  };

  const _onSelect = (e) => {
    if (e.target.selectedIndex === 0) {
      return;
    }
    const index = e.target.selectedIndex - 1;
    console.log(index - 1);
    setCoinDollar(() => coins[index].quotes.USD.price);
  };

  const _onSubmit = (e) => {
    e.preventDeafult();
    setDollar("");
  };

  return (
    <>
      <h1>The Coins!{loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading</strong>
      ) : (
        <select onChange={_onSelect}>
          <option value=""> --select Coin--</option>{" "}
          {coins.map((coin, index) => (
            <option key={index}>
              {coin.name}({coin.symbol}) : $ {coin.quotes.USD.price}Dollar
              {/* {coin.name}({coin.symbol}) : {coin.quotes.USD.price/coins[0].quotes.USD.price}BTC */}
            </option>
          ))}
        </select>
      )}
      <hr />
      <form action="">
        <input type="number" value={dollar} onChange={_onChage} />{" "}
        <span>Dollar</span>
        <h4>
          {isNaN(dollar / coinDollar) // NaN이 나오는 경우 대비 무조건 0처리
            ? 0
            : coins.length === 0      // 두번째 조건
              ? 0
              : dollar / coinDollar}{" "}
          Coins
        </h4>
        <button onClick={_onSubmit}>reset</button>
      </form>
    </>
  );
}
