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

// Helper function to check if there's a direct line of sight between the enemy and the player
const hasLineOfSight = (
  enemyPos: { x: number; y: number },
  playerPos: { x: number; y: number },
  walls: Set<string>
): boolean => {
  // Check if they are on the same x axis (vertical line of sight)
  if (enemyPos.x === playerPos.x) {
    const [minY, maxY] = [
      Math.min(enemyPos.y, playerPos.y),
      Math.max(enemyPos.y, playerPos.y),
    ];
    // Check if there are any walls between them on the y axis
    for (let y = minY + 1; y < maxY; y++) {
      if (walls.has(`${enemyPos.x},${y}`)) {
        return false; // Wall in the way, no line of sight
      }
    }
    return true; // No walls in the way, enemy has line of sight
  }

  // Check if they are on the same y axis (horizontal line of sight)
  if (enemyPos.y === playerPos.y) {
    const [minX, maxX] = [
      Math.min(enemyPos.x, playerPos.x),
      Math.max(enemyPos.x, playerPos.x),
    ];
    // Check if there are any walls between them on the x axis
    for (let x = minX + 1; x < maxX; x++) {
      if (walls.has(`${x},${enemyPos.y}`)) {
        return false; // Wall in the way, no line of sight
      }
    }
    return true; // No walls in the way, enemy has line of sight
  }

  return false; // Not on the same axis
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

// Improved utility to move enemies with line of sight toward the player
export const moveEnemy = (
  enemy: Enemy,
  playerPosition: { x: number; y: number },
  walls: Set<string>
): Enemy => {
  const { x, y, previousDirection, previousPositions } = enemy;
  let newPosition = { x, y };

  // Check if the enemy has a direct line of sight with the player
  const inLineOfSight = hasLineOfSight({ x, y }, playerPosition, walls);

  if (inLineOfSight) {
    // Move toward the player if they are in line of sight
    if (x < playerPosition.x) {
      newPosition = moveInDirection("right", { x, y }, walls);
    } else if (x > playerPosition.x) {
      newPosition = moveInDirection("left", { x, y }, walls);
    } else if (y < playerPosition.y) {
      newPosition = moveInDirection("down", { x, y }, walls);
    } else if (y > playerPosition.y) {
      newPosition = moveInDirection("up", { x, y }, walls);
    }

    return updateEnemyPosition(
      newPosition,
      previousDirection,
      previousPositions
    );
  }

  // If no line of sight, continue with normal behavior
  const continueInSameDirection = Math.random() < 0.7;
  if (continueInSameDirection) {
    newPosition = moveInDirection(previousDirection, { x, y }, walls);
    if (
      newPosition.x !== x ||
      newPosition.y !== y ||
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

  // Get possible valid directions if no line of sight or same direction is not possible
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
