/*
import { useState } from "react";
export default function TodoList() {
  const [toDo, setToDo] = useState("");
  const [error, setError] = useState("");

  const _onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setError("");
    setToDo(value);
  };

  const _onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (toDo.length < 5) {
      return setError("To do should be longer");
    }

    console.log("submit");
  };
  return (
    <div>
      <form onSubmit={_onSubmit}>
        <input
          onChange={_onChange}
          value={toDo}
          type="text"
          placeholder="Write to do"
        />
        <button>Add</button>
        {error !== "" ? error : null}
      </form>
    </div>
  );
} */

import { useForm, FieldErrors } from "react-hook-form";
export interface ValueTracker {}

export interface WrapperState {
  initialValue: string;
  controlled: boolean;
}
export interface Ref {
  _wrapperState: WrapperState;
  value: string;
  _valueTracker: ValueTracker;
}
export interface Email {
  type: string;
  message: string;
  ref: Ref;
}
interface IError {
  Email?: Email;
  name?: Email;
  pass?: Email;
}

interface IForm {
  Email?: string;
  name?: string;
  pass?: string;
}

function TodoList() {
  // (이벤트리스너 + state 변수등록), (변화값 출력), (유효성검사후,커서까지 자동이동, 콜백함수 호출)
  // defaultValue까지 지정가능 -> register함수로 지정되는 state 이름들로 지정
  const { register, watch, handleSubmit, formState } = useForm<IForm>({
    defaultValues: {
      Email: "@naver.com",
    },
  });

  const errors = formState.errors as FieldErrors<IError>;
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log("Error", errors);
  // console.log(register("toDo"));
  console.log(watch());

  return (
    <div className="write-post-frame">
      <form className="postform" style={{}} onSubmit={handleSubmit(onValid)}>
        {/* register에 이름을 등록하면 state 변수처럼 작동
        동시에 onChange onBlur 등록 변화는 watch로 모니터링 */}
        <input
          {...register("Email", {
            required: "이메일을 넣으세요.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@naver.com$/,
              message: "올바르지 않은 이메일주소",
            },
          })}
          placeholder="Email"
        />
        {/* 타입에러가 나면 as로 지정 */}
        <span>{(errors?.Email?.message as string) || null}</span>
        <input {...register("name", { required: "이름을 입력하세요.", minLength: 8 })} placeholder="name" />
        <span>{(errors?.name?.message as string) || null}</span>
        <input
          {...register("pass", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "too short",
            },
          })}
          type="password"
        />
        <span>{(errors?.pass?.message as string) || null}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default TodoList;
