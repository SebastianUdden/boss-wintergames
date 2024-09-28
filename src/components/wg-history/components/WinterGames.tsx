import { wintergames } from "../constants/previousWinterGames";
import { WinterGame } from "./WinterGame";

export const WinterGames = () => (
  <div className="max-w-[800px] m-auto flex flex-col gap-4">
    {wintergames.map((wg) => (
      <WinterGame {...wg} />
    ))}
  </div>
);
