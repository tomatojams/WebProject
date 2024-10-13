import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Back = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px 30px;
  flex-wrap: wrap;
  padding: 0px 50px;
  background-color: black;
`;

const Header = styled.div`
  margin: 50px;
`;

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
    <Back>
      {loading ? (
        <strong>Loading</strong>
      ) : (
        <>
          <Header>
            {" "}
            <img
              src="https://i0.wp.com/moviesgamesandtech.com/wp-content/uploads/2013/09/Marvel-Heroes-Logo.png?fit=782%2C294&quality=80&ssl=1"
              alt=""
            />
          </Header>

          <MainContainer>
            <></>
            {char.length === 0
              ? null
              : char.map(
                  (char, index) => (
                    <Hero
                      id={char.id}
                      key={char.id} // 맵내에서 사용, 추가로 입력함 반복생성을 위한 키
                      coverImg={char.thumbnail.path}
                      title={char.name}
                      genres={char.name}
                      summary={char.description}
                      number={index + 1}
                    />
                  )
                  // 새로운 리스트로 돌려주고 그 형식을 지정
                )}
          </MainContainer>
        </>
      )}
    </Back>
  );
}
