import { Category } from "./Category";
import { NewCategory } from "./NewCategory";
export interface IToDo {
  text: string;
  id: number;
  category: Category | NewCategory;

}
