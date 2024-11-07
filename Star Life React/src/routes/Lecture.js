import styled from "styled-components";

// import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import AppHeader from "../components/nav";
// from api

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  // height: 100vh;

  background-color: #f9fbfd;
  overflow-y: auto; // 세로 스크롤 가능하게 설정
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column; // 세로 방향 정렬
  overflow-y: visible;
`;

const StickyHeader = styled(AppHeader)`
  position: sticky; // 스크롤 시 고정
  top: 0;
  z-index: 1000; // 헤더가 다른 요소 위에 나타나도록 설정
  background-color: white; // 스크롤 시 배경색 유지
`;
const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  // background-color: #333;
  color: #333;
  font-size: 14px;
  text-align: center;
  line-height: 1.5;
`;

const FooterText = styled.div`
  margin: 5px 0;
`;

const Copyright = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #aaa;
`;
// 컴포넌트

// 좌우 배치를 담당하는 메인 컨테이너
const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  max-width: 1200px;
  margin: auto;

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
  line-height: 1.6;
  color: #333;
  padding: 20px;

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
    font-size: 16px;
    color: #666;
    @media (max-width: 768px) {
      font-size: 14px;
    }
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }
`;

// 버튼 스타일
// 버튼 스타일을 `Link` 컴포넌트로 교체
const StyledButtonLink = styled(Link)`
  padding: 10px 20px;
  font-size: 14px;
  color: #333;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  margin-top: 15px;
  display: inline-block; /* 스타일을 버튼처럼 유지 */

  @media (max-width: 768px) {
    font-size: 12px;
  }
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;
export default function MainInfo() {
  return (
    <MainContainer>
      <StickyHeader />
      <ContentWrapper>
        <RowContainer>
          <Image src="/Paper/Paper1.webp" alt="자격증 과정" />
          <TextContainer>
            <h2>자격증 과정</h2>
            <p>
              노인종이조형 심리 미술 지도사 자격증: 색종이, 한지, 골판지, 습자지 등을 미술 매체로
              미술 수업할 수 있는 노인종이조형 심리 미술지도사 자격증. 미술치료 이론을 배우고 실습을
              통해 심리미술치료를 알아가는 과정. 노인종이조형미술 수업은 어르신들의 인지 및 감각
              운동 기능을 항상 시키고, 무엇보다 자존감을 높여 주어서 삶의 의미나 목적까지도 제공해줄
              수 있는 수업.
            </p>
            <StyledButtonLink to="/board" state={{ fromLecture: true }}>
              강의 신청
            </StyledButtonLink>
          </TextContainer>
        </RowContainer>
        <RowContainer>
          <TextContainer>
            <h2>자격증 과정</h2>
            <p>
              노인종이조형 심리 미술 지도사 자격증: 색종이, 한지, 골판지, 습자지 등을 미술 매체로
              미술 수업할 수 있는 노인종이조형 심리 미술지도사 자격증. 미술치료 이론을 배우고 실습을
              통해 심리미술치료를 알아가는 과정. 노인종이조형미술 수업은 어르신들의 인지 및 감각
              운동 기능을 항상 시키고, 무엇보다 자존감을 높여 주어서 삶의 의미나 목적까지도 제공해줄
              수 있는 수업.
            </p>
            <StyledButtonLink to="/board" state={{ fromLecture: true }}>
              강의 신청
            </StyledButtonLink>
          </TextContainer>
          <Image src="/Forest/Forest1.webp" alt="자격증 과정" />
        </RowContainer>
        <Footer>
          <FooterText>주소: 서울특별시 강남구 테헤란로 123</FooterText>
          <FooterText>연락처: 010-1234-5678 대표: 원장:김경환</FooterText>
          <FooterText>이메일: example@example.com</FooterText>
          <Copyright>© 2024 스타 평생 교육원. All rights reserved.</Copyright>
        </Footer>
      </ContentWrapper>
    </MainContainer>
  );
}
