import { GlobalStyle } from "./css/resetGlobal";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <input type="number" placeholder="Minutes" />
      <input type="number" placeholder="Hours" />
    </>
  );
}