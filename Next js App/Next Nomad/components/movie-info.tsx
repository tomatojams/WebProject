import axios from "axios";
const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";
import styles from "../app/styles/movie-info.module.css";
async function getMovies(tomato: string) {
  console.log(`Fetching movies", ${Date.now()}`);
  //await new Promise((resolve) => setTimeout(resolve, 5000));
  const res = await axios(`${API_URL}/${tomato}`);
  return res.data;
}

export default async function MovieInfos({ tomato }: { tomato: string }) {
  const Movies = await getMovies(tomato);
  return (
    <div className={styles.container}>
      <img src={Movies.poster_path} alt={Movies.title} />
      <div className={styles.info}>
        <h1 className={styles.title}>{Movies.title}</h1>
        <h2>⭐{Movies.vote_average.toFixed(1)}</h2>
        <p>{Movies.overview}</p>
        <a href={Movies.homepage} target={"_blank"}>
          Homepage &rarr;
        </a>
      </div>
    </div>
  );
}
