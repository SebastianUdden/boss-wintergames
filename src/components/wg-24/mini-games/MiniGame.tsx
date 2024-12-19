import { GameRules } from "./game-rules/GameRules";
import { IScore } from "./Score";
import { ITeam } from "../teams/teams";
import { IPlayer } from "../teams/players";
// import { ShipwreckGame } from "./shipwreck/components/ShipwreckGame";
import { Phase } from "../Layout";
import { MemoryBoard } from "./memory/MemoryBoard";
import { cn } from "@/lib/utils";
import { TheFloor } from "./the-floor/TheFloor";
import MazeRunner from "./maze-runner/MazeRunner";
import { TheClicker } from "./the-clicker/TheClicker";
import { Selector } from "./Selector";
import { Pong } from "./pong/Pong";
import { miniGames } from "./miniGames";

const analogGames = miniGames.filter((minigame) => minigame.isAnalog);

export const getRandomPlayer = (array: IPlayer[]) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export interface IMiniGameBase {
  players: IPlayer[][];
  onGameComplete: (playerScores: IScore[], loserIndex: number) => void;
}

export interface IMiniGame {
  id: number;
  color: string;
  name: string;
  gameType: "solo" | "duell" | "2v2" | "lagkamp";
  concept?: string;
  instructions?: string[];
  description?: string[];
  criteria?: string[];
  song: string;
  isSelected?: boolean;
  isAnalog?: boolean;
  weight: number;
  points?: {
    winner: number;
  };
}

export interface MiniGameProps {
  teams: ITeam[];
  miniGame?: IMiniGame;
  chosenPlayers: IPlayer[][];
  phase: Phase;
  showSelector: boolean;
  onGameComplete: (playerScores: IScore[], loserIndex: number) => void;
  onSelectGame: (index: number) => void;
}

export const MiniGame = ({
  teams,
  miniGame,
  chosenPlayers,
  phase,
  showSelector,
  onGameComplete,
  onSelectGame,
}: MiniGameProps) => {
  const { name } = miniGame ?? {};
  const handleSelectGame = (index: number) => {
    onSelectGame(index);
  };
  const handleGameComplete = (scores: IScore[]) => {
    const adjustedScores = scores.map((s, index) => {
      const playerWon =
        index === 0 ? s.score > scores[1].score : s.score > scores[0].score;
      return {
        ...s,
        score: playerWon ? 1 : -1,
      };
    });
    const losingTeamIndex = adjustedScores[0].score === 1 ? 1 : 0;
    onGameComplete(adjustedScores, losingTeamIndex);
  };

  return (
    <div
      className={cn(
        "relative flex flex-grow mt-4",
        phase === "explaining-game" ? "80vh" : "80vw"
      )}
    >
      {phase === "explaining-game" && showSelector && (
        <Selector onSelectGame={handleSelectGame} />
      )}
      {(phase === "explaining-game" && !showSelector) ||
        (phase === "playing-game" &&
          analogGames.some((game) => game.name === name) && (
            <div className="relative flex m-auto">
              <img
                src="/backgrounds/maps/pirate-map-background.png"
                alt="Pirate Map"
                className="flex flex-grow base-image"
              />
              <div className="content-overlay p-[14vw] py-[10vh] 2xl:p-[12vh]">
                <GameRules
                  teams={teams}
                  players={chosenPlayers}
                  {...miniGame}
                  phase={phase}
                  onGameComplete={onGameComplete}
                />
              </div>
              <div className="overlay"></div>
            </div>
          ))}
      {phase === "playing-game" &&
        chosenPlayers.length !== 0 &&
        !analogGames.some((game) => game.name === name) && (
          <div className="w-full p-10 bg-black rounded-xl">
            {name === "Kraken's Recall" && (
              <>
                <MemoryBoard
                  players={chosenPlayers}
                  onGameComplete={handleGameComplete}
                />
              </>
            )}
            {name === "Shipmate's Wit" && (
              <TheFloor
                players={chosenPlayers}
                onGameComplete={handleGameComplete}
              />
            )}
            {name === "Cursed coins" && (
              <MazeRunner
                teams={teams}
                players={chosenPlayers}
                onGameComplete={onGameComplete}
              />
            )}
            {name === "Finger Walz" && (
              <TheClicker
                players={chosenPlayers}
                onGameComplete={onGameComplete}
              />
            )}
            {name === "Cannons" && (
              <Pong players={chosenPlayers} onGameComplete={onGameComplete} />
            )}
          </div>
        )}

      {/* {name === "Boss, Bad, Ugly" && (
        <QuickDraw
          players={playerSetup.threeWay}
          onGameComplete={onGameComplete}
        />
      )}
    
      {name === "The clicker" && (
        <TheClicker player={playerSetup.solo} onGameComplete={onGameComplete} />
      )}
      {name === "Maze" && (
        <MazeRunner player={playerSetup.solo} onGameComplete={onGameComplete} />
      )}
      {name === "Jumper" && (
        <SideScroller
          player={playerSetup.solo}
          onGameComplete={onGameComplete}
        />
      )}
      {name === "Cards" && (
        <CardsGame player={playerSetup.solo} onGameComplete={onGameComplete} />
      )} */}
      {/* {name === "Shipwreck" && (
        <ShipwreckGame
          players={[
            playerSetup.p1,
            playerSetup.p2,
            playerSetup.p3,
            playerSetup.p4,
          ]}
          onGameComplete={onGameComplete}
        />
      )} */}
    </div>
  );
};
