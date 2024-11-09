import { BrowserRouter, Routes, Route } from "react-router-dom";
import Popular from "./Routes/Popular";
import Coming from "./Routes/Coming";
import Now from "./Routes/Now";

import Header from "./Components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Popular />} />
        <Route path="/coming-soon" element={<Coming />} />
        <Route path="/now-playing" element={<Now />} />

        <Route path="/movies/:movieId" element={<Popular />} />
      </Routes>
    </BrowserRouter>
  );
}
