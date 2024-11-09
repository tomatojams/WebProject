import axios from "axios";

const MOVIE_API_KEY = import.meta.env.VITE_API_KEY;
import { IMoviesNow } from "./type/IMoviesNow";
import { IMovieInfo } from "./type/IMovieInfo";

const BASE_URL = "https://api.themoviedb.org/3";
const getNowMovies = async (lang: string, page?: number) => {
  const response: { data: IMoviesNow } = await axios.get(
    `${BASE_URL}/movie/now_playing?language=${lang}&page=${page ?? 1}&api_key=${MOVIE_API_KEY}`
  );

  return response.data;
};

const getPopularMovies = async (lang: string, page?: number) => {
  const response: { data: IMoviesNow } = await axios.get(
    `${BASE_URL}/movie/popular?language=${lang}&page=${page ?? 1}&api_key=${MOVIE_API_KEY}`
  );

  return response.data;
};

const getUpcomingMovies = async (lang: string, page?: number) => {
  const response: { data: IMoviesNow } = await axios.get(
    `${BASE_URL}/movie/upcoming?language=${lang}&page=${page ?? 1}&api_key=${MOVIE_API_KEY}`
  );

  return response.data;
};

const getMovieInfo = async (id: number) => {
  const response: { data: IMovieInfo } = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${MOVIE_API_KEY}`
  );

  return response.data;
};

export { getNowMovies, getMovieInfo, getPopularMovies, getUpcomingMovies };
