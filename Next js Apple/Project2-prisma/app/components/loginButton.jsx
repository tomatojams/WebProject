"use client";
import { signIn } from "next-auth/react";
export default function LoginButton({ session }) {
  return (
    <div c>
      {session ? null : (
        <button
          className="simplebutton-sm"
          onClick={() => {
            signIn();
          }}
          type="submit">
          깃허브 로그인
        </button>
      )}
    </div>
  );
}
