import prisma from "@/lib/prisma";
import EditButton from "./editButton";
import DeleteButton from "./deleteButton";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Comment from "./comment";

// 댓글이 늘어났을 때 useEffect를 활용해서 댓글을 리프레쉬해야함
// 클라이언트로 바꾸고 그부분만 업데이트 되게
export default async function Detail(props) {
  const session = await getServerSession(authOptions);
  // 종속댓글을 내림차순으로 정열
  const board = await prisma.board.findUnique({
    where: {
      id: props.params.id, // _id 대신 id 사용, Prisma 모델에 맞게 수정 필요
    },
    include: {
      comment: {
        orderBy: {
          datetime: "desc",
        },
      },
    },
  });

  console.log(board.comment);

  if (!board) {
    return (
      <div className="detail-border">
        <h4>게시물을 찾을 수 없습니다.</h4>
      </div>
    );
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
        <ul>
          {board.comment.map((post) => {
            return (
              <div className="comment_post">
     
                <li key={post.id}>{post.content}</li>
                <button className="simplebutton-reversed">삭제</button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
