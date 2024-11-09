import React, { useState, useEffect, useRef } from "react";
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
import {
  MainContainer,
  Footer,
  FooterText,
  Copyright,
  FloatingButton,
  StickyBar,
  RowContainer,
  Image,
  TextContainer,
  ContentWrapper,
} from "../components/styles";
import useBoardFunctions from "../components/useBoardFunctions";
import { useLocation } from "react-router-dom";
import AppHeader from "../components/nav";

const ITEMS_PER_PAGE = 10; // 한 페이지에 표시할 게시글 수

const UserBoardPage = () => {
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

  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);

  // FormSection에 대한 ref 생성
  const formSectionRef = useRef(null);

  useEffect(() => {
    if (location.state?.fromLecture && formSectionRef.current) {
      // 특정 링크에서 오면 FormSection 위치로 스크롤
      formSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  const currentPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MainContainer>
      <ContentWrapper>
        <StickyBar>
          <AppHeader />
        </StickyBar>
        <RowContainer>
          <Image src="/profile/profile.jpg" />
          <TextContainer>
            <h2>Teacher ★'s 이력</h2>
            <p>
              <li>한국종이접기 영통 지회장</li>
              <li>미술치료사</li>
              <li>산림치유 지도사</li>
              <li>숲해설사</li>
              <li>맞춤형 화장품 조제 관리사 임상심리사</li>
            </p>
          </TextContainer>
        </RowContainer>
        <Container>
          <Header>강의신청, 문의 게시판</Header>

          {/* FormSection에 ref 추가 */}
          <FormSection ref={formSectionRef}>
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

          {currentPosts.map(({ id, data }) => (
            <PostContainer key={id}>
              <PostHeader>{data.name}:</PostHeader>
              <PostContent>{data.content}</PostContent>
              {data.adminComment && (
                <AdminComment>
                  <strong> Teacher ★:</strong> {data.adminComment}
                </AdminComment>
              )}
              {user && <Button onClick={() => handleDeletePost(id, data.password)}>Delete</Button>}
            </PostContainer>
          ))}

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
        <FloatingButton></FloatingButton>

        <Footer>
          <FooterText>주소: 수원시 영통구 태장로 81, 501호 스타평생교육원 </FooterText>
          <FooterText>연락처: 031-202-0074 대표: 김경환</FooterText>
          <Copyright>Since 2014 스타 평생 교육원. All rights reserved.</Copyright>
        </Footer>
      </ContentWrapper>
    </MainContainer>
  );
};

export default UserBoardPage;
