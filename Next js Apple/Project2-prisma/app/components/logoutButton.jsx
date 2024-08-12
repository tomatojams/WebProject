"use client";
import { signIn, signOut } from "next-auth/react";
export default function LogoutButton({ session }) {
  return (
    <>
      {session ? (
        <button
          className="simplebutton-log"
          onClick={() => {
            signOut();
          }}
          type="submit">
          {session.user.name} 로그아웃
        </button>
      ) : null}
    </>
  );
}
