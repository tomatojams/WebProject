import styled from "styled-components";
import { Link, useNavigate, useMatch } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { userNameState } from "../atom";

import "@fontsource/cormorant-upright"; // npm install @fontsource/cormorant-upright 필요

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 80px;
  background-color: white;
  border-bottom: 1px solid #ddd;
`;

const Nav = styled.nav`
  color: #414040;
  padding: 5px 20px;
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: center;
`;

const MenuSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1000;
  white-space: nowrap;
`;
const TitleSpan = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 200px;
  font-family: "Cormorant Upright", serif;
  font-weight: bold;
`;
const TitleSubSpan = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 200px;
  font-family: "Cormorant Upright", serif;
  font-weight: bold;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  width: 80px;
  cursor: pointer;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: 500;
`;

export default function AppHeader() {
  const userName = useRecoilValue(userNameState);

  const navigate = useNavigate();
  const matchMonitor = useMatch("/mainInfo");
  const matchSetting = useMatch("/setting");

  return (
    <>
      <Header>
        <NavItem>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#414040",
              height: "100%",
            }}>
            <TitleSpan>
              <TitleSubSpan style={{ fontSize: "22px" }}>Star</TitleSubSpan>
              <TitleSubSpan style={{ fontSize: "18px" }}>
                life education
              </TitleSubSpan>
            </TitleSpan>
          </Link>
        </NavItem>
        <Nav>
          <Link
            to="/paper"
            style={{ textDecoration: "none", color: "#414040" }}>
            <NavItem>
              <MenuSpan>한국종이접기 영통지회</MenuSpan>
            </NavItem>
          </Link>

          <Link
            to="/forest"
            style={{ textDecoration: "none", color: "#414040" }}>
            <NavItem>
              <MenuSpan>산림치유</MenuSpan>
            </NavItem>
          </Link>

          <Link
            to="/craft"
            style={{ textDecoration: "none", color: "#414040" }}>
            <NavItem>
              <MenuSpan>공예</MenuSpan>
            </NavItem>
          </Link>
          <Link
            to="/picture"
            style={{ textDecoration: "none", color: "#414040" }}>
            <NavItem>
              <MenuSpan>미술치료</MenuSpan>
            </NavItem>
          </Link>
          <Link
            to="/lecture"
            style={{ textDecoration: "none", color: "#414040" }}>
            <NavItem>
              <MenuSpan>강의소개</MenuSpan>
            </NavItem>
          </Link>
        </Nav>
        <Nav></Nav>
      </Header>
    </>
  );
}
