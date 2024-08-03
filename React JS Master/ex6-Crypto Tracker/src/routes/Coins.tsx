import axios from "axios";
import { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Header = styled.header`
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul`
  padding-top: 20px;
`;

const Coin = styled.li`
  margin: 10px 0;
  width: 500px;

  font-size: 16px;
  background-color: white;
  color: ${(props) => props.theme.accentColor};
  border-radius: 10px;

  a {
    // Link를 써도 결국 a로 변환됨
    padding: 20px; // 패딩에 여기에주면 모든 부분에서 클릭가능
    transition: color 300ms ease-in-out;
    display: block; // 패딩을 얼마를 주든 블락 모든 부분에서 클릭가능
  }

  &:hover {
    a {
      color: violet;
      cursor: pointer;
    }
  }
`;

const Title = styled.h1`
  font-size: 25px;
  color: ${(props) => props.theme.textColor};
`;

// const coins = [
//   {
//     id: "btc-bitcoin",
//     name: "Bitcoin",
//     symbol: "BTC",
//     rank: 1,
//     is_new: false,
//     is_active: true,
//     type: "coin",
//   },
//   {
//     id: "eth-ethereum",
//     name: "Ethereum",
//     symbol: "ETH",
//     rank: 2,
//     is_new: false,
//     is_active: true,
//     type: "coin",
//   },
//   {
//     id: "hex-hex",
//     name: "HEX",
//     symbol: "HEX",
//     rank: 3,
//     is_new: false,
//     is_active: true,
//     type: "token",
//   },
// ];

interface CoinInterface {
  id: string;
  name: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  const getCoin = () => {
    fetch("https://api.coinpaprika.com/v1/coins")
      .then((Response) => Response.json())
      .then((json) => json.slice(0, 30))
      .then((slice) => setCoins(slice));
  };

  const getCoins = async () => {
    const response = await axios("https://api.coinpaprika.com/v1/coins");
    setCoins(response.data.slice(0, 30));
  };

  // 선언이 아니라 그냥 함수 실행이라서 useEffect();하고 끝
  // useEffect 안에서 바로 함수실행 방법

  // 즉시실행함수 : (함수)()
  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await res.json();
      console.log(json.slice(0, 100));
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header></Header>
      <Title>코인</Title>
      {loading ? (
        "loading..."
      ) : (
        // 하나의 엘리먼트만 들어가야 한다.
        <CoinsList>
          {coins.map((coin: CoinInterface) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>{" "}
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
