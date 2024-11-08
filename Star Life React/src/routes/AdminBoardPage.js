import React, { useState } from "react";
import styled from "styled-components";
import useBoardFunctions from "../components/useBoardFunctions";

const ITEMS_PER_PAGE = 10; // 한 페이지에 표시할 게시글 수

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;
//  플로팅 버튼 스타일

const Header = styled.h1`
  text-align: center;
  color: #333;
`;

const FormSection = styled.div`
  background-color: #f9f9f9;
  padding: 30px;
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

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;

  input[type="checkbox"] {
    appearance: none;
    width: 16px;
    height: 16px;
    border: 1px solid #777;
    border-radius: 3px;
    margin-right: 8px;
    cursor: pointer;
    display: inline-block;
    position: relative;

    &:checked {
      background-color: #777;
      border-color: #777;
    }

    &:checked::after {
      content: "✓";
      color: white;
      font-size: 12px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const PostContainer = styled.div`
  background-color: #fff;
  padding: 30px;
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

const BoardPage = () => {
  const {
    posts,
    name,
    setName,
    content,
    setContent,
    password,
    setPassword,
    adminComment,
    setAdminComment,
    email,
    setEmail,
    userPassword,
    setUserPassword,
    user,
    rememberMe,
    setRememberMe,
    handlePostSubmit,
    handleDeletePost,
    handleAdminComment,
    handleLogin,
    handleLogout,
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
    <Container>
      <Header>게시판</Header>

      {/* 관리자 로그인/로그아웃 UI */}
      {user ? (
        <FormSection>
          <p>관리자로 로그인했습니다, {user.email}</p>
          <Button onClick={handleLogout}>Logout</Button>
        </FormSection>
      ) : (
        <FormSection>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleLogin();
              }
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleLogin();
              }
            }}
          />
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </CheckboxLabel>
          <Button onClick={handleLogin}>관리자 Login</Button>
        </FormSection>
      )}

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
              <Input
                placeholder="Admin Comment"
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
              />{" "}
              <Button onClick={() => handleDeletePost(id, data.password)}>삭제</Button>
              <Button onClick={() => handleAdminComment(id)}>댓글달기</Button>
            </>
          )}
        </PostContainer>
      ))}

      {/* 페이지네이션 */}
      <PaginationContainer>
        <PageButton onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
          {"<<"}
        </PageButton>
        <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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
  );
};

export default BoardPage;
