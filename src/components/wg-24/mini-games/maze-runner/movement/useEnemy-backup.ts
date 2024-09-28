import {
  Direction,
  getPossibleDirections,
  moveInDirection,
} from "./useMovement"; // Reuse the movement logic

const ENEMY_MEMORY = 20;

export interface Enemy {
  x: number;
  y: number;
  previousDirection: Direction;
  previousPositions: Array<{ x: number; y: number }>;
}

// Utility to randomly pick a new direction
export const getRandomDirection = (): Direction => {
  const randomIndex = Math.floor(Math.random() * 4); // 4 directions
  return ["up", "down", "left", "right"][randomIndex] as Direction;
};

// Helper function to update the enemy's position and maintain the history of previous positions
export const updateEnemyPosition = (
  newPosition: { x: number; y: number },
  newDirection: Direction,
  previousPositions: Array<{ x: number; y: number }>
): Enemy => {
  // Update the previous positions, keeping the array size within a limit (e.g., 20)
  const updatedPreviousPositions = [...previousPositions, newPosition].slice(
    -ENEMY_MEMORY
  );

  return {
    x: newPosition.x,
    y: newPosition.y,
    previousDirection: newDirection,
    previousPositions: updatedPreviousPositions,
  };
};

// Utility to check if the enemy is in a corridor
const isInCorridor = (
  position: { x: number; y: number },
  walls: Set<string>
): boolean => {
  const leftBlocked = walls.has(`${position.x - 1},${position.y}`);
  const rightBlocked = walls.has(`${position.x + 1},${position.y}`);
  const upBlocked = walls.has(`${position.x},${position.y - 1}`);
  const downBlocked = walls.has(`${position.x},${position.y + 1}`);

  // In a corridor if movement is restricted to only one axis (i.e., left/right or up/down)
  const horizontalCorridor = leftBlocked && rightBlocked; // Blocked on both sides horizontally
  const verticalCorridor = upBlocked && downBlocked; // Blocked on both sides vertically

  return horizontalCorridor || verticalCorridor;
};

// Improved utility to move enemies with preference to continue in the same direction in corridors
export const moveEnemy = (enemy: Enemy, walls: Set<string>): Enemy => {
  const { x, y, previousDirection, previousPositions } = enemy;
  let newPosition = { x, y };

  // Check if the enemy is in a corridor
  const inCorridor = isInCorridor({ x, y }, walls);

  // Higher probability to continue in the same direction if in a corridor
  const continueInSameDirection = inCorridor
    ? Math.random() < 0.99 // 90% chance to continue in the same direction in corridors
    : Math.random() < 0.7; // Default 70% chance otherwise

  // Try moving in the same direction, if not blocked or a previous position
  if (continueInSameDirection) {
    newPosition = moveInDirection(previousDirection, { x, y }, walls);
    if (newPosition.x !== x || newPosition.y !== y) {
      if (
        !previousPositions.some(
          (pos) => pos.x === newPosition.x && pos.y === newPosition.y
        )
      ) {
        return updateEnemyPosition(
          newPosition,
          previousDirection,
          previousPositions
        );
      }
    }
  }

  // Get possible valid directions
  const possibleDirections = getPossibleDirections({ x, y }, walls);

  // Pick a random valid direction
  if (possibleDirections.length > 0) {
    const randomDirectionIndex = Math.floor(
      Math.random() * possibleDirections.length
    );
    const { direction, position } = possibleDirections[randomDirectionIndex];
    return updateEnemyPosition(position, direction, previousPositions);
  }

  // If no valid move is found, return the original position
  return enemy;
};
