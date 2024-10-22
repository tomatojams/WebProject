import { prisma } from "@/lib/client";


export default async function handler(req, res) {
  if (req.method === "DELETE") {
    // console.log("req.body:", req.body);
    const { id } = req.body; // 객체안에 _id 를 풀어줌

    try {
      const result = await prisma.comment.delete({
        where: {
          id: id,
        },
      });

      return res.status(200).json({ message: "게시물이 성공적으로 삭제되었습니다." });
    } catch (error) {
      return res.status(500).json({ error: "서버 오류가 발생했습니다." });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`허용되지 않은 메소드입니다.`);
  }
}
