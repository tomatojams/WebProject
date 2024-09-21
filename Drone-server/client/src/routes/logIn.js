import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
// Wrapper 스타일드 컴포넌트
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background-color: #ddd;
  padding: 0 50px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/back.webp");
  background-size: cover;
  background-position: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 5px;

  text-align: center;
`;

const BigTitle = styled.div`
  color: #ccc;
  font-size: 36px;
  text-align: center;
  font-family: "Josefin Sans", sans-serif;
`;

const SmallTitle = styled.div`
  color: #ccc;
  font-size: 18px;
  text-align: center;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  margin-bottom: 20px;
  width: 100px;
  height: 100px;
  background-image: url("/logo.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
`;

const SNT = styled.div`
  position: absolute;
  top: 30px;
  left: 50px;
  width: 150px;
  height: 80px;
  z-index: 100;
  background-image: url("/whitelogo.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const LoginButton = styled.button`
  width: calc(100% - 20px);
  padding: 10px;
  margin-top: 30px;
  background-color: #1e3a8a;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1e2f6a;
  }
`;

const RememberMeWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 0px;
  margin-left: 20px;
`;

const RememberMeLabel = styled.label`
  color: #777;
  margin-left: 8px;
  font-size: 14px;
`;

const CheckBox = styled.input`
  color: #777;
`;

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function LogIn() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem("rememberedId");
    const savedPassword = localStorage.getItem("rememberedPassword");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedId) setId(savedId);
    if (savedPassword) setPassword(savedPassword);
    setRememberMe(savedRememberMe); // 기억된 "기억하기" 상태를 설정
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { id, password });

      if (rememberMe) {
        localStorage.setItem("rememberedId", id);
        localStorage.setItem("rememberedPassword", password);
        localStorage.setItem("rememberMe", true);
      } else {
        localStorage.removeItem("rememberedId");
        localStorage.removeItem("rememberedPassword");
        localStorage.setItem("rememberMe", false);
      }

      if (response.status === 200) {
        navigate("/mainInfo");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <Wrapper>
      <SNT />
      <Title>
        <BigTitle>All about embedded device security and digital forensics</BigTitle>
        <SmallTitle>
          An integrated system for tracking drones, collecting information, and managing sensors
        </SmallTitle>
      </Title>
      <LoginBox>
        <Logo />
        <LoginForm>
          <Input
            name="id"
            type="text"
            placeholder="로그인 아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <RememberMeWrapper>
            <CheckBox
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <RememberMeLabel>아이디와 비밀번호 기억하기</RememberMeLabel>
          </RememberMeWrapper>
          <LoginButton onClick={handleClick}>로그인</LoginButton>
        </LoginForm>
      </LoginBox>
    </Wrapper>
  );
}
