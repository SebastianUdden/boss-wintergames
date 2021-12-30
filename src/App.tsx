import { useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import WinterGames from "./components/WinterGames";

function App() {
  const [tab, setTab] = useState(0);
  return (
    <div className="App">
      <Menu onTabChange={(t) => setTab(t)} />
      <WinterGames />
    </div>
  );
}

export default App;
