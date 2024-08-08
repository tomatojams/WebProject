import {
  useParams,
  Link,
  useLocation,
  Outlet,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";

interface RouterState {
  cool: string;
}

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  gap: 30px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  padding: 10px 20px;
  border-radius: 10px;
  width: 500px;
`;

const Tab = styled.span<{ isAcctive: boolean }>`
  color: ${(props) =>
    props.isAcctive ? props.theme.accentColor : props.theme.textColor};
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: azure;
  padding: 10px 20px;
  border-radius: 10px;
  width: 500px;
`;

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

const Title = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.textColor};
`;

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: ITag[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links_extended: object;
  first_data_at: string;
  last_data_at: string;
}

interface Usd {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: Date;
  percent_from_price_ath: number;
}

interface Quotes {
  USD: Usd;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: Quotes;
}

export default function Coin() {
  const { coinId } = useParams<{ coinId: string }>();

  // const [data, setData] = useState<IInfoData>();
  // const [price, setPrice] = useState<IPriceData>();
  // const [loading, setLoading] = useState(true);

  const location = useLocation();
  const state = location.state as RouterState; // as로 타입캐스팅 react-router-dom v6 부터 제네릭을 지원하지 않음
  const priceMatch = useMatch("/:coinId/price"); // :~~~ 는 변수취급
  const chartMatch = useMatch("/:sss/chart");

  const { isLoading: infoLoading, data: data } = useQuery<IInfoData>(
    ["info", coinId],
    // 함수를 넘기는것이지 반환값이 아니기때문에 함수명만 적거나 ()=>{} 형태
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickerLoading, data: price } = useQuery<IPriceData>(
    ["tickers", coinId],
    // 인자가 있을때는 함수형태로 넘겨야해서 '()=>함수명(인자)' 식이고 인자가 없을때는 '함수명' 으로 표현. 둘은 동일
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 30000000, // 밀리세컨드 단위로 화면갱신이 가능하다
    }
  );

  console.log("Price:", price);
  const loading = infoLoading || tickerLoading;
  return (
    <Frame>
      <Helmet>
        {/* head 부분을 바꿔줌 */}
        <title>{state?.cool}</title>
      </Helmet>
      {loading ? (
        "loading..."
      ) : (
        <>
          {" "}
          <a href="/">
            <i className="fa-solid fa-house"></i>
          </a>
          <a href="javascript:history.back();">
            <span> Back </span>
          </a>
          <Overview>
            <span>Rank {data?.rank}</span>
            <span>SYMBOL: {data?.symbol}</span>
            <span>OPEN SOURCE: {data?.open_source ? "Yes" : "No"}</span>
          </Overview>
          <Container>
            <Header></Header>
            <Title>
              {state?.cool ? state.cool : loading ? "Loading" : data?.name}
            </Title>
          </Container>
          <Header></Header>
          <Overview>
            <span>PRICE {price?.quotes.USD.price}$</span>
            <span>MARKET CAP: {price?.quotes.USD.market_cap}</span>
          </Overview>
          <nav>
            <Overview>
              {/* 아래두개의 표현식은 결과가 같음 */}
              <Tabs>
                <Tab isAcctive={priceMatch !== null}>
                  <Link to={`/${coinId}/price`}>Price</Link>
                </Tab>
                <Tab isAcctive={chartMatch !== null}>
                  <Link to="chart">Chart</Link>
                </Tab>
              </Tabs>
            </Overview>
          </nav>
          {/* Props가 아닌 context 사용법 {변수이름: 전달되는값} */}
          <Outlet context={{ cool: coinId, price: price }} />
        </>
      )}
    </Frame>
  );
}
