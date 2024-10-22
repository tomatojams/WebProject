"use client";
import { signIn, signOut } from "next-auth/react";
export default function LogoutButton({ name }) {
  return (
    <>
      {name ? (
        <button
          className="simplebutton-log"
          onClick={() => {
            signOut();
          }}
          type="submit">
          {name} 로그아웃
        </button>
      ) : null}
    </>
  );
}
