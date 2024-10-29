import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Books from "./components/Books/Books";
import BookChapters from "./components/Books/BookChapters";
import BookCharaters from "./components/Books/BookCharacters";
import About from "./About";
import Author from "./components/Author";
import Error from "./Error";

import NotFound from "./NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />, // 상위에서 공통 에러 처리
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "author/:name",
        element: <Author />,
        children: [
          {
            path: ":id",
            element: <Books />,
            children: [
              {
                path: "chapters",
                element: <BookChapters />,
              },
              {
                path: "characters",
                element: <BookCharaters />,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
