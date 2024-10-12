import Movie from "../components/movie";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [char, setChar] = useState([]);

  useEffect(() => {
    // 시작할때 한번실행의 의미로 쓸수있음
    fetch(
      `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters?limit=50&orderBy=modified&series=24229,1058,2023`
    )
      .then((response) => response.json()) // 제이슨 형을 JS 객체로 파싱
      .then((json) => {
        // 파싱된 데이타로 json 이 아닌 JS 객체임
        //
        console.log(json.data.results);
        setChar(json.data.results);
        setLoading(false); // response 받은 다음에 해야함 외부에 하면 로딩없이 false 세팅이 됨
      });
    // .then((json) => console.log(json.data.movies));
  }, []);
  // console.log(movies);
  return (
    <>
      {loading ? (
        <strong>Loading</strong>
      ) : (
        <div>
          {char.length === 0
            ? null
            : char.map(
                (char) => (
                  <Movie
                    id={char.id}
                    key={char.id} // 맵내에서 사용, 추가로 입력함 반복생성을 위한 키
                    coverImg={char.thumbnail.path}
                    title={char.name}
                    genres={char.name}
                    summary={char.description}
                  />
                )
                // 새로운 리스트로 돌려주고 그 형식을 지정
              )}
        </div>
      )}
    </>
  );
}
