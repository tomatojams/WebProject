import { initDbConnection } from "@/util/databaseMysql";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    // JSON.parse()를 안해줘도 되는건 API 라우트에서 자동 파싱을 해줌
    // log 찍어보고 json 형태인지 object인지 확인
    console.log(req.body);
    const { _id } = req.body; // 객체안에 _id 를 풀어줌

    if (!_id) {
      return res.status(400).json({ error: "게시물 에러입니다" });
    }

    try {
      let db = await initDbConnection();
      const [result] = await db.query("DELETE FROM forum.post WHERE _id = ?", [
        _id,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "게시물이 존재하지 않습니다." });
      }

      return res
        .status(200)
        .json({ message: "게시물이 성공적으로 삭제되었습니다." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "서버 오류가 발생했습니다." });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`허용되지 않은 메소드입니다.`);
  }
}
