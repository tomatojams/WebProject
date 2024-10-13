import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

const CardNumber = styled.div`
  font-family: "Shadows Into Light", cursive;

  font-weight: 500;
  font-size: 1.3rem;
  font-weight: bold;
  color: #f3e4c9; /* 카드 상단에 여백 추가 */
`;

export default function Detail() {
  const param = useParams();
  const id = param.id;
  const [hero, setHero] = useState({});
  console.log(id);
  const getHero = async () => {
    const json = await (
      await fetch(`https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`)
    ).json();
    console.log(json.data.results);
    setHero(json.data.results);
  };
  useEffect(() => {
    getHero(); // async에서만 await를 쓰므로 다른 함수를 만들어서 실행하고 세팅한후에
    // useEffect로 한번만 실행
  }, []);
  console.log(hero);
  return (
    <div>
      <CardNumber>{hero[0]?.name}white</CardNumber>
      <img src={`${hero[0]?.thumbnail.path}.jpg`} alt="" />
      <h4>{hero[0]?.name}</h4>
    </div>
  );
}
