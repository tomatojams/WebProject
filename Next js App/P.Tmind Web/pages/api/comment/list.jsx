import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function Handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "인증되지 않은 사용자입니다." });
    }

    // // DB 연결 올리기
    try {
      const comments = await prisma.comment.findMany({
        where: { post_id: id },
        orderBy: {
          datetime: "desc",
        },
      });
      // console.log(comments);

      return res.status(200).json(comments);
    } catch (err) {
      return res.status(500).json({ message: "서버오류" });
    }
  } else {
    return res.status(405).json({ message: "허용되지 않은 포스팅" });
  }
}
