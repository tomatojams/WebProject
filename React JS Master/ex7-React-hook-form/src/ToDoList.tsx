import { useForm, FieldErrors } from "react-hook-form";
export interface ValueTracker {}

interface IForm {
  Email?: string;
  name?: string;
  pass1?: string;
  pass2?: string;
  extraError?: string;
}

function TodoList() {
  // 1. 불러올때 옵션
  // register(이벤트리스너 + state 변수등록), watch(변화값 출력),
  // handleSubmit(1.유효함수, 2.유요하지 않을때 함수) (유효성검사후, 커서까지 자동이동, 콜백함수 호출)
  // formState 내부에 errors 객체가있음
  // (미리 정해놓은 유효성검사, 정해놓은에러, defaultValue)
  // defaultValue까지 지정-> register함수로 지정되는 state 이름들로 지정
  // setError-> 커스텀 에러설정-> 하나의 필드에만 에러지정이 가능하기때문에 조건부사용
  const { register, watch, handleSubmit, formState, setError } = useForm<IForm>({
    //2. useForm을 불러올때 defaultValues 지정가능
    defaultValues: {
      Email: "@naver.com",
    },
  });

  const errors = formState.errors as FieldErrors<IForm>;
  const onValid = (data: IForm) => {
    //3. handleSubmit을 지나 검사를 다 통과하면여기까지옴
    console.log("ONvalid", data);
    if (data.pass1 !== data.pass2) {
      //4. shouldFocus 에러가 난곳으로 커서를 보냄
      setError("pass2", { message: "패스워드가 다릅니다." }, { shouldFocus: true });
    } else {
      //5. setError 반복해서 쓰면 에러를 덮어씌우므로 조건부로 하나만 쓰게 해야함
      setError("extraError", { message: "Server offline." });
    }
  };
  console.log("Error", errors);
  // console.log(register("toDo"));
  console.log(watch());

  return (
    <div className="write-post-frame">
      <form className="postform" style={{}} onSubmit={handleSubmit(onValid)}>
        <input
          {...register("Email", {
            required: "이메일을 넣으세요.",
            //6.  정규식 패턴도 넣을 수 있음
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@naver.com$/,
              message: "올바르지 않은 이메일주소",
            },
          })}
          placeholder="Email"
        />
        {/* 7.  타입에러가 나면 as로 지정 */}
        <span>{(errors?.Email?.message as string) || null}</span>
        <input
          // 8. register에 이름을 등록하면 state 변수처럼 작동
          // onChange onBlur 등록 변화는 watch로 모니터링
          // input 내의 옵션, required: "string" -> 에러메세지. error.등록변수.message로 나옴
          // validate는 입력값을 받아서 -> true or false 또는 문장을 리턴한다 문장의 경우에는 error.등록변수.message
          {...register("name", {
            required: "이름을 입력하세요.",
            // 하나의 경우에만 쓸경우
            // validate: (value) => (value?.includes("nice") ? "starts from nice is not allowed" : true),
            // 여러개를 검사할수있으므로 object 로 만든다
            validate: {
              //9.  async 넣어서 서버응답용으로 쓸수도있다.
              noNice: (value) =>
                value?.includes("nice") ? "starts from nice is not allowed" : true,
              noSexy: (value) =>
                value?.includes("sexy") ? "starts from sexy is not allowed" : true,
            },
            minLength: 3,
          })}
          placeholder="name"
        />
        <span>{(errors?.name?.message as string) || null}</span>
        <input
          // 10. 등록시 ...register("변수", {조건, 에머메세지 object})
          {...register("pass1", {
            required: "Password is required",
            minLength: { value: 5, message: "too short" },
          })}
          type="password"
        />
        <span>{(errors?.pass1?.message as string) || null}</span>
        <input
          {...register("pass2", {
            required: "Password is required",
            minLength: { value: 5, message: "too short" },
          })}
          type="password"
        />
        <span>{(errors?.pass2?.message as string) || null}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default TodoList;
