import CreateTodo from "./CreateTodo";
import { toGoSelector } from "./atoms";
import ToDo from "./Todo";

export default function TodoList() {
  const toGoSel = toGoSelector();
  const likeToGos = toGoSel("TO_DO");
  const alreadyGone = toGoSel("DOING");
  const likeCountry = toGoSel("DONE");

  return (
    <div className="frame">
      <h3>가고 싶은 나라들</h3>

      <div className="to_do_menu">
        <div className="to_category"></div>
        <CreateTodo />
      </div>

      <div>
        <h4>가고싶은 나라들</h4>
        <ul>{likeToGos?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}</ul>
        <h4>내가 가본 나라들</h4>
        <ul>{alreadyGone?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}</ul>
        <h4>내가 좋아하는 나라들</h4>
        <ul>{likeCountry?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}</ul>
      </div>
    </div>
  );
}
