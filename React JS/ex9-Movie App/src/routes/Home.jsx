import Movie from "../components/movie";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  // const getMovies = async () => {
  //   const json = await (
  //     await fetch(
  //       "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
  //     )
  //   ).json();
  //   setMovieList(json.data.movies);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getMovies();
  // }, []);
  // console.log(movies);
  // -> 다음처럼 바꿀 수 있음
  useEffect(() => {
    // 시작할때 한번실행의 의미로 쓸수있음
    fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`)
      .then((response) => response.json()) // 제이슨 형을 JS 객체로 파싱
      .then((json) => {
        // 파싱된 데이타로 json 이 아닌 JS 객체임
        //
        // console.log(json.data.movies[0]);
        setMovies(json.data.movies);
        setLoading(false); // response 받은 다음에 해야함 외부에 하면 로딩없이 false 세팅이 됨
      });
    // .then((json) => console.log(json.data.movies));
  }, []);
  // console.log(movies);
  return (
    <>
      {loading ? (
        <strong>Loading</strong>
      ) : (
        <div>
          {movies.length === 0
            ? null
            : movies.map(
                (movie) => (
                  <Movie
                    id={movie.id}
                    key={movie.id} // 맵내에서 사용, 추가로 입력함 반복생성을 위한 키
                    coverImg={movie.medium_cover_image}
                    title={movie.title}
                    genres={movie.genres}
                    summary={movie.summary}
                  />
                )
                // 새로운 리스트로 돌려주고 그 형식을 지정
              )}
        </div>
      )}
    </>
  );
}
