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
        <Route path="/netflex/" element={<Home />} />
        <Route path="/netflex/tv" element={<Tv />} />
        <Route path="/netflex/search" element={<Search />} />
        <Route path="/netflex/movies/:movieId" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
