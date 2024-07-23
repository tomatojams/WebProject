import { initDbConnection } from "@/util/databaseMysql";

import { v4 as uuidv4 } from "uuid";

export default async function Handler(req, res) {
  if (req.method === "POST") {
    // 제목, 내용 분리
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(500).json("글의 내용을 써주세요.");
    }
    // DB 연결 올리기
    try {
      let db = await initDbConnection();
      const _id = uuidv4();
      const date = new Date();
      const query =
        "INSERT INTO forum.post (_id, title, content,datetime) VALUES (?,?,?,?)";
      const [result] = await db.query(query, [_id, title, content, date]);

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
