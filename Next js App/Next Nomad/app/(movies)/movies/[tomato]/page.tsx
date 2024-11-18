import axios from "axios";

const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";
import MovieInfos from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";
import { Suspense } from "react";

interface IParams {
  params: {
    tomato: string;
  };
}

export async function generateMetadata({ params: { tomato } }:IParams) {
  
  const movie = await getMovies(tomato);
  return {
    title: movie.title,
    description: "Movie",
  };

}


export async function getMovies(tomato: string) {
  const res = await axios(`${API_URL}/${tomato}`);
  return res.data;
}

async function getVideos(tomato: string) {
  const res = await axios(`${API_URL}/${tomato}/videos`);
  return res.data;
}

export default async function Movie({ params: { tomato } }: IParams) {
  return (
    <div>
      <Suspense fallback={<h3>Loading movieInfo</h3>}>
        <MovieInfos tomato={tomato} />
      </Suspense>
      <Suspense fallback={<h3>Loading movieVideo</h3>}>
        <MovieVideos tomato={tomato} />
      </Suspense>
    </div>
  );
}
