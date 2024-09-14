import { useRecoilValue } from "recoil";
import { Category } from "../types/Category";
import { IToDo } from "../types/IToDo";
import { categoryListState, useChangeToDo, useDelete } from "./atoms";

/*서브타입 지정 - btnCategory는 IToDo의 catergory에 속한다.
const onClick = (btnCategory: IToDo["caterory"]) => {
  console.log("new")
}; */

export default function ToDo({ text, category, id }: IToDo) {
  const categoryList = useRecoilValue(categoryListState);
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
    changeCategory(text, id, name);
  };

  const _onDelete = () => {
    deleteItem(id);
  };

  return (
    <li>
      <div className="write-post-border">
        <span>{text}</span>
        {/* 단축평가로 첫번째가 true인 경우에만 두번째가 true인지 확인하기위해 연산 */}
        <br></br>
        <div>
          {" "}
          {categoryList.map((listCategory, index) => {
            return (
              category !== listCategory && (
                <button
                  key={index}
                  className="simplebutton-reversed"
                  name={listCategory}
                  onClick={_onClick}>
                  {listCategory}
                </button>
              )
            );
          })}
          <button className="simplebutton-log" name={Category.DONE} onClick={_onDelete}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
