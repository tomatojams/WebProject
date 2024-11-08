import {
  MainContainer,
  ContentWrapper,
  Footer,
  FooterText,
  Copyright,
  FloatingButton,
  StickyBar,
  RowContainer,
  Image,
  TextContainer,
  StyledButtonLink,
} from "../components/styles";
// import "leaflet/dist/leaflet.css";

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
        <RowContainer>
          <Image src="/Paper/Paper1.webp" alt="자격증 과정" />
          <TextContainer>
            <h2>종이접기 강의소개</h2>
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
            <h2>산림치유 강의소개</h2>
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
          <Image src="/Forest/forest1.webp" alt="자격증 과정" />
        </RowContainer>
        <RowContainer>
          <Image src="/Paper/Paper1.webp" alt="자격증 과정" />
          <TextContainer>
            <h2>종이접기 강의소개</h2>
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
            <h2>산림치유 강의소개</h2>
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
          <Image src="/Forest/forest1.webp" alt="자격증 과정" />
        </RowContainer>
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
