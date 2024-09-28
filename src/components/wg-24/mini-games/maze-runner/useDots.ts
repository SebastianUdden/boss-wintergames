import { useState, useEffect } from "react";

export const useDots = (layout: string[]) => {
  const [dots, setDots] = useState<Set<string>>(new Set());
  const [points, setPoints] = useState(0); // Track points

  useEffect(() => {
    const dotsSet = new Set<string>();
    layout.forEach((row, y) => {
      row.split("").forEach((cell, x) => {
        if (cell === ".") {
          dotsSet.add(`${x},${y}`);
        }
      });
    });
    setDots(dotsSet);
    setPoints(0); // Reset points when the layout changes
  }, [layout]); // Reset dots and points whenever layout changes

  const collectDot = (playerPosition: { x: number; y: number }) => {
    const positionKey = `${playerPosition.x},${playerPosition.y}`;
    setDots((prevDots) => {
      if (prevDots.has(positionKey)) {
        const newDots = new Set(prevDots);
        newDots.delete(positionKey);
        setPoints((prevPoints) => prevPoints + 1); // Increment points when a dot is collected
        return newDots;
      }
      return prevDots;
    });
  };

  return { dots, collectDot, points };
};
