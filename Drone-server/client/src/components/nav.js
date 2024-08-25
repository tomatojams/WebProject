import React from "react";

export default function AppHeader() {
  const handleLogout = () => {
    // 로그아웃 로직 구현
    console.log("Logged out");
  };

  return (
    <header className="app-header">
      <div className="app-header-logo">Drone Monitoring</div>
      <nav className="app-header-nav">
        Info
        <button className="app-header-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}
