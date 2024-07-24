import { initDbConnection } from "@/util/databaseMysql";

export default async function Handler(req, res) {
  if (req.method === "PATCH") {
    // 제목, 내용 분리
    // console.log(req.body);
    const { _id, title, content } = req.body;
    if (!_id || !title || !content) {
      return res.status(400).json("글의 내용을 써주세요.");
    }
    // DB 연결 올리기
    try {
      let db = await initDbConnection();
      let query =
        "UPDATE forum.post SET edit_datetime=?, title=?, content=? WHERE _id=?";
      const editdate = new Date();

      const [result] = await db.query(query, [editdate, title, content, _id]);
      console.log(result);
      return res.status(200).redirect("/list");
      // .json({ message: "글이 성공적으로 저장되었습니다.", postId: _id });
      //오류처리
    } catch (err) {
      return res.status(500).json({ message: "서버오류" });
    }
  } else {
    return res.status(405).json({ message: "허용되지 않은 포스팅" });
  }
}
