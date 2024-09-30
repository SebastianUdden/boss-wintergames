import { Link } from "react-router-dom";
import { WinterGames } from "./components/WinterGames";

export const WgHistory = () => (
  <div className="p-2">
    <h1>WinterGames History</h1>
    <Link to="/">Home</Link>
    <WinterGames />
  </div>
);
