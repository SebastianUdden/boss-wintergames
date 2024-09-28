import { useState } from "react";

// Define direction types and constants
export type Direction = "up" | "down" | "left" | "right";
export const directions: Direction[] = ["up", "down", "left", "right"];

// Utility to check if a position is within walls
const isWall = (
  position: { x: number; y: number },
  walls: Set<string>
): boolean => {
  return walls.has(`${position.x},${position.y}`);
};

const getPossibleNewPosition = (
  direction: Direction,
  position: { x: number; y: number }
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

  return newPosition;
};

// Utility to move in a direction and check for walls
export const moveInDirection = (
  direction: Direction,
  position: { x: number; y: number },
  walls: Set<string>
): { x: number; y: number } => {
  const newPosition = getPossibleNewPosition(direction, position);

  // Prevent movement through walls
  if (isWall(newPosition, walls)) {
    return position; // Return old position if wall encountered
  }

  return newPosition;
};

const checkDirectionIsWall = (
  direction: Direction,
  position: { x: number; y: number },
  walls: Set<string>
) => {
  const newPosition = getPossibleNewPosition(direction, position);

  return isWall(newPosition, walls);
};

// Utility to get possible directions, avoiding walls and optionally avoiding previous positions
export const getPossibleDirections = (
  position: { x: number; y: number },
  walls: Set<string>
) => {
  const possibleDirections: Array<{
    direction: Direction;
    position: { x: number; y: number };
  }> = [];
  directions.forEach((direction) => {
    // Ensure the position isn't a wall
    if (!checkDirectionIsWall(direction, position, walls)) {
      possibleDirections.push({
        direction,
        position: getPossibleNewPosition(direction, position),
      });
    }
  });

  return possibleDirections;
};

// Custom hook for movement
export const useMovement = (
  initialPosition: { x: number; y: number },
  walls: Set<string>
) => {
  const [position, setPosition] = useState(initialPosition);

  // Move the entity (player/enemy) in a given direction
  const move = (direction: Direction) => {
    const newPosition = moveInDirection(direction, position, walls);
    setPosition(newPosition);
    return newPosition;
  };

  // Get possible valid directions
  const possibleDirections = getPossibleDirections(position, walls);

  return { position, move, possibleDirections };
};
