import React, { useState } from "react";

import useBoardFunctions from "../components/forestBoardFunctions";
import {
  CheckboxLabel,
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

const BoardPage = () => {
  const {
    posts,
    name,
    setName,
    content,
    setContent,
    password,
    setPassword,
    adminComments,
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
      <Header>산림치유 관리자 게시판</Header>

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

          {/* 관리자가 작성한 여러 댓글 표시 */}
          {data.adminComments &&
            data.adminComments.map((comment, index) => (
              <AdminComment key={index}>
                <strong> Teacher ★:</strong> {comment}
              </AdminComment>
            ))}

          {user && (
            <>
              <Input
                placeholder="Admin Comment"
                value={adminComments[id] || ""}
                onChange={(e) => setAdminComment(id, e.target.value)}
              />
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
