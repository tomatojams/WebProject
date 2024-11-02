import { useRecoilValue } from "recoil";
import { Category } from "../types/Category";
import { IToDo } from "../types/IToDo";
import { categoryListState, useChangeToDo, useDelete } from "./atoms";

export default function ToDo({ text, category, id }: IToDo) {
  const categoryList = useRecoilValue(categoryListState);

  const changeCategory = useChangeToDo();
  const deleteItem = useDelete();

  const _onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    changeCategory(text, id, name);
  };

  const _onDelete = () => {
    deleteItem(id);
  };

  return (
    <li>
      <div className="write-post-border">
        <span>{text}</span>

        <br></br>
        <div>
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
          <button className="simplebutton-log" name={Category.LIKE} onClick={_onDelete}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
