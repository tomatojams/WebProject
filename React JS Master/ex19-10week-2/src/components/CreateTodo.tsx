import { useForm } from "react-hook-form";

import { useAddToDo } from "./atoms";
import { IForm } from "../types/IForm";

export default function CreateTodo() {
  const {
    register,

    handleSubmit,

    formState: { errors },

    setValue,
  } = useForm<IForm>({});

  const addToDo = useAddToDo();

  const _onValid = ({ toDo }: IForm) => {
    addToDo(toDo);

    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(_onValid)}>
      <input
        id="comment_input"
        {...register("toDo", {
          required: "해야할 일을 입력해주세요.",

          validate: {
            noCool: (value) =>
              value?.includes("cool") ? "No cool allowed" : true,
          },
          minLength: {
            value: 1,
            message: "할일을 작성해주세요.",
          },
        })}
        type="text"
        placeholder="Write to do"
      />
      <button className="simplebutton-log">가자!</button>

      <span>{errors?.toDo?.message}</span>
    </form>
  );
}
