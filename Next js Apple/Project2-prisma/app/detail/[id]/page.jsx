// import { initDbConnection } from "@/util/databaseMysql";
// import EditButton from "./editButton";
// import DeleteButton from "./deleteButton";
// // import DeleteButton2 from "./deleteButton2";
// export default async function Detail(props) {
//   //props는 현재 URL 패러미터를 알려줌

//   let db = await initDbConnection(); // await 순차적으로 동작하게 강제함
//   // const [rows] = await db.query("SELECT * FROM forum.post");
//   console.log(props);
//   const [row] = await db.query("SELECT * FROM forum.post where _id = ?", [
//     props.params._id,
//   ]);
//   //   console.log(row);
//   return (
//     <div className="detail-border">
//       <h4>{row[0].title}</h4>
//       <p>{row[0].content}</p>
//       <div className="twoButton">
//         <EditButton _id={props.params._id}></EditButton>
//         <DeleteButton _id={props.params._id} />
//       </div>
//     </div>
//   );
// }
import prisma from "@/lib/prisma";
import EditButton from "./editButton";
import DeleteButton from "./deleteButton";

export default async function Detail(props) {
  // props는 현재 URL 패러미터를 알려줌
  console.log("id", props.params.id);
  // Prisma를 통해 데이터베이스 쿼리 실행
  const post = await prisma.post.findUnique({
    where: {
      id: props.params.id, // _id 대신 id 사용, Prisma 모델에 맞게 수정 필요
    },
  });

  if (!post) {
    return (
      <div className="detail-border">
        <h4>게시물을 찾을 수 없습니다.</h4>
      </div>
    );
  }

  return (
    <div className="detail-border">
      <h4>{post.title}</h4>
      <p>{post.content}</p>
      <div className="twoButton">
        <EditButton id={props.params.id}></EditButton>
        <DeleteButton id={props.params.id} />
      </div>
    </div>
  );
}
