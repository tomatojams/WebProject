import { useForm, FieldErrors } from "react-hook-form";
export interface ValueTracker {}

interface IForm {
  name?: string;
}

function TodoList() {
  const { register, watch, handleSubmit, formState } = useForm<IForm>({});

  const errors = formState.errors as FieldErrors<IForm>;
  const onValid = (data: IForm) => {
    console.log("ONvalid", data);
  };
  // 에러를 정리해서 보여줌
  console.log("Error", errors);
  // console.log(register("toDo"));
  console.log(watch());

  return (
    <div>
      <form className="postform" style={{}} onSubmit={handleSubmit(onValid)}>
        <h2>가고싶은 나라</h2>
        <input
          {...register("name", {
            required: "이름을 입력하세요.",

            validate: {
              noNice: (value) =>
                value?.includes("nice")
                  ? "starts from nice is not allowed"
                  : true,
              noSexy: (value) =>
                value?.includes("sexy")
                  ? "starts from sexy is not allowed"
                  : true,
            },
            minLength: 3,
          })}
          placeholder="이름"
        />
        <span>{(errors?.name?.message as string) || null}</span>

        <button>가자!</button>
      </form>
    </div>
  );
}

export default TodoList;
