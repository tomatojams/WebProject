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
  SixContainer,
  Card,
  SmallImage,
  Title,
  Description,
  TwoToOneContainer,
  LargeCard,
  SmallCard,
  CardImage,
  DescriptionCraft,
} from "../components/styles";

// 상속해서 구현하면 sticky가 안됨
// const StickyHeader = styled(AppHeader)`
//   position: sticky; // 스크롤 시 고정
//   top: 0;
//   z-index: 1000; // 헤더가 다른 요소 위에 나타나도록 설정
//   background-color: white; // 스크롤 시 배경색 유지
// `;
export default function MainInfo() {
  return (
    <MainContainer>
      <StickyBar>
        <AppHeader />
      </StickyBar>
      <ContentWrapper>
        <SubFullWidthImage image="/Craft/craft00.webp">
          <EdgeText>
            <EdgeTitle> Teacher ★'s classes</EdgeTitle>
            <EdgeSub>토탈공예</EdgeSub>
          </EdgeText>
        </SubFullWidthImage>
        <SixContainer>
          <Card>
            <SmallImage src="/Craft/craft01.jpg" />
            <Title>점핑 클레이</Title>
            <Description>
              <DescriptionCraft>
                다양한 색감과 디테일이 돋보이는 미니어처 도시락 공예작품입니다. 삼각김밥, 핫도그, 곰
                인형 등 귀여운 소품들이 도시락을 한층 더 매력적으로 만들어줍니다
              </DescriptionCraft>
            </Description>
          </Card>
          <Card>
            <SmallImage src="/Craft/craft02.jpg" />
            <Title>석고공예</Title>
            <Description>
              <DescriptionCraft>
                {" "}
                선명한 꽃과 나비, 하트 무늬가 돋보이는 석고 공예 작품입니다. 동물 모양 장식들이
                더해져 귀엽고 아기자기한 매력이 가득합니다.
              </DescriptionCraft>
            </Description>
          </Card>
          <Card>
            <SmallImage src="/Craft/craft03.jpg" />
            <Title>목재공예</Title>
            <Description>
              <DescriptionCraft>
                전통 배를 모티브로 한 나무 조립 공예 작품입니다. 정교하게 재현된 돛과 노의 디테일이
                인상적이며, 자연스러운 나무 질감이 고풍스러운 매력을 더합니다.
              </DescriptionCraft>
            </Description>
          </Card>
          <Card>
            <SmallImage src="/Craft/craft04.jpg" />
            <Title>지끈공예</Title>
            <Description>
              {" "}
              <DescriptionCraft>
                꽃 모양을 연상시키는 원형의 지끈 공예 작품입니다. 간결한 디자인과 자연스러운 색감이
                따뜻한 분위기를 자아내며, 테이블 매트나 장식용으로 활용하기 좋습니다
              </DescriptionCraft>
            </Description>
          </Card>
          <Card>
            <SmallImage src="/Craft/craft05.jpg" />
            <Title>향초공예-1</Title>
            <Description>
              {" "}
              <DescriptionCraft>
                알록달록한 드라이 플라워가 장식된 향초 공예 작품입니다. 따뜻한 색감과 고급스러운
                유리 용기가 어우러져 공간을 화사하게 밝혀줄 아이템입니다
              </DescriptionCraft>
            </Description>
          </Card>
          <Card>
            <SmallImage src="/Craft/craft06.jpg" />
            <Title>향초공예-2</Title>
            <Description>
              {" "}
              <DescriptionCraft>
                초밥 모양으로 만든 향초는 독특한 디자인으로 시각적 즐거움을 줍니다. 손으로 만든 각
                재료가 섬세하게 표현되어, 불을 켤 때마다 은은한 향과 함께 재미를 더해줍니다
              </DescriptionCraft>
            </Description>
          </Card>
        </SixContainer>
        <TwoToOneContainer>
          <LargeCard>
            <CardImage src="/Craft/craft08.jpg" />
            <Title>미니어처공예 -1</Title>
            <Description>
              {" "}
              <DescriptionCraft>
                "귀여운 디테일이 돋보이는 미니어처 도시락 공예 작품입니다. 알록달록한 김밥과 동물
                모양 반찬들이 아기자기한 매력을 더해줍니다.
              </DescriptionCraft>
            </Description>
          </LargeCard>

          <SmallCard>
            <CardImage src="/Craft/craft07.jpg" />
            <Title>미니어처 공예 -2</Title>
            <Description>
              {" "}
              <DescriptionCraft>
                버섯 지붕과 라쿤 캐릭터가 돋보이는 아기자기한 미니어처 공예 작품입니다. 동화 속
                장면을 연상시키는 따뜻한 색감과 디테일이 보는 이에게 즐거움을 선사합니다.
              </DescriptionCraft>
            </Description>
          </SmallCard>
        </TwoToOneContainer>
        <TwoToOneContainer>
          <SmallCard>
            <CardImage src="/Craft/craft09.jpg" />
            <Title>가죽공예</Title>
            <Description>
              {" "}
              <DescriptionCraft>
                다양한 디자인의 가죽 소품들은 실용성과 귀여움을 겸비한 작품들입니다. 고양이 얼굴
                모양의 카드홀더와 사랑스러운 캐릭터 키링 등은 가죽공예로 만들어진 개성 넘치는
                아이템들로, 각자의 취향과 스타일을 표현하기에 적합합니다
              </DescriptionCraft>
            </Description>
          </SmallCard>
          <LargeCard>
            <CardImage src="/Craft/craft10.jpg" />
            <Title>냅킨아트</Title>
            <Description>
              {" "}
              <DescriptionCraft>
                딸기 일러스트가 돋보이는 냅킨아트입니다. 부드러운 색감과 감각적인 디자인으로 소품
                수납에 유용합니다
              </DescriptionCraft>
            </Description>
          </LargeCard>
        </TwoToOneContainer>

        <TwoToOneContainer>
          <LargeCard>
            <CardImage src="/Craft/craft11.jpg" />
            <Title>레진아트 공예</Title>
            <Description>
              {" "}
              <DescriptionCraft>
                각기 다른 형태의 나무판 위에 레진으로 표현된 작은 바다 풍경이 담겨 있습니다. 파도와
                모래, 조개껍질 등 바다의 요소들이 어우러져 미니어처 같은 감성을 전해줍니다.
              </DescriptionCraft>
            </Description>
          </LargeCard>

          <SmallCard>
            <CardImage src="/Craft/craft12.jpg" />
            <Title>양말 목공예</Title>
            <Description>
              {" "}
              <DescriptionCraft>
                굵은 실로 손뜨개하여 만든 니트백은 포근하고 자연스러운 매력을 지니고 있습니다. 진주
                장식과 가죽 손잡이가 더해져 세련되면서도 개성 있는 디자인으로 완성되었습니다
              </DescriptionCraft>
            </Description>
          </SmallCard>
        </TwoToOneContainer>
        <TwoToOneContainer>
          <SmallCard>
            <CardImage src="/Craft/craft14.jpg" />
            <Title>아동요리</Title>
            <Description>
              {" "}
              <DescriptionCraft>
                아이들이 직접 만든 피자는 신선한 채소와 고기를 듬뿍 올려 건강하게 완성되었습니다.
                다양한 색감의 재료가 어우러져 보는 재미와 먹는 즐거움을 동시에 선사합니다
              </DescriptionCraft>
            </Description>
          </SmallCard>
          <LargeCard>
            <CardImage src="/Craft/craft13.jpg" />
            <Title>북아트그림</Title>
            <Description>
              {" "}
              <DescriptionCraft>
                다양한 색과 질감의 전통 한지를 사용해 정성스럽게 엮은 북아트 작품들입니다.
                손바느질로 연결된 책들은 각기 다른 색감과 패턴으로 개성을 뽐내며, 고유의 한국적 미와
                함께 실용성을 더합니다.
              </DescriptionCraft>
            </Description>
          </LargeCard>
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
