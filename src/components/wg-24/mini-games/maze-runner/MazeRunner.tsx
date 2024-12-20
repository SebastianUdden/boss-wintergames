import { useEffect, useMemo, useState } from "react";
import { useMazeWalls } from "./useMazeWalls"; // Import the custom hook for maze walls
import { RenderMaze } from "./RenderMaze"; // Import the RenderMaze component
import { usePlayer } from "./movement/usePlayer"; // Import the usePlayer hook
import { mazes } from "./mazes"; // Import the mazes from mazes.ts
import { GameState } from "../gameState";
import { useDots } from "./useDots";
import { Scores } from "../Scores";
import { StartButton } from "../StartButton";
import { IMiniGameBase } from "../MiniGame";
import { provideScoresOnWinner } from "../Winner";
import { ITeam } from "../../teams/teams";

const MULTIPLIER = 1;

const getP1Points = (
  adjustedPoints: number | undefined,
  secondsRemaining: number | undefined | null
) => {
  if (secondsRemaining === null || secondsRemaining === -1) return 0; // Ensure no points when time runs out
  if (secondsRemaining === 0 || secondsRemaining === undefined)
    return adjustedPoints; // Keep final points when time is 0
  return secondsRemaining - 1;
};

const getP2Points = (
  adjustedPoints: number | undefined,
  secondsRemaining: number | undefined | null,
  count: number
) => {
  if (secondsRemaining === null) return count; // Ensure no points when time runs out
  if (secondsRemaining === 0 || secondsRemaining === undefined)
    return adjustedPoints; // Keep final points when time is 0
  return 1 + count - secondsRemaining;
};

interface IMazeRunner extends IMiniGameBase {
  teams: ITeam[];
}

const MazeRunner = ({ teams, players, onGameComplete }: IMazeRunner) => {
  const [player1, player2] = useMemo(() => {
    const randomIndex = Math.random() < 0.5 ? 0 : 1; // Randomly select index 0 or 1
    return [players[randomIndex], players[1 - randomIndex]];
  }, [players]);
  const player1IsRed = teams[1].players.some(
    (tp) => player1[0].name === tp.name
  );
  const [selectedMazeId, setSelectedMazeId] = useState(mazes[2].id); // Default to the first maze
  const [gameState, setGameState] = useState<GameState>("ready");
  const [winner, setWinner] = useState<string | undefined>(); // Track the winner
  const [blueMessage, setBlueMessage] = useState("");
  const [redMessage, setRedMessage] = useState("");
  const [adjustedPoints, setAdjustedPoints] = useState(0);
  const [count, setCount] = useState(0);
  const [scores, setScores] = useState([0, 0]);
  const [secondsRemaining, setSecondsRemaining] = useState<
    number | undefined | null
  >(undefined);
  const selectedMaze = mazes.find((maze) => maze.id === selectedMazeId);
  const mazeLayout = useMemo(
    () => (selectedMaze ? selectedMaze.maze : []),
    [selectedMaze]
  );
  const { walls, p1Start, p2Start } = useMazeWalls(mazeLayout);
  const { dots, collectDot, points } = useDots(mazeLayout);
  const lastDot = dots.size === 1;
  const noDot = dots.size === 0;

  useEffect(() => {
    const dotCount = new Set<string>();
    mazeLayout.forEach((row, y) => {
      row.split("").forEach((cell, x) => {
        if (cell === ".") {
          dotCount.add(`${x},${y}`);
        }
      });
    });
    setCount(dotCount.size);
  }, [count, mazeLayout]);

  useEffect(() => {
    // Trigger countdown when lastDot is reached
    if (lastDot && gameState === "active") {
      setSecondsRemaining(count); // Set the initial countdown value
      setRedMessage(
        "You have gained the cursed aztec power, get the last coin and kill the treasures owner!"
      );
      setBlueMessage(
        "Run and hide the last coin until you've drained their power!"
      );
    }
  }, [lastDot, gameState, count]);

  useEffect(() => {
    // Handle the countdown timer
    if (secondsRemaining === null || secondsRemaining === undefined) return;

    if (secondsRemaining === 0) {
      setSecondsRemaining(null); // Stop timer when it reaches 0
      setWinner(player2[0].name);
      return;
    }

    const timer = setTimeout(() => {
      setSecondsRemaining((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsRemaining]);

  useEffect(() => {
    setAdjustedPoints(points * MULTIPLIER);
  }, [points]);
  // Player 1 (Arrow Keys)
  const player1Position = usePlayer(
    p1Start,
    walls,
    collectDot,
    !!winner,
    false,
    lastDot
  );

  // Player 2 (WASD Keys)
  const player2Position = usePlayer(
    p2Start,
    walls,
    () => {},
    !!winner,
    true,
    lastDot
  ); // Pass a flag to identify the second player

  const startGame = () => {
    setGameState("active");
    setWinner(undefined); // Reset winner when the game starts
  };

  useEffect(() => {
    // Check for collision between players
    if (
      gameState === "active" &&
      player1Position.x === player2Position.x &&
      player1Position.y === player2Position.y
    ) {
      if (lastDot) {
        setWinner(player1[0].name); // Set Player 1 as the winner
      } else {
        setWinner(player2[0].name); // Set Player 2 as the winner
      }
    }
  }, [gameState, player1Position, player2Position, player1, player2, lastDot]);

  useEffect(() => {
    if (gameState === "active" && !lastDot) {
      setRedMessage("Collect all coins and avoid capture!");
      setBlueMessage("Find and kill the thief!");
    }
    if (gameState === "active" && noDot) {
      setWinner(player1[0].name);
    }
    if (gameState === "finished") {
      setScores([
        getP1Points(adjustedPoints, 0),
        getP2Points(dots.size, 0, count),
      ]); // Show final points for Player 1
    } else {
      setScores([
        getP1Points(adjustedPoints, secondsRemaining),
        getP2Points(dots.size, secondsRemaining, count),
      ]); // Show final points for Player 1
    }
  }, [
    gameState,
    lastDot,
    noDot,
    player1,
    adjustedPoints,
    count,
    dots.size,
    secondsRemaining,
  ]);

  useEffect(() => {
    if (winner) {
      setSecondsRemaining(null);
    }
    provideScoresOnWinner({ onGameComplete, players, winner });
  }, [winner, players]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="font-bold text-8xl">Cursed Coins</h2>

      <div className="flex flex-col justify-center w-full h-full">
        {gameState === "ready" && (
          <StartButton onStartGame={startGame}>Start Game</StartButton>
        )}

        {/* RenderMaze component */}
        {gameState === "active" && selectedMaze && (
          <div className="grid grid-cols-[1fr,1fr,1fr] gap-4 w-full font-pirata">
            <div className="flex items-center w-full text-right">
              {redMessage}
            </div>
            <div className="flex items-center justify-center">
              <RenderMaze
                layout={mazeLayout}
                playerPosition={player1Position}
                enemies={[]}
                dots={dots}
                secondPlayerPosition={player2Position}
                winner={!!winner && (winner === player1[0].name ? "p1" : "p2")}
                player1IsRed={player1IsRed}
              />
            </div>
            <div className="flex items-center w-full text-left">
              {blueMessage}
            </div>
          </div>
        )}
        <div className="h-5 mt-4 text-4xl font-bold text-center font-pirata">
          {winner &&
            `
            ${winner} Wins!`}
        </div>
      </div>

      <div className="w-full mt-auto">
        <Scores
          players={[player1, player2]}
          scores={scores}
          winner={winner}
          player1IsRed={player1IsRed}
          controls={[
            ["w", "a", "s", "d"],
            [<>&uarr;</>, <>&larr;</>, <>&darr;</>, <>&rarr;</>],
          ]}
        />
      </div>
    </div>
  );
};

export default MazeRunner;
