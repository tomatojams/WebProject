import { atom, useRecoilValue, useSetRecoilState, selectorFamily } from "recoil";
import { IToDo } from "../types/IToDo";
import { Category } from "../types/Category";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "toLocal",
  storage: localStorage,
});

//1. 상태변수저장
export const toDoState = atom<IToDo[]>({
  key: "toDoKey",
  default: [],
  // 실험적 기능
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<Category>({
  key: "category",
  default: Category.가고싶다,
});

export const categoryListState = atom<Category[]>({
  key: "customCategory",
  default: [Category.가고싶다, Category.가본나라, Category.LIKE],
  effects_UNSTABLE: [persistAtom],
});

// 카테고리별로 선택해줌
export const toGoSelector = selectorFamily({
  key: "toGoSelector",
  get:
    (category: string) =>
    ({ get }) => {
      const toDos = get(toDoState);
      return toDos.filter((todo) => todo.category === category);
    },
});

//3. 상태 변경 커스텀 훅으로 제작 커스텀 훅함수를 제공하도록 return 상태변경함수로 제작한다.
export const useAddToDo = () => {
  const category = useRecoilValue(categoryState);
  const setToDos = useSetRecoilState(toDoState);
  // 상태변경함수 반환
  return (newToDo: string) => {
    setToDos((oldToDos) => [{ text: newToDo, id: Date.now(), category: category }, ...oldToDos]);
  };
};

export const useChangeToDo = () => {
  const setToDos = useSetRecoilState(toDoState);

  return (text: string, id: number, name: IToDo["category"]) => {
    setToDos((oldToDos) =>
      oldToDos.map((todo) => (todo.id === id ? { ...todo, text, category: name } : todo))
    );
  };
};

export const useDelete = () => {
  const setToDos = useSetRecoilState(toDoState);

  return (id: number) => {
    setToDos((oldToDos) => oldToDos.filter((todo) => todo.id !== id));
  };
};
