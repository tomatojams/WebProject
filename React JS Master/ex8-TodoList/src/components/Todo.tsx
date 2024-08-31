import { useSetRecoilState } from "recoil";
import { IToDo } from "../types/IToDo";
import { toDoState } from "./atoms";

//
/*서브타입으로 지정방법 - btnCategory는 IToDo의 catergory에 속한다.
const onClick = (btnCategory: IToDo["caterory"]) => {
  console.log("new")
}; */

export default function ToDo({ text, category, id }: IToDo) {
  // atom 수정
  const setToDos = useSetRecoilState(toDoState);
  //
  const _onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(event.currentTarget.name);
    // 엘리먼트에 지정된 속성으로 가져옴
    const {
      currentTarget: { name },
    } = event;

    // toDos-> 같은걸 찾아서 수정시킴

    // 여기 oldTodos는 state가아닌 state를 복사한 배열**
    setToDos((oldTodos) => {
      // 배열에서 오브젝트의 특정값이 같은 index를 찾아주는 함수
      // 배열.findIndex(오브젝트 => 오브젝트.속성 ==== 값)
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);

      // 지정속성에 대해서 as IToDo["category"]로 타입부여
      const newTodo = { text: text, id: id, category: name as IToDo["category"] }; // as부터 추가부분
      return [...oldTodos.slice(0, targetIndex), newTodo, ...oldTodos.slice(targetIndex + 1)];
    });
  };
  // console.log(toDos);
  return (
    <li>
      <span>{text}</span>
      {/* 단축평가로 첫번째가 true인 경우 두번째가 true인지 확인하귀위해서 두번째 피연산사반환 */}
      {category !== "TO_DO" && (
        // 엘리먼트에 name으로 지정
        <button name="TO_DO" onClick={_onClick}>
          To Do
        </button>
      )}
      {category !== "DOING" && (
        <button name="DOING" onClick={_onClick}>
          Doing
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={_onClick}>
          Done
        </button>
      )}
    </li>
  );
}
