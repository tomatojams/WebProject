import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  caterory: "TO_DO" | "DOING" | "DONE" |string;
}

export const toDoState = atom<IToDo[]>({
  key: "toDoKey",
  default: [],
});
