import { GlobalStyle } from "./css/resetGlobal";
import TodoList from "./components/ToDoList";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <TodoList></TodoList>
    </>
  );
}
