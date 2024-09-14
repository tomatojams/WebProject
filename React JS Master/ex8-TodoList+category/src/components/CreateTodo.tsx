import { useForm } from "react-hook-form";
// 커스텀 훅으로 값을 변경
import { useAddToDo } from "./atoms";
import { IForm } from "../types/IForm";

// 타입의 변수대로
//
//useForm***
/* 1. onChange 안써도 됨
 -- register가 이름으로 등록하면 상태관리시작( 유효성검사도 포함)
2. onSubmit 안써도됨  
 -- handleSubmit이 폼제출 유효성검사 해줌
3. 엘리먼트잡아서( DOM조작없이) input.value 안해도 됨 
-- setValue로 바로 넣을수있음
4. onChange에 + state 넣어서 모니터링 안해도됨 
-- watch가 해줌
5. useEffect 안써도됨
-- watch에 포함
6. 폼리셋
-- reset이 input.value = "" 대신해줌 
7.유효성검사
-- register에서 required, minlength 지정
8. 디펄트값 설정
-- defaultValue로 초기입려값 설정
9. 폼데이터 수집
-- handleSubmit이 입력값을 자동으로 객체로전달 FormData


단점
-- 타입과 변수를 일치시키는 경향이 있어 타입이 변수선언처럼 됨
-- 회피방법이 있으나 안쓰는게 좋음
 */

export default function CreateTodo() {
  const {
    // onChange,onBlur 를 간단히 추가해줌
    register,
    // 폼 제출을 처리하는 함수
    handleSubmit,
    // 폼의 에러 상태
    formState: { errors },
    // 입력값을 직접 설정할 때 사용
    setValue,
    // 모니터링
    // watch,
  } = useForm<IForm>({
    // 디펄트값 지정가능
    // defaultValues: {
    //   toDo: "Happy Study!",
    // },
  }); // useForm 훅 사용

  // useEffect 처럼 반응함***
  // const watchToDo = watch("toDo"); // 현재 입력값
  // console.log("current value:", watchToDo);

  //atom 변경을 위한 커스텀 훅을 불러옴
  // 상태변경 함수를 반환해줌
  const addToDo = useAddToDo();

  const _onValid = ({ toDo }: IForm) => {
    addToDo(toDo);

    setValue("toDo", ""); // 유효할때 초기화
  };
  return (
    <form onSubmit={handleSubmit(_onValid)}>
      <input
        id="comment_input"
        // 등록하며 입력을 폼상태차원에서 모니터링, 검수 등이 가능해짐
        {...register("toDo", {
          // 미입력시 에러메세지
          required: "해야할 일을 입력해주세요.",
          // 실시간 검사가능
          validate: {
            noCool: (value) => (value?.includes("cool") ? "No cool allowed" : true),
          },
          minLength: {
            value: 1,
            message: "할일을 작성해주세요.",
          },
        })}
        type="text"
        placeholder="Write to do"
      />
      <button className="simplebutton-log">Add</button>

      <span>{errors?.toDo?.message}</span>
    </form>
  );
}
