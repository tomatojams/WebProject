import { atom, selector } from "recoil";
// 괄호는 named export일때는 항상써줘야함
import { IToDo } from "../types/IToDo";

// 상태변수저장
export const toDoState = atom<IToDo[]>({
  // 키는 recoil 내부적으로 사용됨, 자동생성은 작게나마 중복가능성이 있음
  key: "toDoKey",
  default: [],
});

// 상태의 가공정보 여러정보를 가공해서 전달해줌
export const toDoSelector = selector({
  key: "toDoSelector",
  // rrecoil value를 받는다
  // get: useRecoilValue
  get: ({ get }) => {
    const toDos = get(toDoState);
    // 배열에서 조건에 맞는것만 배열로 내보냄
    return [
      toDos.filter((todo) => todo.category === "TO_DO"),
      toDos.filter((todo) => todo.category === "DOING"),
      toDos.filter((todo) => todo.category === "DONE"),
    ];
  },
});
