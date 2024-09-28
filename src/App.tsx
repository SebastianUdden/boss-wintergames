import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import "./App.css";
import { Wintergames24 } from "./pages/Wintergames24";
import { WintergamesHistory } from "./pages/WintergamesHistory";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<WintergamesHistory />} />
        <Route path="/boss-pirate-games" element={<Wintergames24 />} />
        <Route path="*" element={<NotFound />} />{" "}
        {/* Catch-all route for 404 */}
      </Routes>
    </div>
  );
};

export default App;
