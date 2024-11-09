import axios from "axios";

const MOVIE_API_KEY = import.meta.env.VITE_API_KEY;
import { IMoviesNow } from "./type/IMoviesNow";
import { IMovieInfo } from "./type/IMovieInfo";

const BASE_URL = "https://api.themoviedb.org/3";
const getMovies = async (lang: string, page?: number) => {
  const response: { data: IMoviesNow } = await axios.get(
    `${BASE_URL}/movie/now_playing?language=${lang}&page=${page ?? 1}&api_key=${MOVIE_API_KEY}`
  );

  return response.data;
};

const getMovieInfo = async (id: number) => {
  const response: { data: IMovieInfo } = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${MOVIE_API_KEY}`
  );

  return response.data;
};

const searchMovie = async (search?: string) => {
  const response = await axios.get(`${BASE_URL}/search/movie?query=${search}&api_key=${MOVIE_API_KEY}`);
  return response.data
}
//  testcode
// https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=7c0fb96643e4670141de03eaac64aed6
//   https://api.themoviedb.org/3/movie/now_playing?language=kr&page=1&api_key=7c0fb96643e4670141de03eaac64aed6

// https://api.themoviedb.org/3/search/movie?api_key=api_key&language=en-US&query=hello&page=1&include_adult=false
// https://developers.themoviedb.org/3/search/search-movies
export { getMovies, getMovieInfo ,searchMovie};
