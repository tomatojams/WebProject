import { useOutletContext } from "react-router-dom";
import { styled } from "styled-components";
import { format } from "date-fns";

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
  background-color: azure;
  padding: 10px 20px;
  border-radius: 10px;
  width: 500px;
`;
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

interface IPrice {
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

const Overview = styled.div``;
export default function Price() {
  // 라우트 설정해서 받은 매개변수는 usetOutletContext로 받는다
  // Props로 받는것이 아니라 context로 받는것임
  const { cool, price } = useOutletContext<{ cool: string; price: IPrice }>();
  console.log("CoinID:", cool);
  console.log("Price", price);
  // 날짜 포맷팅 함수
  const formatDate = (date: Date) => {
    return format(new Date(date), "PPpp");
  };
  return (
    <Overview>
      <Frame>
        <Tabs>
          ATH_DATE:{" "}
          {price?.quotes.USD.ath_date
            ? formatDate(price.quotes.USD.ath_date)
            : "N/A"}{" "}
        </Tabs>{" "}
        <Tabs> RANK: {price?.rank}</Tabs>
        <Tabs>MAX SUPPLY:{price?.max_supply}</Tabs>
        <Tabs>ATH_PRICE: {price?.quotes.USD.ath_price} $</Tabs>
      </Frame>
    </Overview>
  );
}
