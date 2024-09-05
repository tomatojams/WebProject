import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme.js";
import Router from "./router";
import { GlobalStyle } from "./style/resetGlobal";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms.js";
import "./global.css";

export default function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    // state를 쓰기위해 app에서 ThemeProvider 실행
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
}
