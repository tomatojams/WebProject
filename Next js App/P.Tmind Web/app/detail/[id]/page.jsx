import prisma from "@/lib/prisma";
import EditButton from "./editButton";
import DeleteButton from "./deleteButton";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Comment from "./comment";
import { notFound } from "next/navigation";

export default async function Detail(props) {
  const session = await getServerSession(authOptions);
  const board = await prisma.board.findUnique({
    where: {
      id: props.params.id, // _id 대신 id 사용, Prisma 모델에 맞게 수정 필요
    },
  });

  if (!board) {
    return notFound();
  }

  return (
    <div className="detail_frame">
      <div className="detail-border">
        <h4>{board.title}</h4>
        <p>{board.content}</p>
        <div className="twoButton">
          <EditButton id={board.id} session={session}></EditButton>
          <DeleteButton _id={board.id} session={session} />
        </div>
        <Comment board_id={props.params.id} />
      </div>
    </div>
  );
}
