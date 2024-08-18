import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function Handler(req, res) {
  if (req.method === "PATCH") {
    // 제목, 내용 분리
    console.log(req.body);
    const { _id, title, content } = req.body;
    if (!_id || !title || !content) {
      return res.status(400).json("글의 내용을 써주세요.");
    }
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "인증되지 않은 사용자입니다." });
    }

    // DB 연결 올리기
    try {
      const updatePost = await prisma.board.update({
        where: { id: _id },
        // id가 동일한 포맷으로 id일때는 where{id}로 충분하지만
        // _id를 썼기때문에 DB의 id를 _id로 매칭함
        data: {
          title,
          content,
          edit_datetime: new Date(),
        },
      });

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
