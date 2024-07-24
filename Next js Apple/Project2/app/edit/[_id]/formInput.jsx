"use client";
import styles from "@/app/page.module.css";
import { useState } from "react";

export default function FormInput({ id, inititle, initext }) {
  const [title, setTitle] = useState(inititle);
  const [text, setText] = useState(initext);
  return (
    <form className="postform" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setTitle(e.target.value)}
        id="title"
        name="title"
        type="text"
        required
        value={title}
      />
      <textarea
        onChange={(e) => setText(e.target.value)}
        id="write-content"
        name="content"
        rows="10"
        value={text}
        required
      />
      <input type="hidden" name="_id" value={id} />
      <button className={styles.simplebutton} type="submit">
        글쓰기
      </button>
    </form>
  );
}

// patch를 위한 eventhandler

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  fetch("/api/post/edit", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/list";
      } else {
        response.json().then((errorData) => {
          alert(errorData.message);
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("서버 오류가 발생했습니다.");
    });
}
