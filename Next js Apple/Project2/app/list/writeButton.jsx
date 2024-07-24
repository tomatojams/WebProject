"use client";
import { useRouter } from "next/navigation";
import styles from "@/app/page.module.css";
export default function WriteButton() {
  let router = useRouter();

  return (
    <button
      className={styles.simplebutton}
      onClick={() => {
        router.push("/write"); // Link 태그는 자동으로 프리페치
      }}>
      글쓰기
    </button>
  );
}
