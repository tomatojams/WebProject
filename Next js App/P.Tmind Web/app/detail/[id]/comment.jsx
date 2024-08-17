"use client";
import { useEffect, useState } from "react";

//
export default function Comment({ board_id }) {
  const [comment, setComment] = useState("");

  function handlePostComment() {
    console.log(comment);
    fetch("/api/post/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: board_id, content: comment }),
    });
  }

  return (
    <>
      <div>
        <input
          id="comment_input"
          // 이벤트 콜백의 경우 ()에는 event만 들어감 그외의 것은 앞의 () 아니라 뒤의 () 매개변수에 넘
          onChange={(e) => {
            setComment(e.target.value);
          }}
          type="text"
          value={comment}
          required
        />
        <button onClick={handlePostComment} className="simplebutton-log">
          댓글전송
        </button>
   
      </div>
    </>
  );
}
