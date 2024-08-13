import prisma from "@/lib/prisma";
import FormInput from "./formInput";

export default async function Edit(props) {
  // props에 다이나믹 라우팅 정보 뜨는건 서버컴포넌트만 그럼
  // 폴더명의 [_id]는 보내는 주소를 _id로 받아오겠다는것으로 임의로 정해도 문제없음

  const board = await prisma.board.findUnique({
    where: {
      id: props.params._id, // _id 대신 id 사용, Prisma 모델에 맞게 수정 필요
    },
  });

  return (
    <div className="write-post-border">
      <h4 className="write-post-title">글수정</h4>
      <FormInput
        id={props.params._id}
        inititle={board.title}
        initext={board.content}
      />
    </div>
  );
}
