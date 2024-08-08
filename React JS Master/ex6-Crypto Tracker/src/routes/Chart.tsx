import { useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IChart {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Overview = styled.div``;
export default function Chart() {
  // 매개변수받기 방법1
  // const param = useParams();
  // console.log("Param:", param);
  // 방법2  Outlet context로 받기
  const { cool } = useOutletContext<{ cool: string }>();
  console.log("CoinID:", cool);
  // Coin에서 coinId 변수명을 cool이라고 넣어서 여기서는 cool이 아이디
  const { isLoading, data: chart } = useQuery<IChart[]>(["ohlcv", cool], () =>
    fetchCoinHistory(cool)
  );
  const isDark = useRecoilValue(isDarkAtom);

  console.log("Chart:", chart);

  const seriesData =
    chart?.map((item: IChart) => ({
      x: item.time_open * 1000,
      y: [item.open, item.high, item.low, item.close],
    })) || []; // 또는 빈배열로 undefined 포함

  return (
    <Overview>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          height="auto"
          width="500px"
          // type="line"
          // series={[
          //   {
          //     name: "Price",
          //     // 타입캐스팅을 통한 강제 형변환
          //     data: chart?.map((item) => item.close) as number[],
          //   },
          // ]}

          type="candlestick"
          series={[
            {
              data: seriesData,
            },
          ]}
          options={{
            grid: { show: false },
            stroke: { curve: "smooth", width: 3 },
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              parentHeightOffset: 0,
              toolbar: { show: false },
              background: "transparent",
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: chart?.map((price) =>
                // new Date(price.time_close * 1000).toISOString()
                new Date(price.time_close * 1000).toUTCString()
              ),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },
            colors: ["violet"],
            tooltip: {
              y: { formatter: (value) => `$ ${value.toFixed(2)}` },
            },
          }}
        />
      )}
    </Overview>
  );
}
