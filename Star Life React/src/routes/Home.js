import AppHeader from "../components/nav";

import {
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
} from "../components/styles";

// 컴포넌트
export default function MainInfo() {
  return (
    <MainContainer>
      <StickyBar>
        <AppHeader />
      </StickyBar>

      <ContentWrapper>
        <FullWidthImage image="/Home/Home_Title.webp">
          <CenteredText>
            <EdgeTitle style={{ fontSize: "20px" }}> Teacher ★'s classes</EdgeTitle>
            <EdgeSub style={{ fontSize: "35px" }}> 스타 평생 교육원</EdgeSub>
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
          <FooterText>연락처: 031-202-0074 대표: 김경환</FooterText>
          <Copyright>Since 2014 스타 평생 교육원. All rights reserved.</Copyright>
        </Footer>

        <FloatingButton></FloatingButton>
      </ContentWrapper>
    </MainContainer>
  );
}
