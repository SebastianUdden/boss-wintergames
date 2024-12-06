import { useEffect } from "react";
import "./BossPirateGames.css";
import Layout from "./Layout";

export const BossPirateGames = () => {
  useEffect(() => {
    document.title = "BOSS PirateGames";
  }, []);
  return (
    <div className="pirateGames">
      <Layout />
    </div>
  );
};
