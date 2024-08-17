import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

export default function CreateTodo() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IForm>();

  const setToDos = useSetRecoilState(toDoState);

  const onValid = ({ toDo }: IForm) => {
    // Recoil Setter는 값을 받거나, 함수를 받을수있다.(리턴값이 새로운값)
    setToDos((oldToDos) => [{ text: toDo, id: Date.now(), caterory: "TO_DO" }, ...oldToDos]);

    setValue("toDo", ""); // 유효할때 초기화
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", {
          required: "해야할 일을 입력해주세요.",
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
      <button>Add</button>

      <span>{errors?.toDo?.message as string}</span>
    </form>
  );
}
