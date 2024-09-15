import axios from "axios";

const MOVIE_API_KEY = import.meta.env.VITE_API_KEY;
export interface Dates {
  maximum:string;
  minimum: string;
}

export interface IMovies {
  adult:             boolean;
  backdrop_path?:     string;
  genre_ids:         number[];
  id:                number;
  original_language: OriginalLanguage;
  original_title:    string;
  overview:          string;
  popularity:        number;
  poster_path:       string;
  release_date:      Date;
  title:             string;
  video:             boolean;
  vote_average:      number;
  vote_count:        number;
}

export enum OriginalLanguage {
  CN = "cn",
  En = "en",
  Hi = "hi",
}
export interface IMoviesNow {
  dates:         Dates;
  page:          number;
  results:       IMovies[];
  total_pages:   number;
  total_results: number;
}
const BASE_URL = "https://api.themoviedb.org/3";
const getMovies = async (lang: string, page?: number) => {
  const response: {data:IMoviesNow} = await axios.get(
    `${BASE_URL}/movie/now_playing?language=${lang}&page=${
      page ?? 1
    }&api_key=${MOVIE_API_KEY}`
  );


 
  return response.data;
};

//  testcode
//   https://api.themoviedb.org/3/movie/now_playing?language=kr&page=1&api_key=7c0fb96643e4670141de03eaac64aed6
export { getMovies };
