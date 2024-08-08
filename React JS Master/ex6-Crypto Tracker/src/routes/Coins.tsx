import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useThemeMode } from "../atoms";

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
    display: flex;
    align-items: center;
    gap: 10px;

    // Link를 써도 결국 a로 변환됨
    padding: 20px; // 패딩에 여기에주면 모든 부분에서 클릭가능
    transition: color 300ms ease-in-out;
    /* display: block; // 패딩을 얼마를 주든 블락 모든 부분에서 클릭가능 */
  }

  &:hover {
    a {
      color: violet;
      cursor: pointer;
    }
  }
`;

const Title = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.textColor};
`;

const Img = styled.img`
  width: 50px;
`;
interface ICoin {
  id: string;
  name: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  symbol: string;
}

export default function Coins() {
  const { toggleMode } = useThemeMode();

  // 1. state 저장, 2. 로딩 여부 3. 캐싱 4. useEffect의 한번 실행 효과
  // 함수를 넘기는 것으로 반환값을 넘기는것이 아님 따라서 동일한 형태는 ()=>{}이 됨
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Coin Tracker</title>
      </Helmet>
      <Header></Header>
      <Title>
        코인 <button onClick={toggleMode}>ToggleMode</button>
      </Title>
      {isLoading ? (
        "loading..."
      ) : (
        // 하나의 엘리먼트만 들어가야 한다.
        <CoinsList>
          {data?.map((coin: ICoin) => (
            <Coin key={coin.id}>
              {/* state에 cool 항목 추가 {}를 한번 더쳐서 보내야함 */}
              {/* 아래 /의 의미는 도메인 바로 다음을 뜻함 */}
              <Link to={`/${coin.id}`} state={{ cool: coin.name }}>
                <Img
                  src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
