import styled from "styled-components";
import { Link } from "react-router-dom";

import { useState } from "react";
import "@fontsource/cormorant-upright"; // npm install @fontsource/cormorant-upright 필요

// const Header = styled.header`
//   display: flex;
//   width: 100%;
//   justify-content: space-between;
//   align-items: center;
//   justify-content: center;
// `;

const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 3px 40px;
  background-color: white;

  position: relative; /* 추가 */
  max-width: 1200px;
  box-sizing: border-box;
  /* border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd; */
  /* Media query for mobile */
  @media (max-width: 768px) {
    padding: 0px 20px;
    border-top: 1px solid #ddd;
  }
`;

const Nav = styled.nav`
  color: #414040;
  width: 80%;
  padding: 5px 20px;
  display: flex;

  align-items: center;
  justify-content: space-around;

  @media (max-width: 768px) {
    display: ${(props) => (props.open ? "flex" : "none")};
    position: fixed; /* absolute 대신 fixed 사용 */
    bottom: 65px;
    right: 20px;
    background-color: white;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;

    gap: 20px;
    z-index: 1000;
  }
`;

const MenuButton = styled.button`
  display: none;

  /* Show menu button on mobile */
  @media (max-width: 768px) {
    display: block;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
`;

const MenuSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1000;
  white-space: nowrap;
  width: auto; /* 글자 길이에 맞춘 좌우폭 */
  flex: 0 0 auto; /* 컨텐츠에 맞게 크기 고정 */
  font-family: "NanumSquareRound", sans-serif; /* 폰트 추가 */
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
  width: auto;
  cursor: pointer;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: 500;

  /* Adjust font size on mobile */
  @media (max-width: 800px) {
    font-size: 16px;
    width: auto;
  }
`;

export default function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to handle menu toggle
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to close menu when navigation occurs
  const handleNavLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <Header>
      <NavItem>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#414040",
            height: "100%",
          }}
          onClick={handleNavLinkClick}>
          <TitleSpan>
            <TitleSubSpan style={{ fontSize: "22px" }}>Star</TitleSubSpan>
            <TitleSubSpan style={{ fontSize: "18px" }}>life education</TitleSubSpan>
          </TitleSpan>
        </Link>
      </NavItem>

      {/* Desktop Navigation */}
      <Nav open={menuOpen}>
        <Link
          to="/paper"
          style={{ textDecoration: "none", color: "#414040" }}
          onClick={handleNavLinkClick}>
          <NavItem>
            <MenuSpan>한국종이접기 영통지회</MenuSpan>
          </NavItem>
        </Link>
        <Link
          to="/forest"
          style={{ textDecoration: "none", color: "#414040" }}
          onClick={handleNavLinkClick}>
          <NavItem>
            <MenuSpan>산림치유</MenuSpan>
          </NavItem>
        </Link>
        <Link
          to="/craft"
          style={{ textDecoration: "none", color: "#414040" }}
          onClick={handleNavLinkClick}>
          <NavItem>
            <MenuSpan>공예</MenuSpan>
          </NavItem>
        </Link>
        <Link
          to="/picture"
          style={{ textDecoration: "none", color: "#414040" }}
          onClick={handleNavLinkClick}>
          <NavItem>
            <MenuSpan>미술치료</MenuSpan>
          </NavItem>
        </Link>
        <Link
          to="/lecture"
          style={{ textDecoration: "none", color: "#414040" }}
          onClick={handleNavLinkClick}>
          <NavItem>
            <MenuSpan>강의소개</MenuSpan>
          </NavItem>
        </Link>
        <Link
          to="/board"
          style={{ textDecoration: "none", color: "#414040" }}
          onClick={handleNavLinkClick}>
          <NavItem>
            <MenuSpan>강사이력, 문의</MenuSpan>
          </NavItem>
        </Link>
      </Nav>

      {/* Mobile Menu Button */}
      <MenuButton onClick={toggleMenu}>{menuOpen ? "✖" : "☰"}</MenuButton>
    </Header>
  );
}
