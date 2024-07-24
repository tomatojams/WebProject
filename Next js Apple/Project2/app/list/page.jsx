import { initDbConnection } from "@/util/databaseMysql";
import WriteButton from "./WriteButton";
import ListView from "./ListView";
import styles from "@/app/page.module.css";

export default async function List() {
  // DB연결
  let db = await initDbConnection(); // await 순차적으로 동작하게 강제함
  const [rows] = await db.query(
    "SELECT * FROM forum.post order by datetime DESC"
  );

  return (
    <div className="list-bg">
      <h3>게시판</h3>
      <div className={styles.post}>
        <ListView rows={rows} />
      </div>
      <br />
      <WriteButton />
    </div>
  );
}
