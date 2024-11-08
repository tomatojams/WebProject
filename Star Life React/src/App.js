import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Paper from "./routes/Paper";
// import LogIn from "./routes/logIn";

import Forest from "./routes/Forest";
import Craft from "./routes/Craft";
import Picture from "./routes/Picture";
import Lecture from "./routes/Lecture";
import LotcBoard from "./routes/AdminBoardPage";
import UserBoard from "./routes/UserBoardPage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paper" element={<Paper />} />
        <Route path="/forest" element={<Forest />} />
        <Route path="/craft" element={<Craft />} />
        <Route path="/picture" element={<Picture />} />
        <Route path="/lecture" element={<Lecture />} />
        <Route path="/board" element={<UserBoard />} />
        <Route path="/lotcBoard" element={<LotcBoard />} />
      </Routes>
    </BrowserRouter>
  );
}
