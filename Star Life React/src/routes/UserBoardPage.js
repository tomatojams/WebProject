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
              서울시립병원 참다울학교 점핑클레이 테라피 임상미술치료 꿈터 주간보호센터
              <br />
              토탈공예프로그램 강의 광교,
              <br />
              언남, 청명, 보라초 돌봄교실공예 강사 한빛중, 파주고, 청덕중, 어정중
              <br />
              단기프로그램 경기 꿈의 학교 “나도미술치료사” 경기도교육청 기흥노인복지관 특화어르신
              미술치료 보육교사 2급 미술재활 아동미술지도사 1급 클레이조형미술 테라피스트
              미술심리상담사 1급 생활환경지도사 1급
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
          <FooterText>연락처: 031-202-0074 대표: 원장:김경환</FooterText>
          <Copyright>© 2024 스타 평생 교육원. All rights reserved.</Copyright>
        </Footer>
      </ContentWrapper>
    </MainContainer>
  );
};

export default UserBoardPage;
