import { useRecoilState, useRecoilValue } from "recoil";
import CreateTodo from "./CreateTodo";
import { toDoSelector, categoryState, categoryListState } from "./atoms";
import ToDo from "./Todo";
import CreateCategory from "./CreateCategory";

//recoil
// IToDO 방식의 [] 배열

export default function TodoList() {
  // 리턴값을 destructuring해서 받아옴
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const categoryList = useRecoilValue(categoryListState);
  // FormEvent 쓰는 이유
  const _onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value );
  };

  return (
    <div className="frame">
      <h3>T O D O_L I S T</h3>
      {/* oninput 은 선택해서 변하자마자 이벤트가 일어나고,
        onchange는 선택하고 포커슬ㄹ 잃은다음에야 일어나기때문에 */}

      {/* value={category} 쓰는 이유 */}

      <div className="to_do_menu">
        <div className="to_category">
          <CreateCategory />

          <select className="category_select" value={category} onInput={_onInput}>
            {categoryList.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <CreateTodo />
      </div>

      <div>
        <ul>
          {toDos?.map((toDo) => (
            // {...toDo}는 props를 각각 지정하는 이것과 같음 <Todo caterory={toDo.caterory}
            //id = { toDo.id } text = { toDo.text } />
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ul>
      </div>
    </div>
  );
}
