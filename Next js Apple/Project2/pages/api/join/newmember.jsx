import bcrypt from "bcrypt";
import { initDbConnection } from "@/util/databaseMysql";
import csrf from "csurf";

const csrfProtection = csrf({ cookie: true });
const saltRounds = 10; // 솔트의 라운드 수, 일반적으로 10~12가 적당합니다
// CSRF 보호를 위한 라이브러리
// 차후에 로그인시
// bcrypt.compare(password, hashedPassword)

export default async function Handler(req, res) {
  await csrfProtection(req, res, async () => {
    if (req.method === "POST") {
      const { id, password } = req.body;

      if (!id || !password) {
        return res.status(500).json("글의 내용을 써주세요.");
      }

      if (!isValidId(id)) {
        return res.status(400).json("유효하지 않은 아이디입니다.");
      }

      if (!isValidPassword(password)) {
        return res.status(400).json("유효하지 않은 비밀번호입니다.");
      }
      // DB 연결 올리기
      try {
        let db = await initDbConnection();

        const [existingUsers] = await db.query(
          "SELECT * FROM forum.member WHERE m_id = ?",
          [id]
        );

        if (existingUsers.length > 0) {
          return res.status(409).json("이미 존재하는 아이디입니다.");
        }
        const date = new Date();
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const query =
          "INSERT INTO forum.member (m_id, password,createDate) VALUES (?,?,?)";
        const [result] = await db.query(query, [id, hashedPassword, date]);

        return res.status(200).redirect("/list");
        // .json({ message: "글이 성공적으로 저장되었습니다.", postId: _id });
        //오류처리
      } catch (err) {
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
      }
    } else {
      return res.status(405).json({ message: "허용되지 않은 포스팅" });
    }
  });
}

function isValidId(input) {
  const validPattern = /^[a-zA-Z0-9_]+$/;
  return validPattern.test(input);
}

function isValidPassword(input) {
  // 비밀번호의 복잡성을 강화함
  const validPattern = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-+=]).{8,}$/;
  return validPattern.test(input);
}
