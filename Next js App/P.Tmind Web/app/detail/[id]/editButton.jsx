"use client";
import { useRouter } from "next/navigation";

export default function EditButton({ id, session }) {
  let router = useRouter();
  console.log("edit");
  return (
    <>
      {session ? (
        <button
          className="simplebutton-log"
          onClick={() => {
            router.push("/edit/" + id); // Link 태그는 자동으로 프리페치
          }}>
          편집
        </button>
      ) : null}
    </>
  );
}
