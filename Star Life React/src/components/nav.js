import styled from "styled-components";
import { Link, useMatch } from "react-router-dom";
import { useState } from "react";
import "@fontsource/cormorant-upright"; // npm install @fontsource/cormorant-upright 필요

const Wrapper = styled.header`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ddd;
  z-index: 999;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05); /* 아래쪽 그림자 추가 */
  @media (max-width: 768px) {
    padding: 0px 0px;
    border-top: 1px solid #ddd;
    box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.05); /* 아래쪽 그림자 추가 */
  }
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1px 40px;
  background-color: white;
  position: relative;
  max-width: 1200px;
  box-sizing: border-box;
`;

const Row = styled.div`
  display: flex;
  width: 70%;
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
    position: fixed;
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
  margin-right: 30px;
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
  width: 100%;
  flex: 0 0 auto;
  font-family: "S-Core_Dream", sans-serif;
  font-weight: ${(props) => (props.isActive ? "bold" : "400")};

  color: ${(props) => (props.isActive ? "#333" : "#555")};

  &:hover {
    color: #222;
  }
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
  padding: 12px 10px;
  border-radius: 5px;
  font-weight: 500;
  @media (max-width: 800px) {
    font-size: 16px;
    width: auto;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const CustomLink = styled(Link)`
  text-decoration: none;
  color: #414040;
  display: block;
  width: 100%;
`;

export default function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavLinkClick = () => {
    setMenuOpen(false);
  };

  // 각 링크와 현재 경로를 비교해 스타일 적용
  const matchPaper = useMatch("/paper");
  const matchForest = useMatch("/forest");
  const matchCraft = useMatch("/craft");
  const matchPicture = useMatch("/picture");
  const matchLecture = useMatch("/lecture");
  const matchBoard = useMatch("/board");

  return (
    <Wrapper>
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
              <TitleSubSpan style={{ fontSize: "16px" }}>life long education</TitleSubSpan>
            </TitleSpan>
          </Link>
        </NavItem>
        <Row>
          <Nav open={menuOpen}>
            <CustomLink to="/paper" onClick={handleNavLinkClick}>
              <NavItem>
                <MenuSpan isActive={matchPaper}>한국종이접기 영통지회</MenuSpan>
              </NavItem>
            </CustomLink>
            <CustomLink to="/forest" onClick={handleNavLinkClick}>
              <NavItem>
                <MenuSpan isActive={matchForest}>산림치유</MenuSpan>
              </NavItem>
            </CustomLink>
            <CustomLink to="/craft" onClick={handleNavLinkClick}>
              <NavItem>
                <MenuSpan isActive={matchCraft}>공예</MenuSpan>
              </NavItem>
            </CustomLink>
            <CustomLink to="/picture" onClick={handleNavLinkClick}>
              <NavItem>
                <MenuSpan isActive={matchPicture}>미술치료</MenuSpan>
              </NavItem>
            </CustomLink>
            <CustomLink to="/lecture" onClick={handleNavLinkClick}>
              <NavItem>
                <MenuSpan isActive={matchLecture}>강의소개</MenuSpan>
              </NavItem>
            </CustomLink>
            <CustomLink to="/board" onClick={handleNavLinkClick}>
              <NavItem>
                <MenuSpan isActive={matchBoard}>강사이력, 문의</MenuSpan>
              </NavItem>
            </CustomLink>
          </Nav>
        </Row>
        <MenuButton onClick={toggleMenu}>{menuOpen ? "✖" : "☰"}</MenuButton>
      </Header>
    </Wrapper>
  );
}
