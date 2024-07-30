"use client";
import { useRouter } from "next/navigation";


export default function DeleteButton({ _id }) {
  let router = useRouter();

  const handleDelete = async (event) => {
    event.preventDefault();
    console.log(_id);
    try {
      const response = await fetch(`/api/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        // object로 만들때 인덱싱 이름이므로 일치시켜줘야함
        //json으로 만들면 ""을 다 쳐줘서 문자취급
        body: JSON.stringify({ _id }),
      });

      if (response.ok) {
        router.push("/list"); // 삭제 후 메인 페이지로 리다이렉트
        router.refresh(); // 삭제하고 리프레쉬
      } else {
        console.error("아이템 삭제 실패");
      }
    } catch (error) {
      console.error("아이템 삭제 중 오류 발생");
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <input style={{ display: "none" }} name="_id" value={_id} />
      <button className="simplebutton" type="submit">
        삭제
      </button>
    </form>
  );
}
