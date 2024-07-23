export default function Join() {
  return (
    <div className="write-post">
      <h4 className="titleh4">가입</h4>
      <form className="postform" action="/api/join/newmember" method="POST">
        <input id="title" name="id" type="text" placeholder="아이디" required />

        <input
          id="write-content"
          name="password"
          type="password"
          placeholder="비번"
          required
        />
        <br />
        <button type="submit">작성완료</button>
      </form>
    </div>
  );
}
