import styles from "@/app/page.module.css";
import Link from "next/link";
import timetodate from "@/util/timeTodate";

export default function ListView({ rows }) {
  // props를 풀어서 받아와야함

  return (
    <div>
      {rows.map((item, index) => {
        // return 없애면 중괄호도 없애야 함
        return (
          <div key={index}>
            <article className="list-article ">
              <Link
                href={
                  // ***다이나믹 라우팅***
                  `/detail/${item.id}`
                }>
                <span className={styles.title}>{item.title}</span>
              </Link>

              <span className={styles.span}>{timetodate(item.datetime)}</span>
            </article>
            <hr className="h-line" />
          </div>
        );
      })}
    </div>
  );
}
