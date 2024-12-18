import { Cannonball, Ship } from "./types";
import {
  GRID_WIDTH,
  GRID_HEIGHT,
  SHIP_LENGTH,
  SHIP_WIDTH,
  COOLDOWN_DURATION,
  TOTAL_TURN_STEPS,
  CELL_SIZE,
  MOVEMENT_SPEED_FACTOR,
  TURNING_STEPS,
} from "./utils";

const directionOrder = ["up", "right", "down", "left"];

const COLLISION_STOP_DURATION = 300; // 2 seconds at 60 fps
const HEAD_ON_COLLISION_DURATION = 300; // 3 seconds at 60 fps
const COLLISION_INVULNERABLE_DURATION = 300; // 5 seconds at 60 fps

const normalizeAngle = (angle: number): number => {
  // Ensure the angle is always a multiple of 90 (e.g., 0, 90, 180, 270, or 360)
  return Math.round(angle / 90) * 90;
};

const getShipBoundingBox = (ship: Ship) => {
  const shipLength = SHIP_LENGTH;
  const shipWidth = SHIP_WIDTH;

  let x = ship.x;
  let y = ship.y;
  let width = shipWidth;
  let height = shipLength;

  if (ship.direction === "left" || ship.direction === "right") {
    width = shipLength;
    height = shipWidth;
  }

  if (ship.direction === "up") {
    y = ship.y - (shipLength - 1);
  } else if (ship.direction === "left") {
    x = ship.x - (shipLength - 1);
  }

  return { x, y, width, height };
};

export const checkShipCollision = (shipA: Ship, shipB: Ship): boolean => {
  const rectA = getShipBoundingBox(shipA);
  const rectB = getShipBoundingBox(shipB);

  const isCollision =
    rectA.x < rectB.x + rectB.width &&
    rectA.x + rectA.width > rectB.x &&
    rectA.y < rectB.y + rectB.height &&
    rectA.y + rectA.height > rectB.y;

  return isCollision;
};

const enforceShipCollision = (
  ship: Ship,
  newX: number,
  newY: number,
  otherShips: Ship[]
): Ship => {
  const collidedShip = otherShips.find((otherShip) =>
    checkShipCollision({ ...ship, x: newX, y: newY }, otherShip)
  );

  if (collidedShip) {
    console.log(
      `Collision detected between Ship ${ship.id} and Ship ${collidedShip.id}`
    );

    // Check for head-on collision
    const isHeadOn = isHeadOnCollision(ship, collidedShip);

    if (isHeadOn) {
      ship.collisionTimer = HEAD_ON_COLLISION_DURATION;
      ship.isRammer = false; // Both ships are treated equally in a head-on collision
      collidedShip.collisionTimer = HEAD_ON_COLLISION_DURATION;
      collidedShip.isRammer = false;
    } else {
      ship.collisionTimer = COLLISION_STOP_DURATION;
      ship.isRammer = true;
      collidedShip.collisionTimer = COLLISION_STOP_DURATION;
      collidedShip.isRammer = false;
    }

    return { ...ship, x: ship.x, y: ship.y };
  }

  return { ...ship, x: newX, y: newY };
};

const isHeadOnCollision = (shipA: Ship, shipB: Ship): boolean => {
  // Check if ships are facing each other
  return (
    (shipA.direction === "left" &&
      shipB.direction === "right" &&
      shipA.x > shipB.x) ||
    (shipA.direction === "right" &&
      shipB.direction === "left" &&
      shipA.x < shipB.x) ||
    (shipA.direction === "up" &&
      shipB.direction === "down" &&
      shipA.y < shipB.y) ||
    (shipA.direction === "down" &&
      shipB.direction === "up" &&
      shipA.y > shipB.y)
  );
};

const enforceBoundaries = (ship: Ship, newX: number, newY: number): Ship => {
  const shipLength = SHIP_LENGTH;

  let maxX = GRID_WIDTH - CELL_SIZE;
  let maxY = GRID_HEIGHT - CELL_SIZE;
  let minX = 0;
  let minY = 0;

  // Adjust boundaries based on ship orientation
  if (ship.direction === "up") {
    minY = 0 + (shipLength - CELL_SIZE);
    if (newY - (shipLength - CELL_SIZE) < 0) {
      newY = ship.y; // Prevent moving beyond the top boundary
    }
  } else if (ship.direction === "down") {
    maxY = GRID_HEIGHT - shipLength;
    if (newY > maxY) {
      newY = ship.y; // Prevent moving beyond the bottom boundary
    }
  } else if (ship.direction === "left") {
    minX = 0 + (shipLength - CELL_SIZE);
    if (newX - (shipLength - CELL_SIZE) < 0) {
      newX = ship.x; // Prevent moving beyond the left boundary
    }
  } else if (ship.direction === "right") {
    maxX = GRID_WIDTH - shipLength;
    if (newX > maxX) {
      newX = ship.x; // Prevent moving beyond the right boundary
    }
  }

  return { ...ship, x: newX, y: newY };
};

export const updateShipMovement = (
  ship: Ship,
  keys: { [key: string]: boolean },
  controlKeys: { [key: string]: string },
  otherShips: Ship[],
  collideRef: React.MutableRefObject<boolean>
): Ship => {
  let newShip = { ...ship };

  if (ship.collisionTimer > 0) {
    ship.collisionTimer--;
    if (ship.collisionTimer > COLLISION_INVULNERABLE_DURATION) {
      return ship; // Don't allow movement during stop period
    }
  }

  if (newShip.turnCooldown > 0) {
    newShip.turnCooldown -= 1; // Adjust based on your game loop timing
  }

  // Handle slowing down due to damage
  if (newShip.slowedSteps > 0) {
    newShip.slowedSteps -= 1;
  }

  if (keys[controlKeys.switchCannonLeft]) {
    newShip.cannonSide = "left";
  } else if (keys[controlKeys.switchCannonRight]) {
    newShip.cannonSide = "right";
  }

  const speed =
    newShip.slowedSteps > 0
      ? 0.5
      : newShip.turning
      ? newShip.speed * MOVEMENT_SPEED_FACTOR // Slow down during turns
      : newShip.speed;

  let dx = 0;
  let dy = 0;

  if (newShip.turning) {
    // Adjust movement while turning based on the new direction
    const diagonalSpeed = (speed * 0.5) / Math.sqrt(2); // Slower diagonal movement
    const modifier = 2;
    if (newShip.newDirection === "left") {
      dx = -diagonalSpeed / modifier;
      dy = ship.direction === "up" ? -diagonalSpeed : diagonalSpeed;
    } else if (newShip.newDirection === "right") {
      dx = diagonalSpeed / modifier;
      dy = ship.direction === "up" ? -diagonalSpeed : diagonalSpeed;
    } else if (newShip.newDirection === "up") {
      dx = ship.direction === "left" ? -diagonalSpeed : diagonalSpeed;
      dy = -diagonalSpeed / modifier;
    } else if (newShip.newDirection === "down") {
      dx = ship.direction === "left" ? -diagonalSpeed : diagonalSpeed;
      dy = diagonalSpeed / modifier;
    }
  } else {
    // Normal movement when not turning
    if (newShip.direction === "up") {
      dy -= speed; // Move up
    } else if (newShip.direction === "down") {
      dy += speed; // Move down
    } else if (newShip.direction === "left") {
      dx -= speed; // Move left
    } else if (newShip.direction === "right") {
      dx += speed; // Move right
    }
  }

  if (!newShip.turning && newShip.turnCooldown <= 0) {
    let attemptedTurn: "left" | "right" | "up" | "down" | undefined;
    if (keys[controlKeys.left]) {
      attemptedTurn = "left";
    } else if (keys[controlKeys.right]) {
      attemptedTurn = "right";
    } else if (keys[controlKeys.up]) {
      attemptedTurn = "up";
    } else if (keys[controlKeys.down]) {
      attemptedTurn = "down";
    }

    if (attemptedTurn) {
      newShip.turning = true;
      newShip.turningSteps = TURNING_STEPS; // Adjust as needed
      newShip.newDirection = getNewDirection(newShip.direction, attemptedTurn);

      // Update rotationAngle cumulatively
      if (attemptedTurn === "left") {
        newShip.rotationAngle -= 90;
      } else if (attemptedTurn === "right") {
        newShip.rotationAngle += 90;
      } else if (attemptedTurn === "up") {
        newShip.rotationAngle = 0; // Snap to "up" rotation
      } else if (attemptedTurn === "down") {
        newShip.rotationAngle = 180; // Snap to "down" rotation
      }
    }
  }

  if (newShip.turning) {
    const rotationPerStep = 90 / TOTAL_TURN_STEPS;

    if (newShip.newDirection === "left") {
      newShip.rotationAngle -= rotationPerStep;
    } else if (newShip.newDirection === "right") {
      newShip.rotationAngle += rotationPerStep;
    } else if (newShip.newDirection === "up") {
      newShip.rotationAngle -= rotationPerStep; // Ensure it smoothly transitions
    } else if (newShip.newDirection === "down") {
      newShip.rotationAngle += rotationPerStep;
    }
    newShip.turningSteps -= 1;

    if (newShip.turningSteps <= 0) {
      newShip.turning = false;
      if (newShip.newDirection) {
        newShip.direction = newShip.newDirection;
        newShip.rotationAngle = normalizeAngle(newShip.rotationAngle); // Snap to 90-degree intervals
        newShip.newDirection = undefined;
        newShip.turnCooldown = COOLDOWN_DURATION; // Optional cooldown after turn
      }
    }
  }

  // Calculate proposed new position
  const newX = newShip.x + dx;
  const newY = newShip.y + dy;

  // Apply boundary enforcement first
  const adjustedPosition = enforceBoundaries(newShip, newX, newY);

  // Then check for collisions with other ships
  const collidedShip = otherShips.find((otherShip) =>
    checkShipCollision(
      { ...adjustedPosition, x: adjustedPosition.x, y: adjustedPosition.y },
      otherShip
    )
  );

  if (collidedShip) {
    // Collision detected
    collideRef.current = true;

    // Check for head-on collision
    const isHeadOn = isHeadOnCollision(adjustedPosition, collidedShip);

    if (isHeadOn) {
      // Both ships stop for a longer duration
      adjustedPosition.collisionTimer = HEAD_ON_COLLISION_DURATION;
      adjustedPosition.isRammer = false;
      collidedShip.collisionTimer = HEAD_ON_COLLISION_DURATION;
      collidedShip.isRammer = false;
    } else {
      // The moving ship is the rammer
      adjustedPosition.collisionTimer = COLLISION_STOP_DURATION;
      adjustedPosition.isRammer = true;
      collidedShip.collisionTimer = COLLISION_STOP_DURATION;
      collidedShip.isRammer = false;

      // Apply damage to the rammed ship
      collidedShip.health -= 1;
    }

    // Don't update position if there's a collision
    adjustedPosition.x = newShip.x;
    adjustedPosition.y = newShip.y;
  } else {
    collideRef.current = false;
  }

  return adjustedPosition;
};

const getNewDirection = (
  currentDirection: "up" | "down" | "left" | "right",
  turn: "left" | "right"
): "up" | "down" | "left" | "right" => {
  const index = directionOrder.indexOf(currentDirection);
  let newIndex = turn === "left" ? index - 1 : index + 1;
  if (newIndex < 0) newIndex = directionOrder.length - 1;
  if (newIndex >= directionOrder.length) newIndex = 0;
  return directionOrder[newIndex] as "up" | "down" | "left" | "right";
};

export const fireCannon = (ship: Ship): Cannonball => {
  const shipLength = SHIP_LENGTH;
  const shipWidth = SHIP_WIDTH;
  const cannonball: Cannonball = {
    x: ship.x,
    y: ship.y,
    dx: 0,
    dy: 0,
  };

  if (ship.direction === "up" || ship.direction === "down") {
    cannonball.x = ship.cannonSide === "left" ? ship.x - 1 : ship.x + shipWidth;
    cannonball.y =
      ship.direction === "up"
        ? ship.y - shipLength + 1
        : ship.y + shipLength - 1;
    cannonball.dy = ship.direction === "up" ? -1 : 1;
  } else {
    cannonball.y = ship.cannonSide === "left" ? ship.y + shipWidth : ship.y - 1;
    cannonball.x =
      ship.direction === "left"
        ? ship.x - shipLength + 1
        : ship.x + shipLength - 1;
    cannonball.dx = ship.direction === "left" ? -1 : 1;
  }

  return cannonball;
};
