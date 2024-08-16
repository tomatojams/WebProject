import { GlobalStyle } from "./style/resetGlobal";
import TodoList from "./ToDoList";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <TodoList></TodoList>
    </>
  );
}
