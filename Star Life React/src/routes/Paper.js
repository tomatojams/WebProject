import AppHeader from "../components/nav";
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
  RowContainer,
  Image,
  TextContainer,
  StyledButtonLink,
  Description,
  DescriptionText,
  BoldTitle,
} from "../components/styles";
export default function MainInfo() {
  return (
    <MainContainer>
      <StickyBar>
        <AppHeader />
      </StickyBar>
      <ContentWrapper>
        <SubFullWidthImage image="/Paper/Paper1.webp">
          <EdgeText>
            <EdgeTitle> Teacher ★'s classes</EdgeTitle>
            <EdgeSub>종이접기</EdgeSub>
          </EdgeText>
        </SubFullWidthImage>
        <SubFullContent>
          <EdgeTextBlack>
            <EdgeTitleBlack> Teacher ★'s classes</EdgeTitleBlack>
            <EdgeSubBlack>종이접기 교실</EdgeSubBlack>
            <br />
            <DescriptionText>
              유아, 어린이, 청소년부터 성인까지 <strong>누구나 할 수 있는 종이활동</strong> 입니다.
              <br />
              <br />
              소근육을 자극, 두뇌개발을 도와주고 평면 종이가 입체로 완성되어가는 과정에서 수학,
              과학에 대한 이해와 기하학적 공간 개념을 알게 하여
              <strong> 논리력과 창의력, 집중력 향상</strong>에 도움을 줍니다.
            </DescriptionText>
          </EdgeTextBlack>
        </SubFullContent>
        <SubFullWidthImage image="/Paper/Paper2.jpg">
          <EdgeText>
            <EdgeTitle> Teacher ★'s classes</EdgeTitle>
            <EdgeSub>유아 종이접기</EdgeSub>
          </EdgeText>
        </SubFullWidthImage>
        <SubFullContent>
          <EdgeTextBlack>
            <EdgeTitleBlack> Teacher ★'s classes</EdgeTitleBlack>
            <EdgeSubBlack>유아 종이접기</EdgeSubBlack>

            <DescriptionText>
              <br />
              놀이로 시작되는 유아에게 필요한 <strong>조형활동의 기초와 흥미유발</strong>에 중점을
              둡니다.
              <br /> <br />
              <strong>영재성과 창의성 발달</strong>에 도움을 주는 유아전문 교육과정으로
              평면구성작업과 놀이활동으로 연계되는 종이접기 교육과정
            </DescriptionText>
          </EdgeTextBlack>
        </SubFullContent>{" "}
        <SubFullWidthImage image="/Paper/Paper3.jpg">
          <EdgeText>
            <EdgeTitle> Teacher ★'s classes</EdgeTitle>
            <EdgeSub>어린이 종이접기</EdgeSub>
          </EdgeText>
        </SubFullWidthImage>
        <SubFullContent>
          <EdgeTextBlack>
            <EdgeTitleBlack> Teacher ★'s classes</EdgeTitleBlack>
            <EdgeSubBlack>어린이 종이접기</EdgeSubBlack>
            <br />{" "}
            <DescriptionText>
              연령별 단계에 맞춘 교과서 중심의 교육을 접목한 것입니다. <br /> <br /> 과학적, 수학적
              <strong>사고력 향상을 시켜주고 창의력</strong>을 길러주어 공간 지각력을 키워 논리력이
              자라나 어린이들에게 두뇌개발향상을 시켜주는 교육과정.
            </DescriptionText>
          </EdgeTextBlack>
        </SubFullContent>{" "}
        <SubFullWidthImage image="/Paper/Paper4.jpg">
          <EdgeText>
            <EdgeTitle> Teacher ★'s classes</EdgeTitle>
            <EdgeSub>청소년 종이접기</EdgeSub>
          </EdgeText>
        </SubFullWidthImage>
        <SubFullContent>
          <EdgeTextBlack>
            <EdgeTitleBlack> Teacher ★'s classes</EdgeTitleBlack>
            <EdgeSubBlack>청소년 종이접기</EdgeSubBlack>
            <br />
            <DescriptionText>
              청소년들의 <strong>문화적 감수성과 자아성취감 향상 및 상상력과 창의력 발달</strong>에
              도움 줍니다
              <br /> <br />
              완성도 높은 작품 제작으로 청소년들의 흥미를 유발에
              <strong> 진로탐색과 자기계발</strong>에 도움을 주는 전문교육과정이다.
            </DescriptionText>
          </EdgeTextBlack>
        </SubFullContent>
        <SubFullWidthImage image="/Paper/Paper1.webp">
          <EdgeText>
            <EdgeTitle> Teacher ★'s classes</EdgeTitle>
            <EdgeSub>지도 사범</EdgeSub>
          </EdgeText>
        </SubFullWidthImage>
        <SubFullContent>
          <EdgeTextBlack>
            <EdgeTitleBlack> Teacher ★'s classes</EdgeTitleBlack>
            <EdgeSubBlack>지도사범 종이접기</EdgeSubBlack>
            <br />
            <DescriptionText>
              초급, 사범, 지도사법 자격과정을 통해 유치원,학교, 문화센터,노인복지관 등
              <strong> 교육현장에서의 전문가</strong>를 양성시켜 취미활동과 봉사활동을 물론
              창작활동가로 활동할 수 있는 전문교육과정.
            </DescriptionText>
          </EdgeTextBlack>
        </SubFullContent>
        <RowContainer>
          <Image src="/Paper/Paper6.jpg" alt="자격증 과정" />
          <TextContainer>
            <h2>자격증 과정</h2>
            <Description>
              <BoldTitle>노인종이조형 심리 미술 지도사 자격증</BoldTitle>
              <br /> 색종이, 한지, 골판지, 습자지 등을 미술 매체로 미술 수업할 수 있는 노인종이조형
              심리 미술지도사 자격증. 미술치료 이론을 배우고 실습을 통해 심리미술치료를 알아가는
              과정.
              <br /> <br />
              노인종이조형미술 수업은 어르신들의 <strong>인지 및 감각 운동 기능을 향상</strong>{" "}
              시키고, 무엇보다 <strong>자존감</strong>을 높여 주어서 삶의 의미나 목적까지도 제공해줄
              수 있는 수업.
            </Description>
            <StyledButtonLink to="/board" state={{ fromLecture: true }}>
              강의 신청
            </StyledButtonLink>
          </TextContainer>
        </RowContainer>
        <Footer>
          <FooterText>주소: 수원시 영통구 태장로 81, 501호 스타평생교육원 </FooterText>
          <FooterText>연락처: 031-202-0074 대표: 김경환</FooterText>
          <Copyright>Since 2014 스타 평생 교육원. All rights reserved.</Copyright>
        </Footer>
      </ContentWrapper>
      <FloatingButton></FloatingButton>
    </MainContainer>
  );
}
