import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import Router from "./Router.tsx";
import "./global.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./resetGlobal.ts";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./theme.tsx";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
