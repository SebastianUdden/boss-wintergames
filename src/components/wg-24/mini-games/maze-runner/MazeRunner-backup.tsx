import { useState, useEffect } from "react";
import { Button } from "@/components/wg-24/ui/button";

// Utility for movement
const movePlayer = (
  direction: string,
  position: { x: number; y: number },
  walls: Set<string>
) => {
  const newPosition = { ...position };

  switch (direction) {
    case "up":
      newPosition.y -= 1;
      break;
    case "down":
      newPosition.y += 1;
      break;
    case "left":
      newPosition.x -= 1;
      break;
    case "right":
      newPosition.x += 1;
      break;
  }

  // Prevent movement through walls
  if (walls.has(`${newPosition.x},${newPosition.y}`)) {
    return position; // Return old position if wall encountered
  }

  return newPosition;
};

// Utility to move enemies randomly
const getRandomDirection = () => {
  const directions = ["up", "down", "left", "right"];
  const randomIndex = Math.floor(Math.random() * directions.length);
  return directions[randomIndex];
};

const moveEnemy = (position: { x: number; y: number }, walls: Set<string>) => {
  let newPosition = position;
  let attempts = 0;
  let validMove = false;

  while (!validMove && attempts < 10) {
    // Try up to 10 times to find a valid move
    const randomDirection = getRandomDirection();
    newPosition = movePlayer(randomDirection, position, walls);
    if (newPosition !== position) {
      validMove = true; // Break the loop if a valid move is found
    }
    attempts++;
  }

  return newPosition;
};

const generateMazeWalls = (layout: string[]) => {
  const walls = new Set<string>();
  layout.forEach((row, y) => {
    row.split("").forEach((cell, x) => {
      if (cell === "W") {
        walls.add(`${x},${y}`);
      }
    });
  });
  return walls;
};

// Main MazeRunner component
const MazeRunner = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 10, y: 6 }); // Player starts in the middle
  const [mazeWalls, setMazeWalls] = useState<Set<string>>(new Set());
  const [enemies, setEnemies] = useState([
    { x: 18, y: 10 },
    { x: 5, y: 4 },
  ]); // Adding a couple of enemies
  const [dots, setDots] = useState<Set<string>>(new Set()); // Dots for collectibles
  const [gameState, setGameState] = useState<"ready" | "active" | "finished">(
    "ready"
  );

  const mazeLayout = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W........W...........W",
    "W.WWWWW..W..WWWWWWWW.W",
    "W.W....W.....W....W..W",
    "W.WWW.WW.WWWW.W.WWW.WW",
    "W....W.......W.W.....W",
    "W.WWWWWWW.WWWWWWWWW..W",
    "W.W..............W..WW",
    "W.W.WWWWWWWWWW.WWW...W",
    "W.W......W....W..W.W.W",
    "W.WWWWW..W..WWWWWW.W.W",
    "W........W........W..W",
    "WWWWWWWWWWWWWWWWWWWWWW",
  ];

  useEffect(() => {
    setMazeWalls(generateMazeWalls(mazeLayout));
    // Add dots for collectibles
    const dotsSet = new Set<string>();
    mazeLayout.forEach((row, y) => {
      row.split("").forEach((cell, x) => {
        if (cell === ".") {
          dotsSet.add(`${x},${y}`);
        }
      });
    });
    setDots(dotsSet);
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    let newPlayerPosition = playerPosition;
    switch (event.key) {
      case "ArrowUp":
        newPlayerPosition = movePlayer("up", playerPosition, mazeWalls);
        break;
      case "ArrowDown":
        newPlayerPosition = movePlayer("down", playerPosition, mazeWalls);
        break;
      case "ArrowLeft":
        newPlayerPosition = movePlayer("left", playerPosition, mazeWalls);
        break;
      case "ArrowRight":
        newPlayerPosition = movePlayer("right", playerPosition, mazeWalls);
        break;
    }
    setPlayerPosition(newPlayerPosition);

    // Collect dots
    const playerPositionKey = `${newPlayerPosition.x},${newPlayerPosition.y}`;
    if (dots.has(playerPositionKey)) {
      dots.delete(playerPositionKey); // Remove dot after collection
      setDots(new Set(dots)); // Update dots state
    }
  };

  useEffect(() => {
    if (gameState === "active") {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [playerPosition, gameState]);

  // Move enemies randomly every second
  useEffect(() => {
    if (gameState === "active") {
      const enemyMovementInterval = setInterval(() => {
        setEnemies((currentEnemies) =>
          currentEnemies.map((enemy) => moveEnemy(enemy, mazeWalls))
        );
      }, 1000); // Move enemies every 1 second

      return () => clearInterval(enemyMovementInterval);
    }
  }, [gameState, mazeWalls]);

  const startGame = () => {
    setGameState("active");
    setPlayerPosition({ x: 10, y: 6 });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Maze</h2>
      <div className="relative w-[640px] h-[640px] border-4 border-black">
        {mazeLayout.map((row, y) => (
          <div key={y} className="flex">
            {row.split("").map((cell, x) => {
              const playerHere =
                playerPosition.x === x && playerPosition.y === y;
              const enemyHere = enemies.some(
                (enemy) => enemy.x === x && enemy.y === y
              );
              const dotHere = dots.has(`${x},${y}`);

              return (
                <div
                  key={x}
                  className={`flex justify-center items-center w-8 h-8 ${
                    cell === "W"
                      ? "bg-blue-500 rounded-lg border-2 border-blue-800"
                      : "bg-black"
                  }`}
                  style={{
                    position: "relative",
                  }}
                >
                  {dotHere && !enemyHere && !playerHere && (
                    <div className="absolute z-10 w-2 h-2 bg-white rounded-full"></div> // Dot (if no enemy or player is here)
                  )}

                  {playerHere && !enemyHere && (
                    <div className="absolute z-20 w-6 h-6 bg-yellow-500 rounded-full"></div> // Pacman-like player
                  )}

                  {enemyHere && (
                    <div className="absolute z-30 w-6 h-6 bg-red-500 rounded-full"></div> // Simple ghost enemies
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {gameState === "ready" && (
        <Button onClick={startGame} className="mt-4">
          Start Game
        </Button>
      )}
    </div>
  );
};

export default MazeRunner;
