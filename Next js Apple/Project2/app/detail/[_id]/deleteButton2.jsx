"use client";
import { useRouter } from "next/navigation";
import styles from "@/app/page.module.css";

export default function DeleteButton2({ _id }) {
  let router = useRouter();

  const handleDelete = async (event) => {
    event.preventDefault();
    console.log(_id);
    // fetch("/api/test?name=kim&age=20");
    fetch(`/api/delete2/ok?_id=${_id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        router.push("/list"); // 삭제 후 메인 페이지로 리다이렉트
        router.refresh();
      }
    });
  };

  return (
    <form onSubmit={handleDelete}>
      <input style={{ display: "none" }} name="_id" value={_id} />
      <button className={styles.simplebutton} type="submit">
        삭제2
      </button>
    </form>
  );
}
