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

import AppHeader from "../components/nav";

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
              시간: 오전 9시 ~ 오후 6시
              <br />
              <strong>노인종이조형 심리 미술 지도사 자격증</strong>
              <br />
              <br /> 색종이, 한지 ,골판지, 습자지등을 매체로 미술수업을 할 수 있는 노인종이조형 심리
              미술지도사 자격증입니다. <br />
              <strong>미술치료이론을 배우고 실습</strong>을 통해 심리미술치료를 알아가는 과정.
              노인종이조형미술수업은 어르신들의 인지 및 감각 운동 기능을 향상 시키고, 무엇보다{" "}
              <strong>자존감</strong>을 높여 주어서 삶의 의미나 목적까지도 제공해줄 수 있는 수업.
            </p>
            <StyledButtonLink to="/board" state={{ fromLecture: true }}>
              강의 신청<strong></strong>
            </StyledButtonLink>
          </TextContainer>
        </RowContainer>
        <RowContainer>
          <TextContainer>
            <h2>토탈공예 강의소개</h2>
            <p>
              시간: 오전 9시 ~ 오후 6시
              <br />
              <strong>다양한 공예 기법과 재료를 결합해 예술 작품을 창작하는 공예</strong>. <br />
              <br />
              여러가지 기법과 재료를 혼합해 다양한 형태와 표현 방식을 시도하여{" "}
              <strong>창의적인 작품</strong>을 만들 수 있다. 다른 예술 분야와도 연계하기 쉬워서
              <strong> 회화, 조각, 건축 등과 접목가능. </strong>
              토탈공예에서는 클레이, 레진공예, 냅킨공예, 캔들공예, 지끈공예, 가죽공예, 비즈공예,
              미니어쳐, 우드공예 등 배울 수 있다.
            </p>
            <StyledButtonLink to="/board" state={{ fromLecture: true }}>
              강의 신청
            </StyledButtonLink>
          </TextContainer>
          <Image src="/Craft/craft00.webp" alt="자격증 과정" />
        </RowContainer>
        <RowContainer>
          <Image src="/Picture/picture00.webp" alt="자격증 과정" />
          <TextContainer>
            <h2>미술치료 강의소개</h2>
            <p>
              {" "}
              시간: 오전 9시 ~ 오후 6시
              <br />
              저희<strong> 마인드 플러스 심리상담센터</strong> 는 건강한 사회를 만들기 위해 치유와
              나눔을 실천하고, 심신의 어려움을 겪고 있는 아동청소년, 성인, 노인, 직장인을 대상으로
              상담과 다양한 치료기법을 통해<strong> 자기이해와 자기수용 능력을 향상</strong> 시켜
              개인의 성장을 돕고 삶의 현실에서 큰 울타리가 되어{" "}
              <strong>마음의 안식처와 마음치유의 공간</strong>이 되어 내담자 중심의 센터로 여러분과
              함께 합니다.
            </p>
            <StyledButtonLink to="/board" state={{ fromLecture: true }}>
              강의 신청
            </StyledButtonLink>
          </TextContainer>
        </RowContainer>
        {/* <RowContainer>
          <TextContainer>
            <h2>산림치유 강의소개</h2>
            <p>
              {" "}
              시간: 오전 9시 ~ 오후 6시
              <br />
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
        </RowContainer> */}
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
