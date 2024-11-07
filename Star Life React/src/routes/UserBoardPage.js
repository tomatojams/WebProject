import React from "react";
import styled from "styled-components";
import useBoardFunctions from "./useBoardFunctions";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppHeader from "../components/nav";
// from api

const FullWidthImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.15) 0%,

      rgba(0, 0, 0, 0.15) 100%
    );
    z-index: 1;
  }

  /* 내용물의 z-index를 높여서 오버레이 위에 표시 */
  & > * {
    position: relative;
    z-index: 2;
  }
`;

const SubFullWidthImage = styled.div`
  padding: 30px 30px;
  display: flex;
  justify-content: end;
  align-items: end;
  width: 100%;
  height: 70vh;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(0, 0, 0, 0.15) 80%,
      rgba(0, 0, 0, 0.8) 100%
    );
    z-index: 1;
  }

  & > * {
    position: relative;
    z-index: 2;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  // height: 100vh;

  background-color: #f9fbfd;
  overflow-y: auto; // 세로 스크롤 가능하게 설정
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column; // 세로 방향 정렬
  overflow-y: visible;
`;

const CenteredText = styled.div`
  color: white;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
  padding: 20px 40px;
  border-radius: 40px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const EdgeText = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 0px;
  padding: 20px 40px;

  text-align: center;
`;

const EdgeTitle = styled.div`
  color: white;

  border-radius: 40px;
  font-size: 20px;
  // font-weight: bold;
  text-align: center;
`;
const EdgeSub = styled.div`
  color: white;

  border-radius: 40px;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
`;

const StickyHeader = styled(AppHeader)`
  position: sticky; // 스크롤 시 고정
  top: 0;
  z-index: 1000; // 헤더가 다른 요소 위에 나타나도록 설정
  background-color: white; // 스크롤 시 배경색 유지
`;
const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  // background-color: #333;
  color: #333;
  font-size: 14px;
  text-align: center;
  line-height: 1.5;
`;

const FooterText = styled.div`
  margin: 5px 0;
`;

const Copyright = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #aaa;
`;
// 컴포넌트
// 스타일 정의
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
    background-color: #0056b3;
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
const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 1200px;
  margin: auto;

  /* 해상도가 일정 이하로 내려가면 세로 배치로 변경 */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// 이미지 스타일
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

// 텍스트 컨테이너
const TextContainer = styled.div`
  max-width: 600px;
  line-height: 1.6;
  color: #333;

  /* 반응형 폰트 크기 조절 */
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

  useEffect(() => {
    // state가 fromLecture인 경우에만 스크롤 실행
    if (location.state?.fromLecture) {
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  }, [location]);
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

        {/* 게시글 리스트 */}
        {posts.map(({ id, data }) => (
          <PostContainer key={id}>
            <PostHeader>{data.name}:</PostHeader>
            <PostContent>{data.content}</PostContent>
            {data.adminComment && (
              <AdminComment>
                <strong> Teacher ★:</strong> {data.adminComment}
              </AdminComment>
            )}

            {/* 글 삭제 버튼 */}

            {/* 관리자 댓글 작성 UI (로그인 없는 유저 게시판에는 댓글 UI가 필요하지 않다면 생략 가능) */}
            {user && (
              <>
                <Button onClick={() => handleDeletePost(id, data.password)}>Delete</Button>
              </>
            )}
          </PostContainer>
        ))}
      </Container>
    </MainContainer>
  );
};

export default UserBoardPage;
