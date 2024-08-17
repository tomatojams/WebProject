import { useRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

//
/*서브타입으로 지정방법 - btnCategory는 IToDo의 catergory에 속한다.
const onClick = (btnCategory: IToDo["caterory"]) => {
  console.log("new")
}; */

export default function ToDo({ text, caterory, id }: IToDo) {
  // atom 수정
  const [toDos, setTodos] = useRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.name);

    const {
      currentTarget: { name },
    } = event;

    // toDos-> 같은걸 찾아서 수정시킴
    // 배열에서 오브젝트의 특정값이 같은 index를 찾아주는 함수
    // 배열.findIndex(오브젝트 => 오브젝트.속성 ==== 값)
    // const index = toDos.findIndex((todo) => todo.id === id);
    // let newTodos = [...toDos];
    // newTodos[index] = { text: text, id: id, caterory: name };
    // setTodos(newTodos);

    // 여기 oldTodos는 state가아닌 state를 복사한 배열이라고 생각하고 다루면 돔
    setTodos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
      const newTodo = { text: text, id: id, caterory: name };
      return [...oldTodos.slice(0, targetIndex), newTodo, ...oldTodos.slice(targetIndex + 1)];
    });
  };
  console.log(toDos);
  return (
    <li>
      <span>{text}</span>
      {/* 단축평가로 첫번째가 true인 경우 두번째가 true인지 확인하귀위해서 두번째 피연산사반환 */}
      {caterory !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {caterory !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {caterory !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}
