import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 세로 중앙 정렬을 위한 높이 */
  background-color: black; /* 배경색 추가 (필요에 따라 조정) */
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px; /* 전체 너비 조정 */
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
`;

const HeroTitle = styled.div`
  font-family: "Shadows Into Light", cursive;
  font-size: 2.5rem;
  font-weight: 500;
  color: black;
  text-shadow:
    -2px -2px 10px rgba(255, 255, 255, 1),
    2px 2px 10px rgba(255, 255, 255, 1);
  margin-bottom: 20px;
`;

const RightSection = styled.div`
  width: 50%;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
`;

const HistoryItem = styled.div`
  font-family: "Shadows Into Light", cursive;
  font-weight: bold;
  font-size: 1rem;
  color: #f3e4c9;
  margin-bottom: 5px;
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #f3e4c9;
  color: black;
  border: none;
  cursor: pointer;
  font-family: "Shadows Into Light", cursive;
  &:hover {
    background-color: #e0d1b4;
  }
`;

export default function Detail() {
  const fallbackImage = "https://vqstrategies.com/wp-content/uploads/2020/02/top-secret-stamp.jpg"; // 대체 이미지 경로 설정

  const param = useParams();
  const id = param.id;
  const navigate = useNavigate(); // useNavigate 훅 사용

  const { data: hero, isLoading } = useQuery(["characters"], async () => {
    return await axios
      .get(`https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`)
      .then((res) => res.data.data.results);
  });

  if (isLoading) return <div>Loading...</div>;

  // 이미지 대체 처리
  const imageUrl = hero[0]?.thumbnail.path.includes("image_not_available")
    ? fallbackImage
    : `${hero[0]?.thumbnail.path}.${hero[0]?.thumbnail.extension}`;

  return (
    <PageContainer>
      <HeroTitle>{hero[0]?.name}</HeroTitle>
      <Wrapper>
        <LeftSection>
          <HeroImage src={imageUrl} alt={hero[0]?.name} />
          <BackButton onClick={() => navigate(-1)}>Back</BackButton>
        </LeftSection>
        <RightSection>
          {Array.isArray(hero[0]?.comics.items) &&
            hero[0]?.comics.items.map((item) => (
              <HistoryItem key={item.name}>{item.name}</HistoryItem>
            ))}
        </RightSection>
      </Wrapper>
    </PageContainer>
  );
}
