import CreateTodo from "./CreateTodo";
import { useRecoilValue } from "recoil";
import { toGoSelector } from "./atoms";
import ToDo from "./Todo";

export default function TodoList() {
  const likeToGos = useRecoilValue(toGoSelector("가고싶다"));
  const alreadyGone = useRecoilValue(toGoSelector("가본나라"));
  const likeCountry = useRecoilValue(toGoSelector("❤️"));

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
