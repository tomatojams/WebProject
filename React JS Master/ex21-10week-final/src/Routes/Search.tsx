import { useLocation } from "react-router-dom";
import { searchMovie } from "../api";

export default function Search() {
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);
  console.log(searchParam.get("keyword"));

  searchMovie;

  // const { data, isLoading } = useQuery(["movies", "search"], () =>
  //   searchMovie(searchParam.get("keyword"))
  // );

  // console.log(data)
  return <></>;
}
