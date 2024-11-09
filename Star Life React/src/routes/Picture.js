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
  DescriptionCraft,
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
            <Title>감정의 흐름</Title>
            <Description>
              {" "}
              <DescriptionCraft>
                이 추상화 작품들은 강렬한 색감과 유동적인 패턴으로 감정을 표현합니다. 각 그림은
                다양한 색의 소용돌이로 감정의 흐름을 나타내며, 예술 치료에서 내면의 감정을
                시각적으로 풀어내는 방법으로 사용됩니다.
              </DescriptionCraft>
            </Description>
          </SmallCard>
          <LargeCard>
            <CardImage src="/Picture/picture02.webp" />
            <Title>손끝으로 그려낸 마음의 이야기</Title>
            <Description>
              <DescriptionCraft>
                학생들이 큰 캔버스에 손도장과 다양한 색을 사용하여 자유롭게 그림을 그리며 감정을
                표현하고 있습니다. 손도장은 참여와 소속감을 나타내며, 각자의 색과 모양으로 다양한
                감정이 어우러집니다. 이러한 활동은 예술 치료에서 자신과 타인의 감정을 이해하고
                소통하는 데 도움을 줍니다.
              </DescriptionCraft>
            </Description>
          </LargeCard>
        </TwoToOneContainer>
        <TwoToOneContainer>
          <LargeCard>
            <CardImage src="/Picture/picture03.webp" />
            <Title>색의 향연, 창의력의 손끝에서 피어나다</Title>
            <Description>
              {" "}
              <DescriptionCraft>
                아이들이 다양한 색의 물감과 구슬을 이용해 창의력을 발휘하며 색다른 작품을 준비하고
                있습니다. 서로 다른 색깔의 물감이 모여 하나의 조화를 이루는 모습이 인상적입니다.
              </DescriptionCraft>
            </Description>
          </LargeCard>

          <SmallCard>
            <CardImage src="/Picture/picture04.webp" />
            <Title>조각들로 완성된 이야기</Title>
            <Description>
              {" "}
              <DescriptionCraft>
                각기 다른 색과 모양의 캔버스가 모여 하나의 작품을 이룹니다. 아이들의 상상력과 감정이
                담긴 조각들이 연결되어 특별한 이야기를 만들어냅니다.
              </DescriptionCraft>
            </Description>
          </SmallCard>
        </TwoToOneContainer>

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
