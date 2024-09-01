import { Category } from "../types/Category";
import { IToDo } from "../types/IToDo";
import { useChangeToDo, useDelete } from "./atoms";

/*서브타입 지정 - btnCategory는 IToDo의 catergory에 속한다.
const onClick = (btnCategory: IToDo["caterory"]) => {
  console.log("new")
}; */

export default function ToDo({ text, category, id }: IToDo) {
  //  _onClick 하기전에 '훅'을 불러옴
  const changeCategory = useChangeToDo();
  const deleteItem = useDelete();
  //
  const _onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(event.currentTarget.name);
    const {
      currentTarget: { name },
    } = event;
    // 훅사용
    changeCategory(text, id, name as Category);
  };

  const _onDelete = () => {
    deleteItem(id);
  };

  return (
    <li>
      <span>{text}</span>
      {/* 단축평가로 첫번째가 true인 경우에만 두번째가 true인지 확인하기위해 연산 */}
      {category !== Category.TO_DO && (
        // 엘리먼트에 name으로 지정
        <button className="simplebutton-log" name={Category.TO_DO} onClick={_onClick}>
          To Do
        </button>
      )}
      {category !== Category.DOING && (
        <button className="simplebutton-reversed" name={Category.DOING} onClick={_onClick}>
          Doing
        </button>
      )}
      {category !== Category.DONE && (
        <button className="simplebutton-reversed2" name={Category.DONE} onClick={_onClick}>
          Done
        </button>
      )}

      <button className="simplebutton-log" name={Category.DONE} onClick={_onDelete}>
        Delete
      </button>
    </li>
  );
}
