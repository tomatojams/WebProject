import axios from "axios";

const MOVIE_API_KEY = import.meta.env.VITE_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";
const getMovies = async (lang: string, page?: number) => {
  const response = await axios.get(
    `${BASE_URL}/movie/now_playing?language=${lang}&page=${
      page ?? 1
    }&api_key=${MOVIE_API_KEY}`
  );
  return response.data;
};

//  testcode
//   https://api.themoviedb.org/3/movie/now_playing?language=kr&page=1&api_key=7c0fb96643e4670141de03eaac64aed6
export { getMovies };
