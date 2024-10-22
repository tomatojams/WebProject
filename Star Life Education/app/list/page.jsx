import prisma from "@/lib/prisma";
import WriteButton from "./WriteButton";
import ListView from "./ListView";
import "@/app/global.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// 강제 다이나믹 렌더링
export const dynamic = "force-dynamic";

// 20초 동안 캐슁
// export const revalidate = 20;

export default async function List() {
  // await를 써서 받고 authOptions로 인증을 받아온다.
  // const를 쓰면 안됨.
  let session = await getServerSession(authOptions);
  let isSession = Boolean(session);
  console.log("Session:", isSession);
  // DB연결 및 데이터 조회
  const posts = await prisma.board.findMany({
    orderBy: {
      datetime: "desc",
    },
  });
  // console.log(posts);
  // await fetch("/list", { cache: "force-cache" });
  // GET 요청 결과 캐싱가능
  // await fetch("/list", { cache: "no-store" });
  // // 캐슁 안함
  // await fetch("/list", { next: {revalidate:60} });
  // 60초마다 캐슁
  return (
    <div className="list-border">
      <h3>게시판</h3>
      <div className="list-frame">
        <ListView rows={posts} />
      </div>
      <br />
      <WriteButton isSession={isSession} />
    </div>
  );
}
