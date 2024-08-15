import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
import csrf from "csurf";

const csrfProtection = csrf({ cookie: true });
const saltRounds = 10; // 솔트의 라운드 수, 일반적으로 10~12가 적당합니다
// CSRF 보호를 위한 라이브러리
// 차후에 로그인시
// bcrypt.compare(password, hashedPassword)

export default async function Handler(req, res) {
  await csrfProtection(req, res, async () => {
    if (req.method === "POST") {
      const { form_name, password, email } = req.body;
      console.log("Join req.body:", req.body);
      // 입력한 암호가 그대로 나오고 _csrf도 나옴

      if (!form_name || !password) {
        return res.status(500).json("글의 내용을 써주세요.");
      }

      if (!isValidId(form_name)) {
        return res.status(400).json("유효하지 않은 아이디입니다.");
      }

      if (!isValidPassword(password)) {
        return res.status(400).json("유효하지 않은 비밀번호입니다.");
      }
      // DB 연결 올리기
      try {
        const existingUsers = await prisma.member.findUnique({
          where: {
            name: form_name,
          },
        });

        // console.log("existingUsers:", existingUsers);
        // prisma는 배열로 받지 않고  null 아니면 유효한 대이타이므로 null인지 아닌지를 판단하는게
        // 중요함 일반쿼리일때는 .length>0  인지 판단해서 배열크기로 받았는지 아닌지 판단
        if (existingUsers) {
          return res.status(409).json("이미 존재하는 아이디입니다.");
        }
        // unique가 아닌값의 경우 finUniue라고 찾으면 안됨
        const existingEmail = await prisma.member.findFirst({
          where: {
            email: email,
          },
        });

        if (existingEmail) {
          return res.status(409).json("이미 존재하는 이메일입니다.");
        }

        const date = new Date();
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userId = uuidv4();
        const result = await prisma.member.create({
          data: {
            id: userId,
            name: form_name,
            password: hashedPassword,
            createDate: date,
            email: email,
          },
        });

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
