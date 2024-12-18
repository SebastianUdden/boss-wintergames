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
import { useState } from "react";
import { Selector } from "./Selector";
import { Pong } from "./pong/Pong";

export interface IPlayerSetup {
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  team1: string;
  team2: string;
  // solo: string;
  // duel: [string, string];
  // threeWay: [string, string, string];
  // duos: [string, string, string, string];
}

// const replacePlaceholders = (
//   playerSetup: IPlayerSetup,
//   miniGame?: IMiniGame
// ) => {
//   if (!miniGame) return "";
//   let objString = JSON.stringify(miniGame);

//   const { p1, p2, p3, p4, team1, team2 } = playerSetup;
//   objString = objString
//     .replace(/{p1}/g, p1)
//     .replace(/{p2}/g, p2)
//     .replace(/{p3}/g, p3)
//     .replace(/{p4}/g, p4)
//     .replace(/{team1}/g, team1)
//     .replace(/{team2}/g, team2);

//   return JSON.parse(objString);
// };

export const getRandomPlayer = (array: IPlayer[]) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const getPlayerSetup = (
  challenger: string,
  teamsTurn: number,
  teams: ITeam[]
): IPlayerSetup => {
  const otherTeam = teamsTurn === 0 ? 1 : 0;
  const firstInSameTeam =
    teams[teamsTurn].players.length > 1
      ? getRandomPlayer(
          teams[teamsTurn].players.filter((p) => p.name !== challenger)
        ).name
      : "";
  const firstInOtherTeam =
    teams[otherTeam].players.length > 0
      ? getRandomPlayer(teams[otherTeam].players).name
      : "";
  const secondInOtherTeam =
    teams[otherTeam].players.length > 1
      ? getRandomPlayer(
          teams[otherTeam].players.filter((p) => p.name !== firstInOtherTeam)
        ).name
      : "";

  const playerSetup = {
    p1: challenger,
    p2: firstInOtherTeam,
    p3: firstInSameTeam,
    p4: secondInOtherTeam,
    team1: teams[teamsTurn].name,
    team2: teams[otherTeam].name,
  };
  return playerSetup;
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
      {phase === "explaining-game" && !showSelector && (
        <div className="relative flex m-auto">
          <img
            src="/backgrounds/maps/pirate-map-background.png"
            alt="Pirate Map"
            className="flex flex-grow base-image"
          />
          <div className="content-overlay p-[14vw] py-[10vh] 2xl:p-[12vh]">
            <GameRules
              teams={teams}
              chosenPlayers={chosenPlayers}
              {...miniGame}
              phase={phase}
              onGameComplete={onGameComplete}
            />
          </div>
          <div className="overlay"></div>
        </div>
      )}
      {phase === "playing-game" && chosenPlayers.length !== 0 && (
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
