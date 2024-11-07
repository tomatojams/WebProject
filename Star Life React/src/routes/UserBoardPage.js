import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useBoardFunctions from "./useBoardFunctions";
import { useLocation } from "react-router-dom";
import AppHeader from "../components/nav";

const ITEMS_PER_PAGE = 10; // 한 페이지에 표시할 게시글 수

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9fbfd;
  overflow-y: auto;
`;

const StickyHeader = styled(AppHeader)`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
`;

const FormSection = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
`;

const Button = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  color: white;
  background-color: #555;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const PostContainer = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const PostHeader = styled.h3`
  color: #333;
  margin: 0;
`;

const PostContent = styled.p`
  color: #555;
`;

const AdminComment = styled.p`
  color: #555;
  font-weight: bold;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.active ? "#333" : "#eee")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: none;
  padding: 8px 12px;
  margin: 0 4px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#333" : "#ccc")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 10px;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const TextContainer = styled.div`
  max-width: 600px;
  line-height: 1.6;
  color: #333;

  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    @media (max-width: 768px) {
      font-size: 20px;
    }
    @media (max-width: 480px) {
      font-size: 18px;
    }
  }

  p {
    font-size: 16px;
    color: #666;
    @media (max-width: 768px) {
      font-size: 14px;
    }
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }
`;

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

  useEffect(() => {
    if (location.state?.fromLecture) {
      window.scrollTo({ top: 300, behavior: "smooth" });
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
      <StickyHeader />
      <RowContainer>
        <Image src="/Paper/Paper6.jpg" alt="자격증 과정" />
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
    </MainContainer>
  );
};

export default UserBoardPage;
