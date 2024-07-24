import { initDbConnection } from "@/util/databaseMysql";
import EditButton from "./editButton";
import DeleteButton from "./deleteButton";
import DeleteButton2 from "./deleteButton2";
export default async function Detail(props) {
  //props는 현재 URL 패러미터를 알려줌

  let db = await initDbConnection(); // await 순차적으로 동작하게 강제함
  // const [rows] = await db.query("SELECT * FROM forum.post");
  console.log(props);
  const [row] = await db.query("SELECT * FROM forum.post where _id = ?", [
    props.params._id,
  ]);
  //   console.log(row);
  return (
    <div className="detail">
      <h4>{row[0].title}</h4>
      <p>{row[0].content}</p>
      <div className="twoButton">
        <EditButton _id={props.params._id}></EditButton>
        <DeleteButton _id={props.params._id} />
        <DeleteButton2 _id={props.params._id} />
      </div>
    </div>
  );
}
