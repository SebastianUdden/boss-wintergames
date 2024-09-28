import { Badge } from "@/components/wg-24/ui/badge";
import { IMiniGame, IPlayerSetup } from "../MiniGame";
import { Label } from "@/components/wg-24/ui/label";
import { IScore } from "../Score";
import { Description } from "./Description";
import { IPlayer, players } from "@/components/wg-24/teams/players";
import { initialTeams, ITeam } from "@/components/wg-24/teams/teams";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

const wordsToReplace = [
  ...players.map((p) => p.name),
  ...initialTeams.map((t) => t.name),
];

interface IGameRules extends IMiniGame {
  teams: ITeam[];
  playerSetup: IPlayerSetup;
  onGameComplete: (playerScores: IScore[], loserIndex: number) => void;
}

export const GameRules = ({
  playerSetup,
  teams,
  name,
  category,
  description,
  criteria,
  song,
  onGameComplete,
}: IGameRules) => {
  // Utility function to map team players with score
  const mapPlayersToScore = (players: IPlayer[], score: number) => {
    return players.map((p) => ({ player: p.name, score }));
  };

  // Logic for handling "Lagkamp"
  const handleLagkamp = useCallback(
    (teamIndex: number) => {
      const winningTeam = teams[teamIndex];
      const losingTeamIndex = teamIndex === 0 ? 1 : 0;
      const losingTeam = teams[losingTeamIndex];

      const playerScores = [
        ...mapPlayersToScore(winningTeam.players, 1),
        ...mapPlayersToScore(losingTeam.players, -1),
      ];

      console.log({ playerScores });
      onGameComplete(playerScores, losingTeamIndex);
    },
    [onGameComplete, teams]
  );

  // Logic for handling "Duell"
  const handleDuell = useCallback(
    (teamIndex: number) => {
      const winningTeamName = teams[teamIndex].name;
      const losingTeamIndex = teamIndex === 0 ? 1 : 0;
      const playerScores = teams.flatMap((team) => {
        return team.players.map((p) => {
          if (p.name === playerSetup.p1) {
            const score = team.name === winningTeamName ? 1 : -1;
            return { player: p.name, score };
          } else if (p.name === playerSetup.p2) {
            const score = team.name === winningTeamName ? 1 : -1;
            return { player: p.name, score };
          }
          return { player: p.name, score: 0 };
        });
      });

      console.log({ playerScores });
      onGameComplete(playerScores, losingTeamIndex);
    },
    [onGameComplete, playerSetup, teams]
  );

  // Logic for handling "2v2"
  const handle2v2 = useCallback(
    (teamIndex: number) => {
      const winningTeamName = teams[teamIndex].name;
      const losingTeamIndex = teamIndex === 0 ? 1 : 0;

      const playerScores = teams.flatMap((team) => {
        return team.players.map((p) => {
          if (p.name === playerSetup.p1 || p.name === playerSetup.p3) {
            const score = team.name === winningTeamName ? 1 : -1;
            return { player: p.name, score };
          } else if (p.name === playerSetup.p2 || p.name === playerSetup.p4) {
            const score = team.name === winningTeamName ? 1 : -1;
            return { player: p.name, score };
          }
          return { player: p.name, score: 0 };
        });
      });

      console.log({ playerScores });
      onGameComplete(playerScores, losingTeamIndex);
    },
    [onGameComplete, playerSetup, teams]
  );

  const handleWin = useCallback(
    (teamIndex: number) => {
      switch (category) {
        case "Lagkamp":
          handleLagkamp(teamIndex);
          break;
        case "Duell":
          handleDuell(teamIndex);
          break;
        case "2v2":
          handle2v2(teamIndex);
          break;
        default:
          console.error("Unsupported game category");
      }
    },
    [category, handleDuell, handle2v2, handleLagkamp]
  );

  const isTeamFight = category === "Lagkamp";

  return (
    <div className="flex flex-col justify-between flex-grow">
      {/* Content for rendering the game details */}
      <div className="flex flex-col w-full gap-4">
        <h1>{name}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="text-xl text-black bg-white hover:bg-white">
            {category}
          </Badge>
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
      <div className="flex flex-col gap-4">
        <div
          className={cn(
            "flex items-center justify-between gap-6",
            playerSetup.team1 === "Red" ? "flex-row-reverse" : ""
          )}
        >
          <div
            className={cn(
              "flex flex-col gap-2 justify-end h-full",
              playerSetup.team1 === "Red" ? "items-end" : "items-start"
            )}
          >
            {isTeamFight && (
              <>
                {teams[playerSetup.team1 === "Red" ? 1 : 0].players.map((p) => (
                  <p key={p.name} className="text-white playing">
                    {p.name}
                  </p>
                ))}
              </>
            )}
            {!isTeamFight && (
              <p className="text-white playing">{playerSetup.p1}</p>
            )}
            {category === "2v2" && (
              <p className="text-white playing">{playerSetup.p3}</p>
            )}
          </div>
          <div
            className={cn(
              "flex flex-col gap-2 justify-end h-full",
              playerSetup.team1 === "Red" ? "items-start" : "items-end"
            )}
          >
            {isTeamFight && (
              <>
                {teams[playerSetup.team1 === "Red" ? 0 : 1].players.map((p) => (
                  <p key={p.name} className="text-white playing">
                    {p.name}
                  </p>
                ))}
              </>
            )}
            {!isTeamFight && (
              <p className="text-white playing">{playerSetup.p2}</p>
            )}
            {category === "2v2" && (
              <p className="text-white playing">{playerSetup.p4}</p>
            )}
          </div>
        </div>

        {/* Buttons to determine the winning team */}
        <div className="flex items-center justify-between gap-6">
          <button
            className={cn(
              "treasure completed-button !font-pirata",
              playerSetup.team1 === "Blue" ? "border !border-white/10" : ""
            )}
            onClick={() => handleWin(0)}
          >
            BLUE
          </button>
          <h2 className="text-[2vh]">determine winner</h2>
          <button
            className={cn(
              "treasure completed-button !font-pirata",
              playerSetup.team1 === "Red" ? "border-2 !border-white/10" : ""
            )}
            onClick={() => handleWin(1)}
          >
            RED
          </button>
        </div>
      </div>
    </div>
  );
};
