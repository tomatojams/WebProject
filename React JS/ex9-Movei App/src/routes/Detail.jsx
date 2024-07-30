import { json, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Detail() {
  const param = useParams();
  const id = param.id;
  const [movie, setMovie] = useState({});

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data.movie);
    setMovie(json.data.movie);
  };
  useEffect(() => {
    getMovie(); // async에서만 await를 쓰므로 다른 함수를 만들어서 실행하고 세팅한후에
    // useEffect로 한번만 실행
  }, []);

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.large_cover_image} alt="" />

      <h4>{movie.title_long}</h4>
    </div>
  );
}
