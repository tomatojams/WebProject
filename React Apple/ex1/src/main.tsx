
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App.tsx";
import { lightTheme } from "./theme.ts";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(

    <RecoilRoot>
      <ThemeProvider theme={lightTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>

);
