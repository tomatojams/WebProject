import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, useMatch } from "react-router-dom";

const Title = styled.h2`
  width: 100%;
  background-color: #f1f5f9;
  padding: 8px 30px;
  margin: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
  font-weight: bold;
  font-family: "Satoshi", sans-serif;
  letter-spacing: 0.36em; /* 자간 36% */
  color: #0e43b9;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  border-bottom: 1px solid #ddd;
`;

const Logo = styled.img`
  height: 40px;
`;

const Nav = styled.nav`
  color: #414040;
  padding: 0px 20px;
  display: flex;
  gap: 50px;
  align-items: center;
`;

const NavItem = styled.div`
  color: #333;
  cursor: pointer;
  font-size: 16px;
  border: ${(props) => (props.isActive ? "#E2E8F0" : "transparent")};
  background-color: ${(props) => (props.isActive ? "#E2E8F0" : "transparent")};
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: 500;

  &:hover {
    background-color: #e2e8f0;
  }
`;

const TimeDisplay = styled.span`
  font-size: 14px;
  color: #555;
`;

const Notification = styled.div`
  position: relative;
  cursor: pointer;
`;

const NotificationMenu = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  top: 35px;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  padding: 0px;
`;

const UserMenu = styled.div`
  position: relative;
  display: inline-block;
`;

const UserName = styled.span`
  cursor: pointer;
  font-size: 16px;
`;

const DropdownMenu = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  top: 35px;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const DropdownItem = styled.div`
  width: 300px;
  height: 200px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  background-color: transparent;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;
`;

const Logout = styled.div`
  text-align: end;
  padding: 5px 30px;
  z-index: 100;
  border-radius: 5px;

  background-color: #f5f5f5;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  /* optional: for a slight dim effect */
`;

export default function AppHeader() {
  const navigate = useNavigate();
  const matchMonitor = useMatch("/mainInfo");
  const matchSetting = useMatch("/setting");

  const [currentTime, setCurrentTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleNotification = () => {
    setNotificationOpen((prev) => !prev);
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setNotificationOpen(false);
  };

  return (
    <>
      {(menuOpen || notificationOpen) && (
        <Overlay width={windowSize.width} height={windowSize.height} onClick={closeMenus} />
      )}
      <Header>
        <Nav>
          <Logo src={`${process.env.PUBLIC_URL}/logo_hori.svg`} alt="Logo" />
          <NavItem isActive={matchMonitor}>Monitor</NavItem>
          <Link to="/setting" style={{ textDecoration: "none", color: "#414040" }}>
            <NavItem isActive={matchSetting}>Setting</NavItem>
          </Link>
        </Nav>
        <Nav>
          <TimeDisplay>{currentTime.toLocaleTimeString()}</TimeDisplay>
          <Notification onClick={toggleNotification}>
            Notification
            <NotificationMenu open={notificationOpen}>
              <DropdownItem>
                <Title>NOTIFICATION</Title>
              </DropdownItem>
            </NotificationMenu>
          </Notification>
          <UserMenu>
            <UserName onClick={toggleMenu}>Tomas</UserName>
            <DropdownMenu open={menuOpen}>
              <DropdownItem>
                <Title>USER INFORMATION</Title>
                <Logout onClick={handleLogout}>Logout</Logout>
              </DropdownItem>
            </DropdownMenu>
          </UserMenu>
        </Nav>
      </Header>
    </>
  );
}
