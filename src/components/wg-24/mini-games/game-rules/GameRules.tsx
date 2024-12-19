import { Badge } from "@/components/wg-24/ui/badge";
import { IMiniGame } from "../MiniGame";
import { Label } from "@/components/wg-24/ui/label";
import { IScore } from "../Score";
import { Description } from "./Description";
import { IPlayer, players } from "@/components/wg-24/teams/players";
import { initialTeams, ITeam } from "@/components/wg-24/teams/teams";
import { useCallback, useEffect, useState } from "react";
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
  onGameComplete,
}: IGameRules) => {
  const [winner, setWinner] = useState("");
  // Utility function to map team players with score
  // const mapPlayersToScore = (players: IPlayer[], score: number) => {
  //   return players.map((player) => ({ player, score }));
  // };

  // // Logic for handling "Lagkamp"
  // const handleLagkamp = useCallback(
  //   (teamIndex: number) => {
  //     const winningTeam = teams[teamIndex];
  //     const losingTeamIndex = teamIndex === 0 ? 1 : 0;
  //     const losingTeam = teams[losingTeamIndex];

  //     const playerScores = [
  //       ...mapPlayersToScore(players[teamIndex], 1), // Winning team players
  //       ...mapPlayersToScore(players[losingTeamIndex], -1), // Losing team players
  //     ];

  //     onGameComplete(playerScores, losingTeamIndex);
  //   },
  //   [onGameComplete, players, teams]
  // );

  // // Logic for handling "Duell"
  // const handleDuell = useCallback(
  //   (teamIndex: number) => {
  //     const winningTeamIndex = teamIndex;
  //     const losingTeamIndex = teamIndex === 0 ? 1 : 0;

  //     const playerScores = players.flatMap((team, idx) => {
  //       return team.map((player) => ({
  //         player,
  //         score: idx === winningTeamIndex ? 1 : -1,
  //       }));
  //     });

  //     console.log({ playerScores });
  //     onGameComplete(playerScores, losingTeamIndex);
  //   },
  //   [onGameComplete, players]
  // );

  // // Logic for handling "2v2"
  // const handle2v2 = useCallback(
  //   (teamIndex: number) => {
  //     const winningTeamIndex = teamIndex;
  //     const losingTeamIndex = teamIndex === 0 ? 1 : 0;

  //     const playerScores = players.flatMap((team, idx) => {
  //       return team.map((player) => ({
  //         player,
  //         score: idx === winningTeamIndex ? 1 : -1,
  //       }));
  //     });

  //     console.log({ playerScores });
  //     onGameComplete(playerScores, losingTeamIndex);
  //   },
  //   [onGameComplete, players]
  // );

  // const handleWin = useCallback(
  //   (teamIndex: number) => {
  //     switch (gameType) {
  //       case "lagkamp":
  //         handleLagkamp(teamIndex);
  //         break;
  //       case "duell":
  //         handleDuell(teamIndex);
  //         break;
  //       case "2v2":
  //         handle2v2(teamIndex);
  //         break;
  //       default:
  //         console.error("Unsupported game category");
  //     }
  //   },
  //   [gameType, handleDuell, handle2v2, handleLagkamp]
  // );

  useEffect(() => {
    provideScoresOnWinner({ onGameComplete, players, winner });
  }, [winner, players]);

  return (
    <div className="flex flex-col justify-between flex-grow">
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

      {/* Logic for displaying the game UI */}
      {phase === "playing-game" && (
        <div className="flex items-center justify-between gap-6">
          <button
            className={cn(
              "treasure completed-button !font-pirata"
              // teamIndex === 0 ? "border !border-white/10" : ""
            )}
            onClick={() => setWinner(players[0][0].name)}
          >
            BLUE
          </button>
          <h2 className="text-[2vh]">determine winner</h2>
          <button
            className={cn(
              "treasure completed-button !font-pirata"
              // teamIndex === 1 ? "border-2 !border-white/10" : ""
            )}
            onClick={() => setWinner(players[1][0].name)}
          >
            RED
          </button>
        </div>
      )}
    </div>
  );
};
