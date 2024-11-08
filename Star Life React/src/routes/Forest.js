import {
  SubFullWidthImage,
  MainContainer,
  ContentWrapper,
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
} from "../components/styles";

import AppHeader from "../components/nav";
// from api
//  플로팅 버튼 스타일
export default function MainInfo() {
  return (
    <MainContainer>
      <StickyBar>
        <AppHeader />
      </StickyBar>
      <ContentWrapper>
        <SubFullWidthImage image="/Forest/forest1.webp">
          <EdgeText>
            <EdgeTitle> Teacher ★'s classes</EdgeTitle>
            <EdgeSub>산림치유</EdgeSub>
          </EdgeText>
        </SubFullWidthImage>
        <SubFullContent>
          <EdgeTextBlack>
            <EdgeTitleBlack> Teacher ★'s classes</EdgeTitleBlack>
            <EdgeSubBlack>산림치유</EdgeSubBlack>
            <br />
            산림치유는 자연 속에서 몸과 마음을 치유하는 특별한 경험입니다. 숲에서의 산책과 다양한
            프로그램을 통해 스트레스를 해소하고 심신의 균형을 되찾을 수 있습니다. 자연의 소리와
            향기, 맑은 공기 속에서 힐링을 경험하며 건강을 증진해 보세요. 산림치유 전문가들이
            함께하며 맞춤형 프로그램을 제공합니다. 자연과 하나 되는 산림치유로 건강한 삶을 시작해
            보세요.
          </EdgeTextBlack>
        </SubFullContent>
        <SubFullWidthImage image="/Forest/forest2.webp">
          <EdgeText>
            <EdgeTitle> Teacher ★'s classes</EdgeTitle>
            <EdgeSub>산림치유</EdgeSub>
          </EdgeText>
        </SubFullWidthImage>
        <SubFullWidthImage image="/Forest/forest3.webp"></SubFullWidthImage>
        <SubFullWidthImage image="/Forest/forest4.webp"></SubFullWidthImage>
        <SubFullWidthImage image="/Forest/forest5.webp"></SubFullWidthImage>
        <SubFullWidthImage image="/Forest/forest6.webp"></SubFullWidthImage>

        <Footer>
          <FooterText>주소: 수원시 영통구 태장로 81, 501호 스타평생교육원 </FooterText>
          <FooterText>연락처: 031-202-0074 대표: 원장:김경환</FooterText>
          <Copyright>© 2024 스타 평생 교육원. All rights reserved.</Copyright>
        </Footer>
      </ContentWrapper>
      <FloatingButton
        href="https://open.kakao.com/o/gF91oLYg"
        target="_blank"
        rel="noopener noreferrer">
        <img src="/icon/kakao1.png" alt="카카오톡 오픈채팅" />
        상담
      </FloatingButton>
    </MainContainer>
  );
}
