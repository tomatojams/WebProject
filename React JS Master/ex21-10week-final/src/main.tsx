import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";
import "./global.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./css/resetGlobal.ts";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./theme.tsx";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
