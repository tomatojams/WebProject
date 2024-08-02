import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ThemeProvider } from "styled-components";

// Themes

const darkTheme = {
  textColor: "violet",
  backgroundColor: "#111",
};

const lightTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#FFF",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ThemeProvider theme={lightTheme}>
    <App />
  </ThemeProvider>

  // </React.StrictMode>,
);
