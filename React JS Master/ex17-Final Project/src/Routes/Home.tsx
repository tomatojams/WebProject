import { useQuery } from "react-query";
import { getMovies } from "../api";

export default function Home() {
  const {data, isLoading} = useQuery({ queryKey: ['movies', "nowPlaying"], queryFn: getMovies })
  return (
    <>{data}
      <div style={{ backgroundColor: "black", height: "200vh" }}></div>
    </>
  );
}
