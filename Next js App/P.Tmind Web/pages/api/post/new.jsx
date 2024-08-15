import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json("글의 내용을 써주세요.");
    }
    const session = await getServerSession(req, res, authOptions);
    console.log("글쓰기작성자", session);
    try {
      const newPost = await prisma.board.create({
        data: {
          id: uuidv4(),
          title,
          content,
          datetime: new Date(),
          email: session.user.email,
        },
      });

      return res.status(200).redirect("/list");
    } catch (err) {
      return res.status(500).json({ message: "서버 오류" });
    }
  } else {
    return res.status(405).json({ message: "허용되지 않은 포스팅" });
  }
}
