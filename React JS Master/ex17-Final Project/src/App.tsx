import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/TV";
import Search from "./Routes/Search";
import Header from "./Components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}
