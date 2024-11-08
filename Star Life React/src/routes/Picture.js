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
  Title,
  Description,
  TwoToOneContainer,
  LargeCard,
  SmallCard,
  CardImage,
} from "../components/styles";
import AppHeader from "../components/nav";
export default function MainInfo() {
  return (
    <MainContainer>
      <StickyBar>
        <AppHeader />
      </StickyBar>
      <ContentWrapper>
        <SubFullWidthImage image="/Picture/Picture01.webp">
          <EdgeText>
            <EdgeTitle> Teacher ★'s classes</EdgeTitle>
            <EdgeSub>미술치료</EdgeSub>
          </EdgeText>
        </SubFullWidthImage>
        <TwoToOneContainer>
          <SmallCard>
            <CardImage src="/Craft/craft09.jpg" />
            <Title>가죽공예</Title>
            <Description>
              다양한 디자인의 가죽 소품들은 실용성과 귀여움을 겸비한 작품들입니다. 고양이 얼굴
              모양의 카드홀더와 사랑스러운 캐릭터 키링 등은 가죽공예로 만들어진 개성 넘치는
              아이템들로, 각자의 취향과 스타일을 표현하기에 적합합니다
            </Description>
          </SmallCard>
          <LargeCard>
            <CardImage src="/Craft/craft10.jpg" />
            <Title>냅킨아트</Title>
            <Description>
              딸기 일러스트가 돋보이는 냅킨아트입니다. 부드러운 색감과 감각적인 디자인으로 소품
              수납에 유용합니다
            </Description>
          </LargeCard>
        </TwoToOneContainer>
        <TwoToOneContainer>
          <LargeCard>
            <CardImage src="/Craft/craft08.jpg" />
            <Title>미니어처공예 -1</Title>
            <Description>
              "귀여운 디테일이 돋보이는 미니어처 도시락 공예 작품입니다. 알록달록한 김밥과 동물 모양
              반찬들이 아기자기한 매력을 더해줍니다.
            </Description>
          </LargeCard>

          <SmallCard>
            <CardImage src="/Craft/craft07.jpg" />
            <Title>미니어처 공예 -2</Title>
            <Description>
              버섯 지붕과 라쿤 캐릭터가 돋보이는 아기자기한 미니어처 공예 작품입니다. 동화 속 장면을
              연상시키는 따뜻한 색감과 디테일이 보는 이에게 즐거움을 선사합니다.
            </Description>
          </SmallCard>
        </TwoToOneContainer>

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
