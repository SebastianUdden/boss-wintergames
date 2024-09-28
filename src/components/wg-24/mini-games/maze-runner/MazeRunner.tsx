import { useState } from "react";
import { Button } from "@/components/wg-24/ui/button";
import { useEnemies } from "./movement/useEnemies"; // Import the custom hook for managing all enemies
import { useMazeWalls } from "./useMazeWalls"; // Import the custom hook for maze walls
import { RenderMaze } from "./RenderMaze"; // Import the RenderMaze component
import { usePlayer } from "./movement/usePlayer"; // Import the usePlayer hook
import { mazes } from "./mazes"; // Import the mazes from mazes.ts
import { GameState } from "../useGameState";
import { useDots } from "./useDots";
import { Score } from "../Score";

const MULTIPLIER = 100;

interface IMazeRunner {
  player: string;
}

const MazeRunner = ({ player }: IMazeRunner) => {
  const [selectedMazeId, setSelectedMazeId] = useState(mazes[3].id); // Default to the first maze
  const [gameState, setGameState] = useState<GameState>("ready");

  // Get the selected maze based on selectedMazeId
  const selectedMaze = mazes.find((maze) => maze.id === selectedMazeId);
  const mazeLayout = selectedMaze ? selectedMaze.maze : [];

  // Use the custom hook to generate maze walls
  const { walls, startPosition } = useMazeWalls(mazeLayout);
  const { dots, collectDot, points } = useDots(mazeLayout);
  const adjustedPoints = points * MULTIPLIER;
  // Initialize the player's position and movement using the custom hook
  const playerPosition = usePlayer(startPosition, walls, collectDot);

  // Initialize and manage the enemies using the custom `useEnemies` hook
  const enemies = useEnemies(
    [
      { x: 18, y: 10, previousDirection: "left", previousPositions: [] },
      { x: 5, y: 4, previousDirection: "up", previousPositions: [] },
    ],
    playerPosition, // Pass the player's current position to the enemies
    walls
  );

  const startGame = () => {
    setGameState("active");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">MazeRunner</h2>

      {/* Maze selection */}
      <select
        value={selectedMazeId}
        onChange={(e) => setSelectedMazeId(Number(e.target.value))}
        className="p-2 mb-4 border"
      >
        {mazes.map((maze) => (
          <option key={maze.id} value={maze.id}>
            {maze.name}
          </option>
        ))}
      </select>

      {/* RenderMaze component handles rendering the maze */}
      {selectedMaze && (
        <RenderMaze
          layout={mazeLayout}
          playerPosition={playerPosition}
          enemies={enemies}
          dots={dots}
        />
      )}

      <Score player={player} score={adjustedPoints} />

      {gameState === "ready" && (
        <Button onClick={startGame} className="mt-4">
          Start Game
        </Button>
      )}
    </div>
  );
};

export default MazeRunner;
