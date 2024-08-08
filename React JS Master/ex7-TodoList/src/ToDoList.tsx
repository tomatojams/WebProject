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

    if (toDo.length < 10) {
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
}
