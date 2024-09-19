import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainInfo from "./routes/mainInfo";
import LogIn from "./routes/logIn";
import Setting from "./routes/setting";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/maininfo" element={<MainInfo />} />
        <Route path="/" element={<LogIn />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
}
