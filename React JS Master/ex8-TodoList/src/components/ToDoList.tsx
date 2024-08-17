import { useRecoilValue } from "recoil";
import CreateTodo from "./CreateTodo";
import { toDoState } from "../atoms";
import ToDo from "./ToDo";

//recoil
// IToDO 방식의 [] 배열

export default function TodoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h4>To Dos</h4>

      <CreateTodo />
      <ul>
        {toDos.map((toDo) => (
          // <Todo caterory={toDo.caterory} id={toDo.id} text={toDo.text} />
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}
