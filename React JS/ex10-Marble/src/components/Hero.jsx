import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Charactor = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 30px;
  background-color: orange;
  max-width: 500px;
  height: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  box-shadow:
    inset 0 0 10px rgba(255, 255, 255),
    0 0 15px rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  box-sizing: border-box;
`;

const ImageContainer = styled.div`
  width: 300px; /* 원하는 너비 */
  height: 300px; /* 원하는 높이 */
  overflow: hidden; /* 이미지가 컨테이너를 넘지 않도록 숨김 */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const HeroTitle = styled.div`
  font-family: "Shadows Into Light", cursive;
  font-size: 2.5rem;
  font-weight: 500;
  font-style: normal;
  color: black; /* 글자 색상 */
  margin-bottom: 20px;
  text-shadow:
    -2px -2px 10px rgba(255, 255, 255, 1),
    2px 2px 10px rgba(255, 255, 255, 1); /* 하얀색 반투명 그림자 */
`;

const CardNumber = styled.div`
  font-family: "Shadows Into Light", cursive;

  font-weight: 500;
  font-size: 1.3rem;
  font-weight: bold;
  color: #f3e4c9; /* 카드 상단에 여백 추가 */
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default function Movie({
  id,
  title,
  summary,
  genres,
  coverImg,
  number,
}) {
  const fallbackImage =
    "https://vqstrategies.com/wp-content/uploads/2020/02/top-secret-stamp.jpg"; // 대체 이미지 경로 설정

  // const fallbackImage = "/top-secret-stamp.webp";

  const isImageAvailable = !coverImg.includes("image_not_available");

  return (
    <Charactor>
      <Header>
        <CardNumber>Hero.{number}</CardNumber>
      </Header>
      <HeroTitle>
        <Link to={`/movie/${id}`}>{title}</Link>
      </HeroTitle>

      <ImageContainer>
        <img
          src={isImageAvailable ? `${coverImg}.jpg` : fallbackImage} // 이미지가 없을 때 대체 이미지 사용
          alt={title}
          height="250px"
        />
      </ImageContainer>
    </Charactor>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,

  title: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,

  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
