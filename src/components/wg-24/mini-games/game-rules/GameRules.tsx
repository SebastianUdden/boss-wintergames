import { Badge } from "@/components/wg-24/ui/badge";
import { IMiniGame } from "../MiniGame";
import { Label } from "@/components/wg-24/ui/label";
import { IScore } from "../Score";
import { Description } from "./Description";
import { IPlayer, players } from "@/components/wg-24/teams/players";
import { initialTeams, ITeam } from "@/components/wg-24/teams/teams";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Phase } from "../../Layout";
import { provideScoresOnWinner } from "../Winner";

const wordsToReplace = [
  ...players.map((p) => p.name),
  ...initialTeams.map((t) => t.name),
];

interface IGameRules extends IMiniGame {
  teams: ITeam[];
  phase: Phase;
  players: IPlayer[][];
  onFail: () => void;
  onGameComplete: (playerScores: IScore[], loserIndex: number) => void;
}

export const GameRules = ({
  phase,
  players, // Array of two arrays: [[Blue team players], [Red team players]]
  name,
  gameType,
  description,
  criteria,
  isAnalog,
  song,
  onFail,
  onGameComplete,
}: IGameRules) => {
  const [winner, setWinner] = useState("");

  useEffect(() => {
    provideScoresOnWinner({ onGameComplete, players, winner });
  }, [winner, players]);

  console.log(players);

  return (
    <div className="flex flex-col justify-between flex-grow select-none">
      {/* Content for rendering the game details */}
      <div className="flex flex-col w-full gap-4">
        <h1>{name}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="text-xl text-black capitalize bg-white hover:bg-white">
            {gameType}
          </Badge>
          <Badge>{!isAnalog ? "Digitalt" : "Fysiskt"}</Badge>
          {song}
        </div>
        <Description
          description={description}
          wordsToReplace={wordsToReplace}
        />
        {criteria && (
          <div>
            <Label className="font-bold text-[3vh]">Kriterier</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {criteria.map((c) => (
                <Badge
                  key={c}
                  className="text-white bg-pink-700 hover:bg-pink-800"
                >
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {phase === "playing-game" && gameType === "fångar" && (
        <div className="flex items-center justify-between gap-6">
          <button
            className={cn(
              "treasure completed-button !font-pirata ocean-blue",
              winner === players[0][0].name ? "ocean-blue" : "treasure-color"
              // teamIndex === 0 ? "border !border-white/10" : ""
            )}
            onClick={onFail}
            disabled={winner === players[0][0].name}
          >
            FINISHED
          </button>
        </div>
      )}
      {phase === "playing-game" && players[1].length === 0 && (
        <div className="flex items-center justify-between gap-6">
          <button
            className={cn(
              "treasure completed-button !font-pirata ocean-blue",
              winner === players[0][0].name ? "ocean-blue" : "treasure-color"
              // teamIndex === 0 ? "border !border-white/10" : ""
            )}
            onClick={onFail}
            disabled={winner === players[0][0].name}
          >
            FAIL
          </button>
          <h2 className="text-[2vh]">determine winner</h2>
          <button
            className={cn(
              "treasure completed-button !font-pirata",
              winner === players[0][0].name ? "rusty-red" : "treasure-color"
              // teamIndex === 1 ? "border-2 !border-white/10" : ""
            )}
            onClick={() => setWinner(players[0][0].name)}
            disabled={winner === players[0][0].name}
          >
            SUCCEED
          </button>
        </div>
      )}
      {/* Logic for displaying the game UI */}
      {phase === "playing-game" &&
        players[1].length > 0 &&
        gameType !== "fångar" && (
          <div className="flex items-center justify-between gap-6">
            <button
              className={cn(
                "treasure completed-button !font-pirata ocean-blue",
                winner === players[0][0].name ? "ocean-blue" : "treasure-color"
                // teamIndex === 0 ? "border !border-white/10" : ""
              )}
              onClick={() => setWinner(players[0][0].name)}
              disabled={winner === players[1][0].name}
            >
              BLUE
            </button>
            <h2 className="text-[2vh]">determine winner</h2>
            <button
              className={cn(
                "treasure completed-button !font-pirata",
                winner === players[1][0].name ? "rusty-red" : "treasure-color"
                // teamIndex === 1 ? "border-2 !border-white/10" : ""
              )}
              onClick={() => setWinner(players[1][0].name)}
              disabled={winner === players[0][0].name}
            >
              RED
            </button>
          </div>
        )}
    </div>
  );
};
