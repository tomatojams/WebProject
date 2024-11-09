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
        <SubFullWidthImage image="/Picture/picture00.webp">
          <EdgeText>
            <EdgeTitle> Teacher ★'s classes</EdgeTitle>
            <EdgeSub>미술치료</EdgeSub>
          </EdgeText>
        </SubFullWidthImage>
        <TwoToOneContainer>
          <SmallCard>
            <CardImage src="/Picture/picture01.webp" />
            <Title>미술 치료사로의 첫걸음</Title>
            <Description>
              미술치료 수업에서 자신만의 작품을 완성한 후 선생님과 함께 기념사진을 찍고 있습니다.
            </Description>
          </SmallCard>
          <LargeCard>
            <CardImage src="/Picture/picture02.webp" />
            <Title>손끝으로 그려낸 마음의 이야기</Title>
            <Description>
              아이들이 손자국과 그림으로 감정을 표현하며 서로의 마음을 느껴가는 미술치료 시간입니다.
            </Description>
          </LargeCard>
        </TwoToOneContainer>
        <TwoToOneContainer>
          <LargeCard>
            <CardImage src="/Picture/picture03.webp" />
            <Title>색의 향연, 창의력의 손끝에서 피어나다</Title>
            <Description>
              아이들이 다양한 색의 물감과 구슬을 이용해 창의력을 발휘하며 색다른 작품을 준비하고
              있습니다. 서로 다른 색깔의 물감이 모여 하나의 조화를 이루는 모습이 인상적입니다.
            </Description>
          </LargeCard>

          <SmallCard>
            <CardImage src="/Picture/picture04.webp" />
            <Title>조각들로 완성된 이야기</Title>
            <Description>
              각기 다른 색과 모양의 캔버스가 모여 하나의 작품을 이룹니다. 아이들의 상상력과 감정이
              담긴 조각들이 연결되어 특별한 이야기를 만들어냅니다.
            </Description>
          </SmallCard>
        </TwoToOneContainer>

        <Footer>
          <FooterText>주소: 수원시 영통구 태장로 81, 501호 스타평생교육원 </FooterText>
          <FooterText>연락처: 031-202-0074 대표: 원장:김경환</FooterText>
          <Copyright>© 2024 스타 평생 교육원. All rights reserved.</Copyright>
        </Footer>
      </ContentWrapper>
      <FloatingButton></FloatingButton>
    </MainContainer>
  );
}
