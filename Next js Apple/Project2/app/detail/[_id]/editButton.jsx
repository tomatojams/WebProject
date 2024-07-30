"use client";
import { useRouter } from "next/navigation";


export default function EditButton({ _id }) {
  let router = useRouter();
  console.log("edit");
  return (
    <button
      className="simplebutton"
      onClick={() => {
        router.push("/edit/" + _id); // Link 태그는 자동으로 프리페치
      }}>
      편집
    </button>
  );
}
