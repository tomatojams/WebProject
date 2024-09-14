// providers/GlobalProvider.js
"use client"; // Client Component로 설정

import { createContext, useContext, useState } from "react";

// Context 생성
const GlobalContext = createContext();

// Provider 컴포넌트
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 예시: 사용자 정보를 상태로 관리

  return <GlobalContext.Provider value={{ user, setUser }}>{children}</GlobalContext.Provider>;
};

// Context를 사용하는 커스텀 훅
export const useGlobalContext = () => useContext(GlobalContext);
