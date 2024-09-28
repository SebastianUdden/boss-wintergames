import { useState } from "react";

export type GameState = "ready" | "active" | "paused" | "finished";

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>("ready");

  const startGame = () => {
    setGameState("active");
  };

  const pauseGame = () => {
    setGameState("paused");
  };

  const finishGame = () => {
    setGameState("finished");
  };

  return { gameState, startGame, pauseGame, finishGame };
};
