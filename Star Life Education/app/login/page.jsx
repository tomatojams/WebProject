import LoginForm from "./LoginForm"; // 클라이언트 컴포넌트를 임포트합니다.
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
export default async function LoginPage() {
  let session = await getServerSession(authOptions);
  let isSession = Boolean(session);
  return (
    <main id="login-main">
      <div className="write-post-border">
        <h4 className="write-post-title">로그인</h4>
        <LoginForm isSession={isSession} />
      </div>
    </main>
  );
}
