"use client";
import { useEffect, useState } from "react";
import axios from "axios";
//
export default function Comment({ board_id }) {
  const [newcomment, setNewcomment] = useState("");
  const [response, setResponse] = useState();
  const [deleteComment, setDeleteComment] = useState();

  function handleDelete(comment_id) {
    axios
      .delete("/api/comment/delete", {
        data: { id: comment_id },
      })
      .then((res) => setDeleteComment(res.data))
      .catch((err) => console.error(err));
  }

  // 댓글전송버튼
  function handlePostComment() {
    fetch("/api/comment/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: board_id, content: newcomment }),
    })
      .then((res) => res.json())
      .then((json) => setResponse(json))
      .then(() => setNewcomment(""));
  }
  // Enter키로도입력가능
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지 (엔터가 기본적으로 폼 제출로 인식될 수 있음)
      handlePostComment();
    }
  }
  //댓글 리프레시
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch(`/api/comment/list?id=${board_id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setComments(json));
  }, [response, deleteComment]);
  console.log(comments);

  return (
    <>
      <div>
        <input
          id="comment_input"
          // 이벤트 콜백의 경우 ()에는 event만 들어감 그외의 것은 앞의 () 아니라 뒤의 () 매개변수에 넘
          onChange={(e) => {
            setNewcomment(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          type="text"
          value={newcomment}
          required
        />
        <button onClick={handlePostComment} className="simplebutton-log">
          댓글전송
        </button>
        <ul>
          {comments.length > 0 ? (
            comments.map((post) => {
              return (
                <div className="comment_post">
                  <li key={post.id}>{post.content}</li>
                  {/* map/ 함수를 쓸때 각 요소마다 고유한 key로 묶여있어서 post.id를 보낼수있다 */}
                  <button onClick={() => handleDelete(post.id)} className="simplebutton-reversed">
                    삭제
                  </button>
                </div>
              );
            })
          ) : (
            <span className="no_comment">댓글을 달아보세요.</span>
          )}
        </ul>
      </div>
    </>
  );
}
