import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import "./App.css";
import { Wintergames24 } from "./pages/Wintergames24";
import { WintergamesHistory } from "./pages/WintergamesHistory";
import { MiniGameIdeas } from "./pages/MiniGameIdeas";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<WintergamesHistory />} />
        <Route path="/boss-pirate-games" element={<Wintergames24 />} />
        <Route path="/mini-game-ideas" element={<MiniGameIdeas />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
