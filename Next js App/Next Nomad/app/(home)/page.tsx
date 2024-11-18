// 메타데이타는 page 또는  layout 만 export 가능
// 메타데이타는 서버컴포넌트에만 있음

import axios from "axios";

import Movie from "../../components/movie";
import styles from "../styles/home.module.css";

export const metadata = {
  title: "Home",
};

const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
  const res = await axios(API_URL);
  return res.data;
}

export default async function TomatoHome() {
  const movies = await getMovies();

  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <Movie key={movie.id} id={movie.id} title={movie.title} poster_path={movie.poster_path} />
      ))}
    </div>
  );
}
