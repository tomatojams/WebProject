import axios from "axios";

import { API_URL } from "../../../(home)/page";
import MovieInfos from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";
import { Suspense } from "react";

export async function getMovies(tomato: string) {
  const res = await axios(`${API_URL}/${tomato}`);
  return res.data;
}

async function getVideos(tomato: string) {
  const res = await axios(`${API_URL}/${tomato}/videos`);
  return res.data;
}
/* 
테스트 
  http://localhost:3000/movies/123323?region=kr&page=2

params외에도 쿼리 파라미터도 찾아줌

  params: { tomato: '123323' },
  searchParams: { region: 'kr', page: '2' } */

export default async function Movie({
  params: { tomato },
}: {
  params: { tomato: string };
}) {
  // 동시에 불러오기**
  // 단점 -  모두 불러와져야 렌더링이 됨**

  // const [movies, videos] = await Promise.all([
  //   getMovies(tomato),
  //   getVideos(tomato),
  // ]);

  // console.log("video", videos[0]);

  return (
    <>
      <h4>Movie detail page</h4>
      {/* Suespense를 쓰면 각각에 대해서 로딩상태 표시가가능*/}
      <Suspense fallback={<h3>Loading movieInfo</h3>}>
        {" "}
        <MovieInfos tomato={tomato} />
      </Suspense>
      <Suspense fallback={<h3>Loading movieVideo</h3>}>
        {" "}
        <MovieVideos tomato={tomato} />
      </Suspense>
    </>
  );
}
