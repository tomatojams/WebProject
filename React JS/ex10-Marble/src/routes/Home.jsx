import Hero from "../components/Hero";

import { useQuery } from "react-query";
import styled from "styled-components";
import axios from "axios";

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
  justify-content: center;
  gap: 30px 30px;
  flex-wrap: wrap;
  padding: 0px 50px;
  background-color: black;
`;

const Header = styled.div`
  margin: 50px;
`;

export default function Home() {
  // const [loading, setLoading] = useState(true);
  // const [char, setChar] = useState([]);

  const { data: char, isLoading } = useQuery(["characters"], async () => {
    return await axios
      .get(
        `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters?limit=50&orderBy=modified&series=24229,1058,2023`
      )
      .then((res) => res.data.data.results);
  });

  console.log(char);
  return (
    <Back>
      {isLoading ? (
        <strong>Loading</strong>
      ) : (
        <>
          <Header>
            <img
              width="400px"
              src="https://i0.wp.com/moviesgamesandtech.com/wp-content/uploads/2013/09/Marvel-Heroes-Logo.png?fit=782%2C294&quality=80&ssl=1"
              alt=""
            />
          </Header>

          <MainContainer>
            <></>
            {isLoading
              ? null
              : char.map((char, index) => (
                  <Hero
                    id={char.id}
                    key={char.id}
                    coverImg={char.thumbnail.path}
                    extension={char.thumbnail.extension}
                    title={char.name}
                    genres={char.name}
                    summary={char.description}
                    number={index + 1}
                  />
                ))}
          </MainContainer>
        </>
      )}
    </Back>
  );
}
