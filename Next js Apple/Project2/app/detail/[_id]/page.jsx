import { initDbConnection } from "../../../util/databaseMysql";

export default async function Detail(props) {
  //   let id = props.params.etc;

  let db = await initDbConnection(); // await 순차적으로 동작하게 강제함
  // const [rows] = await db.query("SELECT * FROM forum.post");
  console.log(props);
  const [row] = await db.query(
    `SELECT * FROM forum.post where _id = "${props.params._id}"`
  );
  //   console.log(row);
  return (
    <div className="detail">
      <h4>{row[0].title}</h4>
      <p>{row[0].content}</p>
    </div>
  );
}
