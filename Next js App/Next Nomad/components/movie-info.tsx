import axios from "axios";
import { API_URL } from "../app/(home)/page";

async function getMovies(tomato: string) {
  console.log(`Fetching movies", ${Date.now()}`);
  //await new Promise((resolve) => setTimeout(resolve, 5000));
  const res = await axios(`${API_URL}/${tomato}`);
  return res.data;
}

export default async function MovieInfos({ tomato }: { tomato: string }) {
  const Movies = await getMovies(tomato);
  return <h6>{Movies.id}</h6>;
}
