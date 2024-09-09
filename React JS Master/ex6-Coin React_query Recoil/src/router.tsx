import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import CoinList from "./routes/CoinList";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoinList />} />
        {/* /*를 넣어 nested route가 된다는 것을 표시  Coin 컴포넌트에는 <Oulet/>으로 구성*/}
        <Route path="/:coinId/*" element={<Coin />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
