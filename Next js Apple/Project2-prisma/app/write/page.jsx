import "@/app/global.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
export default async function Write() {
  let session = await getServerSession(authOptions);
  console.log("Login Session write:", session);
  return (
    <div className="write-post-frame">
      {session ? (
        <div div className="write-post-border">
          <h4 className="write-post-title">글작성</h4>
          <form className="postform" action="/api/post/new" method="POST">
            <input
              id="write-title"
              name="title"
              type="text"
              placeholder="제목"
              required
            />

            <textarea
              id="write-content"
              name="content"
              rows="10"
              placeholder="내용"
              required
            />
            <br />
            <button className="simplebutton-sm" type="submit">
              글쓰기
            </button>
          </form>
        </div>
      ) : (
        <h4>글을 작성하려면 로그인하세요</h4>
      )}
    </div>
  );
}
