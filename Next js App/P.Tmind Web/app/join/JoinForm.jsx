"use client";
import LoginButton from "@/app/components/loginButton";
import { useState, useEffect } from "react";

export default function JoinForm({ isSession }) {
  const [csrfToken, setCsrfToken] = useState("");
  const [session, setSession] = useState(isSession);

  useEffect(() => {
    // CSRF 토큰을 가져오기 위해 API 호출
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch("/api/csrf-token");
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("CSRF 토큰을 가져오는데 실패했습니다:", error);
      }
    };
    fetchCsrfToken();
    setSession(isSession);
  }, [isSession]);

  if (!csrfToken) {
    // CSRF 토큰을 가져오는 동안 로딩 표시 또는 빈 상태를 반환
    return <div>Loading...</div>;
  }
  console.log("isSession", session);
  return (
    <div className="userin-from">
      {session ? (
        "환영합니다"
      ) : (
        <form className="postform" action="/api/auth/signup" method="POST">
          <input
            id="write-title-input"
            name="form_name"
            type="text"
            placeholder="아이디"
            required
          />

          <input
            id="write-content-input"
            name="password"
            type="password"
            placeholder="비번"
            required
          />

          <input id="write-content-input" name="email" placeholder="이메일" required />
          <input type="hidden" name="_csrf" value={csrfToken} />
          <br />
          <button className="simplebutton-sm" type="submit">
            작성완료
          </button>
        </form>
      )}

      <LoginButton isSession={isSession} />
    </div>
  );
}
