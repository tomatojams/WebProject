import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Paper from "./routes/Paper";
// import LogIn from "./routes/logIn";
import Setting from "./routes/setting";
import Forest from "./routes/Forest";
import Craft from "./routes/Craft";
import Picture from "./routes/Picture";
import Lecture from "./routes/Lecture";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paper" element={<Paper />} />
        <Route path="/forest" element={<Forest />} />
        <Route path="/craft" element={<Craft />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/picture" element={<Picture />} />
        <Route path="/lecture" element={<Lecture />} />
      </Routes>
    </BrowserRouter>
  );
}
