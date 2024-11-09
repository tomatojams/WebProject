import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Paper from "./routes/Paper";
import Forest from "./routes/Forest";
import Craft from "./routes/Craft";
import Picture from "./routes/Picture";
import Lecture from "./routes/Lecture";
import LotcBoard from "./routes/AdminBoardPage";
import UserBoard from "./routes/UserBoardPage";
import ForestBoard from "./routes/AdminForestBoardPage";
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
        <Route path="/adimin-board-938ff!@!" element={<LotcBoard />} />
        <Route path="/adimin-forest-as@@!!$$" element={<ForestBoard />} />
      </Routes>
    </BrowserRouter>
  );
}
