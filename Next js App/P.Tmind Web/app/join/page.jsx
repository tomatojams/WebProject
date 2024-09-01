import JoinForm from "./JoinForm"; // 클라이언트 컴포넌트를 임포트합니다.
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
export default async function JoinPage() {
  let session = await getServerSession(authOptions); // /서버컴포넌트 기능안에서 사용가능
  let isSession = Boolean(session);
  // 제공된 이름, 이메일, 프로필등을 쓸수있음
  console.log("Login_Session:", isSession);

  return (
    <div id="join-main">
      <div className="write-post-border">
        <h4 className="write-post-title">가입</h4>
        <JoinForm isSession={isSession} />
      </div>
    </div>
  );
}
