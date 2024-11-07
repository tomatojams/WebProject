import React from "react";
import styled from "styled-components";
import useBoardFunctions from "./useBoardFunctions";

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
          />
          <Input
            type="password"
            placeholder="Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </CheckboxLabel>
          <Button onClick={handleLogin}>Login as Admin</Button>
        </FormSection>
      )}

      {/* 글 작성 UI */}
      <FormSection>
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextArea
          placeholder="Content"
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
          <PostHeader>{data.name}</PostHeader>
          <PostContent>{data.content}</PostContent>
          {data.adminComment && (
            <AdminComment>
              <strong> Teacher ★:</strong> {data.adminComment}
            </AdminComment>
          )}

          {/* 글 삭제 버튼 */}

          {/* 관리자 댓글 작성 UI */}
          {user && (
            <>
              <Input
                placeholder="Admin Comment"
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
              />{" "}
              <Button onClick={() => handleDeletePost(id, data.password)}>Delete</Button>
              <Button onClick={() => handleAdminComment(id)}>Add Comment</Button>
            </>
          )}
        </PostContainer>
      ))}
    </Container>
  );
};

export default BoardPage;
