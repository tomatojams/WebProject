import { useEffect, useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
export interface ValueTracker {}

interface IForm {
  toDo: string;
  serverError?: string;
}

export default function TodoList() {
  const [level, setLevel] = useState<string>("연구:");

  const { register, handleSubmit, setValue, formState } = useForm<IForm>({
    defaultValues: {
      toDo: level,
    },
  });
  const errors = formState.errors as FieldErrors<IForm>;

  const onSubmit = (data: IForm) => {
    console.log(data);
    setValue("toDo", level); // 유효할때 초기화
  };
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(event.target.value);
  };

  useEffect(() => {
    setValue("toDo", level);
  }, [level]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("toDo", {
            required: "해야할 일을 입력해주세요.",
            validate: {
              noCool: (value) => (value?.includes("cool") ? "No cool allowed" : true),
            },
            minLength: {
              value: 5,
              message: "할일을 작성해주세요.",
            },
          })}
          type="text"
          placeholder="Write to do"
        />
        <button>Add</button>
        <select id="work" onChange={handleSelect}>
          <option value="">-- 선택하세요 --</option>
          <option value="연구:">연구</option>
          <option value="과제:">과제</option>
          <option value="스터디:">스터디</option>
        </select>

        <span>{errors?.toDo?.message as string}</span>
        <span>{errors?.serverError?.message}</span>
      </form>
    </div>
  );
}
