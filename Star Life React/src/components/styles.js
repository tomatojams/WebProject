import styled from "styled-components";
import { Link } from "react-router-dom";

// 네비게이션 바 래퍼
const StickyBar = styled.div`
  position: sticky;
  top: 0;
  bottom: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  @media (max-width: 768px) {
    position: fixed; /* 모바일에서 하단 고정을 위해 fixed 사용 */
    top: auto; /* 상단 고정 해제 */
    bottom: 0; /* 하단에 고정 */
  }
`;

// 메인 컨테이너 스타일
const MainContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  // height: 100vh;
  min-height: 150vh; /* 뷰포트보다 큰 높이로 설정 */
  /* background-color: #f9f9f9; */
  overflow: visible;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  background-color: white;
  flex-direction: column; // 세로 방향 정렬
  overflow: hidden;
  align-items: center;
`;

//  풀이미지
const FullWidthImage = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.15) 0%,

      rgba(0, 0, 0, 0.15) 100%
    );
    z-index: 1;
  }

  & > * {
    position: relative;
    z-index: 2;
  }
`;

const SubFullWidthImage = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  width: 100%;
  height: 70vh;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(0, 0, 0, 0.15) 80%,
      rgba(0, 0, 0, 0.8) 100%
    );
    z-index: 1;
  }

  & > * {
    position: relative;
    z-index: 2;
  }
`;

// 텍스트

const CenteredText = styled.div`
  color: white;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
  padding: 20px 40px;
  border-radius: 50px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  font-family: "NanumSquareRound", sans-serif; /* 폰트 추가 */
`;

const EdgeText = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 0px;
  padding: 20px 40px;

  text-align: center;
`;

const EdgeTitle = styled.div`
  color: white;
  border-radius: 40px;
  font-size: 20px;
  text-align: center;
  font-family: "NanumSquareRound", sans-serif; /* 폰트 추가 */
`;
const EdgeSub = styled.div`
  color: white;
  border-radius: 40px;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  font-family: "NanumSquareRound", sans-serif;
`;

const EdgeTitleBlack = styled.div`
  color: #555;

  border-radius: 40px;
  font-size: 18px;
  // font-weight: bold;
  text-align: center;
  font-family: "NanumSquareRound", sans-serif;
`;
const EdgeSubBlack = styled.div`
  color: #555;
  border-radius: 40px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  /* font-family: "NanumSquareRound", sans-serif; */
  /* 반응형 폰트 크기 조절 */
  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;
const EdgeTextBlack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #777;
  padding: 20px 40px;
  border-radius: 40px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  /* font-family: "S-Core_Dream", sans-serif;  */
  /* font-family: "NanumSquareRound", sans-serif; */
  /* 반응형 폰트 크기 조절 */
  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

//  푸터
const Footer = styled.footer`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 70px;
  padding: 20px;
  // background-color: #333;
  color: #333;
  font-size: 14px;
  text-align: center;
  line-height: 1.5;
  width: 100%;
`;

const FooterText = styled.div`
  margin: 2px 0;
`;

const Copyright = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #aaa;
`;

//  5. 플로팅 버튼 스타일
const FloatingButton = styled.a.attrs({
  href: "https://open.kakao.com/o/sQCZkNYg",
  target: "_blank",
  rel: "noopener noreferrer",
})`
  position: fixed;
  bottom: 20px;
  right: 40px;
  width: 100px;
  height: 50px;
  background-color: #ffe812;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  text-decoration: none;
  font-size: 20px;
  gap: 0px;
  color: black;

  &:hover {
    background-color: #ffd700;
  }

  &::before {
    content: "";
    background-image: url("/icon/kakao1.png"); /* 이미지 경로 설정 */
    background-size: cover;
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }

  &::after {
    content: "상담"; /* 텍스트 설정 */
  }

  @media (max-width: 768px) {
    top: 40px; /* 상단 고정 해제 */
    bottom: auto; /* 하단에 고정 */
  }
`;

const SubFullContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65%;
  height: 55vh;
  line-height: 1.4;

  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding-top: 20px;
    width: 100%;
    height: 65vh;
  }
`;

// 좌우 배치를 담당하는 메인 컨테이너
const RowContainer = styled.div`
  margin: 30px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  max-width: 1200px;
  /* margin: auto; */
  gap: 20px;

  /* 해상도가 일정 이하로 내려가면 세로 배치로 변경 */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// 이미지 스타일
const Image = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 10px;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

// 텍스트 컨테이너
const TextContainer = styled.div`
  max-width: 600px;
  line-height: 1.7;
  color: #333;

  /* 반응형 폰트 크기 조절 */
  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    @media (max-width: 768px) {
      font-size: 20px;
    }
    @media (max-width: 480px) {
      font-size: 18px;
    }
  }

  p {
    font-size: 18px;
    color: #666;
    @media (max-width: 768px) {
      font-size: 16px;
    }
    @media (max-width: 480px) {
      font-size: 16px;
    }
  }
`;

// 버튼 스타일
const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: #333;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const SixContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;

  /* 반응형으로 화면 크기가 줄어들면 1열 또는 2열로 정렬 */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  overflow: hidden;
  text-align: center;
  padding: 20px;
`;

const SmallImage = styled.img`
  width: 100%;
  height: 400px;
  /* max-height: 200px; */
  object-fit: cover;
  border-radius: 10px;
`;

const Title = styled.h3`
  margin: 15px 0 10px;
  font-size: 21px;
  font-weight: bold;
  color: #333;
`;

const Description = styled.div`
  font-size: 18px;
  color: #666;
  line-height: 1.5;
`;

const BoldTitle = styled.p`
  font-weight: 600;
  color: #333;
  line-height: 1.5;
`;

const DescriptionCraft = styled.p`
  width: 100%;
  text-align: justify;
  font-size: 18px;
  color: #666;
  /* line-height: 2; */
  font-weight: 400;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const DescriptionText = styled.p`
  width: 70%;
  text-align: justify;
  font-size: 18px;
  color: #666;
  line-height: 1.7;
  font-weight: 400;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
// 2:1 비율로 배치하는 컨테이너
const TwoToOneContainer = styled.div`
  /* margin: 30px 0; */
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: 20px auto;
  align-items: stretch; /* 두 카드의 상단 위치를 동일하게 맞춤 */

  /* 반응형 설정: 화면이 작아지면 세로 배치 */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LargeCard = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  padding: 20px;
  height: 100%; /* 높이 고정 */
`;

const SmallCard = styled.div`
  flex: 1;
  display: flex;

  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  padding: 20px;
  height: 100%; /* 높이 고정 */
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  height: 400px; /* 이미지 높이 고정 */
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
`;

// 버튼 스타일을 `Link` 컴포넌트로 교체
const StyledButtonLink = styled(Link)`
  padding: 10px 20px;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  margin-top: 15px;
  display: inline-block; /* 스타일을 버튼처럼 유지 */

  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 14px;
  }

  &:hover {
    background-color: #e0e0e0;
  }
`;

export {
  FullWidthImage,
  SubFullWidthImage,
  MainContainer,
  ContentWrapper,
  CenteredText,
  EdgeText,
  EdgeTitle,
  EdgeSub,
  Footer,
  FooterText,
  Copyright,
  FloatingButton,
  StickyBar,
  SubFullContent,
  EdgeTitleBlack,
  EdgeSubBlack,
  EdgeTextBlack,
  RowContainer,
  Image,
  TextContainer,
  StyledButton,
  SixContainer,
  Card,
  SmallImage,
  Title,
  Description,
  TwoToOneContainer,
  LargeCard,
  SmallCard,
  CardImage,
  StyledButtonLink,
  DescriptionText,
  BoldTitle,
  DescriptionCraft,
};
