import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    user-select: none; /* 모든 요소 선택 금지 */
  }
`;
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <>
    <GlobalStyle />
    <App />
  </>
  // </React.StrictMode>,
);
