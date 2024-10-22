import { getServerSession } from "next-auth";
import "./global.css";
import Link from "next/link";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogoutButton from "@/app/components/logoutButton";
import Nav from "@/app/components/nav";

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions); // /서버컴포넌트 기능안에서 사용가능
  // 제공된 이름, 이메일, 프로필등을 쓸수있음
  console.log("Login_Session layout:", session);
  let name = session?.user.name;

  return (
    <html lang="en">
      <body>
        <Nav name={name} />
        {children}
      </body>
    </html>
  );
}
