import { GlobalStyle } from "./style/resetGlobal";
import TodoList from "./components/ToDoList";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <TodoList></TodoList>
    </>
  );
}
