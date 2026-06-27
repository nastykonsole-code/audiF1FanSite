import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Car from "./pages/Car";
import Season from "./pages/Season";
import More from "./pages/More";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/car" element={<Car />} />
        <Route path="/season" element={<Season />} />
        <Route path="/more" element={<More />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;