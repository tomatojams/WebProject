// import { connectDB } from "../util/database";

// export default async function Home() {
//   // 서버컴포넌트안에서만 해야함

//   //   const client = await connectDB;
//   //  forum이라는 데이타베이스 가져옴
//   const db = (await connectDB).db("forum");
//   // post 컬렉션이름인 post의  모든 데이타를 Array 로 변환
//   let result = await db.collection("post").find().toArray();
//   console.log(result);
//   return <h1>Hello</h1>;
// }

import { initDbConnection } from "@/util/databaseMysql";

export default async function Home() {
  let dbConnection = await initDbConnection();

  const [rows] = await dbConnection.query("SELECT * FROM forum.post");

  // 로직 작성
  console.log(rows[0]._id);

  return (
    <>
      <a href="./list">
        <h4>리스트</h4>
      </a>

      <form action="./api/list" method="GET">
        <button type="submit">DATA GET</button>
      </form>
      <a href="./join"> 회원가입</a>
    </>
  );
}
