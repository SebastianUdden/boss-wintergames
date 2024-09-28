import { useState, useEffect } from "react";
import { Enemy, moveEnemy } from "./useEnemy"; // Import the individual enemy movement logic

const ENEMY_SPEED = 500;

export const useEnemies = (
  initialEnemies: Enemy[],
  playerPosition: { x: number; y: number },
  walls: Set<string>
) => {
  const [enemies, setEnemies] = useState<Enemy[]>(initialEnemies);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnemies((currentEnemies) =>
        currentEnemies.map((enemy) => moveEnemy(enemy, playerPosition, walls))
      );
    }, ENEMY_SPEED); // Move enemies every second

    return () => clearInterval(interval);
  }, [walls]); // Add playerPosition as a dependency

  return enemies;
};
