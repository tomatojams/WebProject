import { useRecoilValue } from "recoil";
import CreateTodo from "./CreateTodo";
import { toDoSelector, toDoState } from "./atoms";
import ToDo from "./Todo";

//recoil
// IToDO 방식의 [] 배열

export default function TodoList() {
  const toDos = useRecoilValue(toDoState);
  const selectorOutput = useRecoilValue(toDoSelector);
  console.log(selectorOutput);
  return (
    <div>
      <h4>To Dos</h4>

      <CreateTodo />
      <ul>
        {toDos.map((toDo) => (
          // {...toDo}는 props를 각각 지정하는 이것과 같음 <Todo caterory={toDo.caterory} id={toDo.id} text={toDo.text} />
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}
