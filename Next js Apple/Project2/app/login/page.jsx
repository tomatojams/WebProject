"use client";
import styles from "@/app/page.module.css";
import { useState, useEffect } from "react";

export default function Login() {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
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
    return <div>Loading...</div>;
  }

  return (
    <div className="write-post">
      <h4 className="titleh4">로그인</h4>
      <form className="postform" action="/api/login/login" method="POST">
        <input id="title" name="id" type="text" placeholder="아이디" required />
        <input
          id="write-content"
          name="password"
          type="password"
          placeholder="비번"
          required
        />
        <input type="hidden" name="_csrf" value={csrfToken} />
        <br />
        <button className={styles.simplebutton} type="submit">
          로그인
        </button>
      </form>
    </div>
  );
}
