import { wintergames } from "../constants/previousWinterGames";
import { WinterGame } from "./WinterGame";

export const WinterGames = () => (
  <div className="flex flex-col gap-4 m-auto mt-4 max-w-[1000px]">
    {wintergames.map((wg) => (
      <WinterGame {...wg} />
    ))}
  </div>
);
