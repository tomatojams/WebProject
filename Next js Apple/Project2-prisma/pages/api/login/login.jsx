import bcrypt from "bcrypt";
import csrf from "csurf";
import { PrismaClient } from "@prisma/client";

const csrfProtection = csrf({ cookie: true });
const prisma = new PrismaClient();
export default async function handler(req, res) {
  await csrfProtection(req, res, async () => {
    if (req.method === "POST") {
      const { id, password } = req.body;

      if (!id || !password) {
        return res
          .status(400)
          .json({ message: "아이디와 비밀번호를 입력해주세요." });
      }

      try {
        // let db = await initDbConnection();

        // // 사용자 정보 가져오기
        // const [users] = await db.query(
        //   "SELECT * FROM forum.member WHERE m_id = ?",
        //   [id]
        // );

        const users = await prisma.member.findUnique({
          where: {
            m_id: id,
          },
        });

        if (!users) {
          return res
            .status(401)
            .json({ message: "아이디 또는 비밀번호가 잘못되었습니다." });
        }

        const user = users;
        console.log("User:", users);

        // 비밀번호 검증
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          // 로그인 성공
          return res.status(200).redirect("/list");
        } else {
          // 로그인 실패
          return res
            .status(401)
            .json({ message: "아이디 또는 비밀번호가 잘못되었습니다." });
        }
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "서버 오류" });
      }
    } else {
      return res.status(405).json({ message: "허용되지 않은 메서드입니다." });
    }
  });
}
