import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  //
  if (req.method === "POST") {
    const { post_id, content } = req.body;
    // console.log("BODY", req.body);

    if (!content) {
      return res.status(400).json("글의 내용을 써주세요.");
    }
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(400).json("로그인을 해주시기 바랍니다.");
    }
    try {
      const newPost = await prisma.comment.create({
        data: {
          id: uuidv4(),
          post_id: post_id,
          content: content,
          email: session.user.email,
          datetime: new Date(),
        },
      });

      return res.status(200).json({ success: true, post_id });
    } catch (err) {
      return res.status(500).json({ message: "서버 오류" });
    }
  } else {
    return res.status(405).json({ message: "허용되지 않은 포스팅" });
  }
}
