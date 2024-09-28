import { useMemo } from "react";

// Custom hook to generate maze walls and return the player's starting position based on the layout
export const useMazeWalls = (layout: string[]) => {
  const { walls, startPosition } = useMemo(() => {
    const generatedWalls = new Set<string>();
    let playerStartPosition: { x: number; y: number } | null = { x: 0, y: 0 };

    layout.forEach((row, y) => {
      row.split("").forEach((cell, x) => {
        if (cell === "W") {
          generatedWalls.add(`${x},${y}`);
        } else if (cell === "X") {
          // Set the player's start position when "X" is found
          playerStartPosition = { x, y };
        }
      });
    });

    return { walls: generatedWalls, startPosition: playerStartPosition };
  }, [layout]); // This will only recalculate if `layout` changes

  return { walls, startPosition };
};
