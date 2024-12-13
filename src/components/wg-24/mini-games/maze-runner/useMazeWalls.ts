import { useMemo } from "react";

// Custom hook to generate maze walls and return the player's starting position based on the layout
export const useMazeWalls = (layout: string[]) => {
  const { walls, p1Start, p2Start } = useMemo(() => {
    const generatedWalls = new Set<string>();
    let playerStartPosition: { x: number; y: number } | null = { x: 0, y: 0 };
    let player2StartPosition: { x: number; y: number } | null = { x: 0, y: 0 };

    layout.forEach((row, y) => {
      row.split("").forEach((cell, x) => {
        if (cell === "W") {
          generatedWalls.add(`${x},${y}`);
        } else if (cell === "X") {
          // Set the player's start position when "X" is found
          playerStartPosition = { x, y };
        } else if (cell === "Y") {
          player2StartPosition = { x, y };
        }
      });
    });

    return {
      walls: generatedWalls,
      p1Start: playerStartPosition,
      p2Start: player2StartPosition,
    };
  }, [layout]); // This will only recalculate if `layout` changes

  return { walls, p1Start, p2Start };
};
