import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";

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
  console.log(id);

 
  const { data: hero, isLoading } = useQuery(["characters"], async () => {
    return await axios
      .get(
        `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`
      )
      .then((res) => res.data.data.results);
  });

  console.log(hero);
  return (
    <div>
      <CardNumber>{hero[0]?.name}white</CardNumber>
      <img src={`${hero[0]?.thumbnail.path}.jpg`} alt="" />
      <h4>{hero[0]?.name}</h4>
    </div>
  );
}
