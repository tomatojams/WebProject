import { initDbConnection } from "@/util/databaseMysql";

import FormInput from "./formInput";

export default async function Edit(props) {
  // props에 다이나믹 라우팅 정보 뜨는건 서버컴포넌트만 그럼
  let db = await initDbConnection(); // await 순차적으로 동작하게 강제함

  console.log(props.params._id);
  const [row] = await db.query(
    `SELECT * FROM forum.post where _id = "${props.params._id}"`
  );
  // console.log(row);

  return (
    <div className="write-post-border">
      <h4 className="write-post-title">글수정</h4>
      <FormInput
        id={props.params._id}
        inititle={row[0].title}
        initext={row[0].content}
      />
    </div>
  );
}
