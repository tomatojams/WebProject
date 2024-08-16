import { useEffect, useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

//recoil
// IToDO 방식의 [] 배열
const toDoState = atom<ITodDo[]>({
  key: "toDoKey",
  default: [],
});

interface ITodDo {
  text: string;
  id: number;
  caterory: "TO_DO" | "DOING" | "DONE";
}

interface IForm {
  toDo: string;
}

export default function TodoList() {
  // 추가
  const [level, setLevel] = useState("연구:");
  const [toDos, setToDos] = useRecoilState(toDoState);

  const { register, handleSubmit, setValue, formState } = useForm<IForm>({
    defaultValues: {
      toDo: level,
    },
  });
  const errors = formState.errors as FieldErrors<IForm>;

  // on Submit
  const onValid = ({ toDo }: IForm) => {
    console.log("Add to Do:", toDos);
    // Recoil Setter는 값을 받거나, 함수를 받을수있다.(리턴값이 새로운값)
    setToDos((oldToDos) => [{ text: toDo, id: Date.now(), caterory: "TO_DO" }, ...oldToDos]);

    setValue("toDo", level); // 유효할때 초기화
  };

  // 추가옵션
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(event.target.value);
  };
  useEffect(() => {
    setValue("toDo", level);
  }, [level]);

  console.log("ToDos:", toDos);
  return (
    <div>
      <h4>To Dos</h4>
      <form onSubmit={handleSubmit(onValid)}>
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
      </form>

      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}
