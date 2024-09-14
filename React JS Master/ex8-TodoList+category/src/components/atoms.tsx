import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
//type
import { IToDo } from "../types/IToDo";
import { Category } from "../types/Category";
// 로컬 스토리지저장
import { recoilPersist } from "recoil-persist";
import { NewCategory } from "../types/NewCategory";

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
// 챌린지 수정
export const categoryState = atom<Category | NewCategory>({
  key: "category",
  default: Category.TO_DO,
});
// 챌린지 수정
export const categoryListState = atom<(Category | NewCategory)[]>({
  key: "customCategory",
  default: [Category.TO_DO, Category.DOING, Category.DONE],
  effects_UNSTABLE: [persistAtom],
});
// 챌린지 수정
// 카테고리 변경 훅
export const useAddCategory = () => {
  const setCategoryList = useSetRecoilState(categoryListState);
  // 상태변경함수 반환
  return (newCategory: string) => {
    setCategoryList((oldList) => [...oldList, newCategory]);
  };
};

//2. 상태의 가공정보 여러정보를 가공해서 전달해줌
export const toDoSelector = selector({
  key: "toDoSelector",
  // get: useRecoilValue 을 써서 가공된 값을 반환하는 속성
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

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

// 상태변경 커스텀 훅
export const useChangeToDo = () => {
  const setToDos = useSetRecoilState(toDoState);

  return (text: string, id: number, name: IToDo["category"]) => {
    setToDos((oldToDos) => {
      //   // 배열에서 오브젝트의 특정값이 같은 index를 찾아주는 함수
      //   // 배열.findIndex(오브젝트 => 오브젝트.속성 ==== 값)
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);

      const newTodo = { text: text, id: id, category: name };
      return [...oldToDos.slice(0, targetIndex), newTodo, ...oldToDos.slice(targetIndex + 1)];
    });
  };
};

export const useDelete = () => {
  const setToDos = useSetRecoilState(toDoState);

  return (id: number) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      return [...oldToDos.slice(0, targetIndex), ...oldToDos.slice(targetIndex + 1)];
    });
  };
};
