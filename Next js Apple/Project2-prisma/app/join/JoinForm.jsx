"use client";
import LoginButton from "@/app/components/loginButton";
import { useState, useEffect } from "react";

export default function JoinForm({ session }) {
  console.log(session);
  const [csrfToken, setCsrfToken] = useState("");

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
  }, []);

  if (!csrfToken) {
    // CSRF 토큰을 가져오는 동안 로딩 표시 또는 빈 상태를 반환
    return <div>Loading...</div>;
  }

  return (
    <div className="userin-from">
      <form className="postform" action="/api/join/newmember" method="POST">
        <input
          id="write-title"
          name="form_name_id"
          type="text"
          placeholder="아이디"
          required
        />

        <input
          id="write-content"
          name="password"
          type="password"
          placeholder="비번"
          required
        />
        <input type="hidden" name="_csrf" value={csrfToken} />
        <br />
        <button className="simplebutton-sm" type="submit">
          작성완료
        </button>
      </form>
      <LoginButton session={session} />
    </div>
  );
}
