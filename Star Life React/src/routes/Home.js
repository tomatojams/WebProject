import styled from "styled-components";

// import "leaflet/dist/leaflet.css";

import AppHeader from "../components/nav";
// from api

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

  /* 내용물의 z-index를 높여서 오버레이 위에 표시 */
  & > * {
    position: relative;
    z-index: 2;
  }
`;

const SubFullWidthImage = styled.div`
  padding: 30px 30px;
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

const CenteredText = styled.div`
  color: white;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
  padding: 20px 40px;
  border-radius: 40px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
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
  // font-weight: bold;
  text-align: center;
`;
const EdgeSub = styled.div`
  color: white;

  border-radius: 40px;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
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

//  플로팅 버튼 스타일
const FloatingButton = styled.a`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 110px;
  height: 55px;
  background-color: #ffe812;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  text-decoration: none;
  font-size: 20px;
  gap: 10px;

  &:hover {
    background-color: #ffd700;
  }

  img {
    width: 32px;
    height: 32px;
  }
`;
// 컴포넌트
export default function MainInfo() {
  return (
    <MainContainer>
      <StickyHeader />
      <ContentWrapper>
        <FullWidthImage image="/Home/Home_Title.webp">
          <CenteredText>
            Teacher ★'s classes
            <br />
            스타 평생 교육원
          </CenteredText>
        </FullWidthImage>

        <SubFullWidthImage image="/Home/Home2.webp">
          <EdgeText>
            <EdgeTitle> Teacher ★'s classes</EdgeTitle>
            <EdgeSub>공예</EdgeSub>
          </EdgeText>
        </SubFullWidthImage>

        <SubFullWidthImage image="/Home/Home3.webp">
          <EdgeText>
            <EdgeTitle> Teacher ★'s classes</EdgeTitle>
            <EdgeSub>쿠키클레이</EdgeSub>
          </EdgeText>
        </SubFullWidthImage>
        <SubFullWidthImage image="/Home/Home4.webp">
          <EdgeText>
            <EdgeTitle> Teacher ★'s classes</EdgeTitle>
            <EdgeSub>종이접기</EdgeSub>
          </EdgeText>
        </SubFullWidthImage>
        <SubFullWidthImage image="/Home/Home5.webp">
          <EdgeText>
            <EdgeTitle> Teacher ★'s classes</EdgeTitle>
            <EdgeSub>산림치유</EdgeSub>
          </EdgeText>
        </SubFullWidthImage>
        <SubFullWidthImage image="/Home/Home6.webp">
          <EdgeText>
            <EdgeTitle> Teacher ★'s classes</EdgeTitle>
            <EdgeSub>미술치료</EdgeSub>
          </EdgeText>
        </SubFullWidthImage>
        {/* 푸터 컴포넌트 추가 */}

        <Footer>
          <FooterText>주소: 수원시 영통구 태장로 81, 501호 스타평생교육원 </FooterText>
          <FooterText>연락처: 031-202-0074 대표: 원장:김경환</FooterText>
          <Copyright>© 2024 스타 평생 교육원. All rights reserved.</Copyright>
        </Footer>

        <FloatingButton
          href="https://open.kakao.com/o/gF91oLYg"
          target="_blank"
          rel="noopener noreferrer">
          <img src="/icon/kakao1.png" alt="카카오톡 오픈채팅" />
          상담
        </FloatingButton>
      </ContentWrapper>
    </MainContainer>
  );
}
