import prisma from "@/lib/prisma";
import EditButton from "./editButton";
import DeleteButton from "./deleteButton";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
export default async function Detail(props) {
  // props는 현재 URL 패러미터를 알려줌
  // console.log("id", props.params.id);
  let session = await getServerSession(authOptions);
  // Prisma를 통해 데이터베이스 쿼리 실행
  const board = await prisma.board.findUnique({
    where: {
      id: props.params.id, // _id 대신 id 사용, Prisma 모델에 맞게 수정 필요
    },
  });

  if (!board) {
    return (
      <div className="detail-border">
        <h4>게시물을 찾을 수 없습니다.</h4>
      </div>
    );
  }

  return (
    <div className="detail-border">
      <h4>{board.title}</h4>
      <p>{board.content}</p>
      <div className="twoButton">
        <EditButton id={board.id} session={session}></EditButton>
        <DeleteButton _id={board.id} session={session} />
      </div>
    </div>
  );
}
