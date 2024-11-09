import AppHeader from "../components/nav";
import React, { useState } from "react";
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
  DescriptionText,
} from "../components/styles";
import useBoardFunctions from "../components/forestBoardFunctions";
import {
  Container,
  Header,
  FormSection,
  Input,
  TextArea,
  Button,
  PostContainer,
  PostHeader,
  PostContent,
  AdminComment,
  PaginationContainer,
  PageButton,
} from "../components/board_styles";
const ITEMS_PER_PAGE = 10; // 한 페이지에 표시할 게시글 수

// from api
//  플로팅 버튼 스타일
export default function MainInfo() {
  const {
    posts,
    name,
    setName,
    content,
    setContent,
    password,
    setPassword,

    user,

    handlePostSubmit,
    handleDeletePost,
  } = useBoardFunctions();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  const currentPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 페이지 전환 시 스크롤을 상단으로 이동
  };
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
            <EdgeSubBlack>산림치유</EdgeSubBlack>{" "}
            <DescriptionText>
              {" "}
              <br />
              산림치유는 자연 속에서 몸과 <strong>마음을 치유하는 특별한 경험</strong> 입니다.
              숲에서의 산책과 다양한 프로그램을 통해 스트레스를 해소하고
              <strong> 심신의 균형</strong>을 되찾을 수 있습니다.
              <br />
              <br /> 자연의 소리와 향기, 맑은 공기 속에서 <strong>힐링을 경험</strong>하며 건강을
              증진해 보세요.
              <strong>산림치유 전문가</strong>들이 함께하며 맞춤형 프로그램을 제공합니다. 자연과
              하나 되는 산림치유로 <strong>건강한 삶</strong>을 시작해 보세요.
            </DescriptionText>
          </EdgeTextBlack>
        </SubFullContent>
        <Container>
          <Header>산림치유 게시판</Header>

          {/* 글 작성 UI */}
          <FormSection>
            <Input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
            <TextArea
              placeholder="내용"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handlePostSubmit}>Post</Button>
          </FormSection>

          {/* 게시글 리스트 (현재 페이지의 게시글만 표시) */}
          {currentPosts.map(({ id, data }) => (
            <PostContainer key={id}>
              <PostHeader>{data.name}</PostHeader>
              <PostContent>{data.content}</PostContent>
              {data.adminComment && (
                <AdminComment>
                  <strong> Teacher ★:</strong> {data.adminComment}
                </AdminComment>
              )}
              {user && (
                <>
                  <Button onClick={() => handleDeletePost(id, data.password)}>삭제</Button>
                </>
              )}
            </PostContainer>
          ))}

          {/* 페이지네이션 */}
          <PaginationContainer>
            <PageButton onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
              {"<<"}
            </PageButton>
            <PageButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}>
              {"<"}
            </PageButton>
            {[...Array(totalPages)].map((_, index) => (
              <PageButton
                key={index}
                onClick={() => handlePageChange(index + 1)}
                active={currentPage === index + 1}>
                {index + 1}
              </PageButton>
            ))}
            <PageButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}>
              {">"}
            </PageButton>
            <PageButton
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}>
              {">>"}
            </PageButton>
          </PaginationContainer>
        </Container>

        <Footer>
          <FooterText>주소: 수원시 영통구 태장로 81, 501호 스타평생교육원 </FooterText>
          <FooterText>연락처: 031-202-0074 대표: 원장:김경환</FooterText>
          <Copyright>Since 2014 스타 평생 교육원. All rights reserved.</Copyright>
        </Footer>
      </ContentWrapper>
      <FloatingButton></FloatingButton>
    </MainContainer>
  );
}
