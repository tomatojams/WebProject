import Home from "../page";
import { initDbConnection } from "../../util/databaseMysql";
import Link from "next/link";

export default async function List() {
  // DB연결
  let db = await initDbConnection(); // await 순차적으로 동작하게 강제함
  const [rows] = await db.query("SELECT * FROM forum.post");

  //   console.log(rows);
  return (
    <div className="list-bg">
      {rows.map((item, index) => {
        // return 없애면 중괄호도 없애야 함
        return (
          <div key={index} className="list-item">
            <Link href={"/detail/" + item._id.toString()}>
              <h4>{item.title}</h4>
            </Link>
            <p>1월 1일</p>
          </div>
        );
      })}
    </div>
  );
}
