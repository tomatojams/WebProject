"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function WriteButton({ isSession }) {
  let router = useRouter();
  const [session, setSession] = useState(isSession);

  useEffect(() => {
    setSession(isSession);
  }, [isSession]);

  // console.log("button", isSession);
  return (
    <>
      {session ? (
        <button
          className="simplebutton-sm"
          onClick={() => {
            router.push("/write"); // Link 태그는 자동으로 프리페치
          }}>
          글쓰기
        </button>
      ) : null}
    </>
  );
}
