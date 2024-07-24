import { initDbConnection } from "@/util/databaseMysql";
import WriteButton from "./WriteButton";
import ListView from "./ListView";
import styles from "@/app/page.module.css";

// 강제 다이나믹 렌더링
export const dynamic = "force-dynamic";

// 20초 동안 캐슁
// export const revalidate = 20;

export default async function List() {
  // DB연결
  let db = await initDbConnection(); // await 순차적으로 동작하게 강제함
  const [rows] = await db.query(
    "SELECT * FROM forum.post order by datetime DESC"
  );
  //-> fetch로 바꾸면 캐싱
  //-> revalidate

  // await fetch("/list", { cache: "force-cache" });
  // GET 요청 결과 캐싱가능
  // await fetch("/list", { cache: "no-store" });
  // 캐슁 안함
  // await fetch("/list", { next: {revalidate:60} });
  // 60초마다 캐슁
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
