// import { Cannonball, Ship } from "./types";
// import {
//   GRID_SIZE,
//   SHIP_LENGTH,
//   SHIP_WIDTH,
//   COOLDOWN_DURATION,
//   TOTAL_TURN_STEPS,
// } from "./utils";

// const directionOrder = ["up", "right", "down", "left"];

// const getShipBoundingBox = (ship: Ship) => {
//   const shipLength = SHIP_LENGTH;
//   const shipWidth = SHIP_WIDTH;

//   let x = ship.x;
//   let y = ship.y;
//   let width = shipWidth;
//   let height = shipLength;

//   if (ship.direction === "left" || ship.direction === "right") {
//     // Swap width and height for horizontal ships
//     width = shipLength;
//     height = shipWidth;
//   }

//   // Adjust x and y based on the ship's direction
//   if (ship.direction === "up") {
//     y = ship.y - (shipLength - 1);
//   } else if (ship.direction === "left") {
//     x = ship.x - (shipLength - 1);
//   }

//   return { x, y, width, height };
// };

// export const checkShipCollision = (shipA: Ship, shipB: Ship): boolean => {
//   const rectA = getShipBoundingBox(shipA);
//   const rectB = getShipBoundingBox(shipB);

//   return (
//     rectA.x < rectB.x + rectB.width &&
//     rectA.x + rectA.width > rectB.x &&
//     rectA.y < rectB.y + rectB.height &&
//     rectA.y + rectA.height > rectB.y
//   );
// };

// // export const applyMovement = (
// //   ship: Ship,
// //   dx: number,
// //   dy: number,
// //   otherShips: Ship[]
// // ): Ship => {
// //   let newShip = { ...ship };

// //   // Calculate proposed new position
// //   let newX = newShip.x + dx;
// //   let newY = newShip.y + dy;

// //   // Enforce grid boundaries
// //   const adjustedPosition = enforceBoundaries(newShip, newX, newY);
// //   newX = adjustedPosition.x;
// //   newY = adjustedPosition.y;

// //   // Create a hypothetical ship at the new position
// //   const hypotheticalShip = { ...newShip, x: newX, y: newY };

// //   // Check for collisions with other ships
// //   for (let otherShip of otherShips) {
// //     if (checkShipCollision(hypotheticalShip, otherShip)) {
// //       console.log("collision");
// //       // Collision detected, do not move
// //       return newShip; // Return ship without updating position
// //     }
// //   }

// //   // No collision detected, update ship's position
// //   newShip.x = newX;
// //   newShip.y = newY;

// //   return newShip;
// // };

// const enforceBoundaries = (ship: Ship, newX: number, newY: number): Ship => {
//   const shipLength = SHIP_LENGTH;
//   const shipWidth = SHIP_WIDTH;

//   let maxX = GRID_SIZE - 1;
//   let maxY = GRID_SIZE - 1;
//   let minX = 0;
//   let minY = 0;

//   // Adjust boundaries based on ship orientation
//   if (ship.direction === "up") {
//     minY = 0 + (shipLength - 1);
//     if (newY - (shipLength - 1) < 0) {
//       newY = ship.y; // Prevent moving beyond the top boundary
//     }
//   } else if (ship.direction === "down") {
//     maxY = GRID_SIZE - shipLength;
//     if (newY > maxY) {
//       newY = ship.y; // Prevent moving beyond the bottom boundary
//     }
//   } else if (ship.direction === "left") {
//     minX = 0 + (shipLength - 1);
//     if (newX - (shipLength - 1) < 0) {
//       newX = ship.x; // Prevent moving beyond the left boundary
//     }
//   } else if (ship.direction === "right") {
//     maxX = GRID_SIZE - shipLength;
//     if (newX > maxX) {
//       newX = ship.x; // Prevent moving beyond the right boundary
//     }
//   }

//   return { ...ship, x: newX, y: newY };
// };

// export const updateShipMovement = (
//   ship: Ship,
//   keys: { [key: string]: boolean },
//   controlKeys: { [key: string]: string }
// ): Ship => {
//   let newShip = { ...ship };

//   if (newShip.turnCooldown > 0) {
//     newShip.turnCooldown -= 1; // Adjust based on your game loop timing
//   }

//   // Handle slowing down due to damage
//   if (newShip.slowedSteps > 0) {
//     newShip.slowedSteps -= 1;
//   }

//   let speed = newShip.slowedSteps > 0 ? 0.5 : newShip.speed;
//   let dx = 0;
//   let dy = 0;

//   // Move forward even while turning
//   if (newShip.direction === "up") {
//     dy = -speed;
//   } else if (newShip.direction === "down") {
//     dy = speed;
//   } else if (newShip.direction === "left") {
//     dx = -speed;
//   } else if (newShip.direction === "right") {
//     dx = speed;
//   }

//   if (!newShip.turning && newShip.turnCooldown <= 0) {
//     let attemptedTurn: "left" | "right" | undefined;
//     if (keys[controlKeys.left]) {
//       attemptedTurn = "left";
//     } else if (keys[controlKeys.right]) {
//       attemptedTurn = "right";
//     }

//     if (attemptedTurn) {
//       newShip.turning = true;
//       newShip.turningSteps = 3; // Adjust as needed
//       newShip.newDirection = getNewDirection(newShip.direction, attemptedTurn);

//       // Update rotationAngle cumulatively
//       if (attemptedTurn === "left") {
//         newShip.rotationAngle -= 90;
//       } else if (attemptedTurn === "right") {
//         newShip.rotationAngle += 90;
//       }
//     }
//   }

//   // Handle turning steps
//   // if (newShip.turning) {
//   //   newShip.turningSteps -= 1;
//   //   if (newShip.turningSteps <= 0) {
//   //     newShip.turning = false;
//   //     if (newShip.newDirection) {
//   //       newShip.direction = newShip.newDirection;
//   //       newShip.newDirection = undefined;
//   //       newShip.turnCooldown = COOLDOWN_DURATION; // Set cooldown after turning
//   //     }
//   //   }
//   // }

//   if (newShip.turning) {
//     const rotationPerStep = 90 / TOTAL_TURN_STEPS;
//     if (newShip.newDirection === "left") {
//       newShip.rotationAngle -= rotationPerStep;
//     } else {
//       newShip.rotationAngle += rotationPerStep;
//     }
//     newShip.turningSteps -= 1;

//     if (newShip.turningSteps <= 0) {
//       newShip.turning = false;
//       if (newShip.newDirection) {
//         newShip.direction = newShip.newDirection;
//         newShip.newDirection = undefined;
//         newShip.turnCooldown = COOLDOWN_DURATION; // Optional cooldown after turn
//       }
//     }
//   }

//   // Change direction based on input
//   // if (!newShip.turning) {
//   //   let attemptedTurn: "left" | "right" | undefined;
//   //   if (keys[controlKeys.left]) {
//   //     attemptedTurn = "left";
//   //   } else if (keys[controlKeys.right]) {
//   //     attemptedTurn = "right";
//   //   }

//   //   if (attemptedTurn) {
//   //     newShip.turning = true;
//   //     newShip.turningSteps = 3; // Adjust as needed
//   //     newShip.newDirection = getNewDirection(newShip.direction, attemptedTurn);

//   //     // Update rotationAngle cumulatively
//   //     if (attemptedTurn === "left") {
//   //       newShip.rotationAngle -= 90;
//   //     } else if (attemptedTurn === "right") {
//   //       newShip.rotationAngle += 90;
//   //     }
//   //   }
//   // } else {
//   //   // Continue turning
//   //   newShip.turningSteps -= 1;
//   //   if (newShip.turningSteps <= 0) {
//   //     newShip.turning = false;
//   //     if (newShip.newDirection) {
//   //       newShip.direction = newShip.newDirection;
//   //       newShip.newDirection = undefined;
//   //     }
//   //   }
//   // }

//   // Calculate proposed new position
//   const newX = newShip.x + dx;
//   const newY = newShip.y + dy;

//   // Enforce boundaries
//   const adjustedPosition = enforceBoundaries(newShip, newX, newY);
//   newShip.x = adjustedPosition.x;
//   newShip.y = adjustedPosition.y;

//   return newShip;
// };

// const getNewDirection = (
//   currentDirection: "up" | "down" | "left" | "right",
//   turn: "left" | "right"
// ): "up" | "down" | "left" | "right" => {
//   const index = directionOrder.indexOf(currentDirection);
//   let newIndex = turn === "left" ? index - 1 : index + 1;
//   if (newIndex < 0) newIndex = directionOrder.length - 1;
//   if (newIndex >= directionOrder.length) newIndex = 0;
//   return directionOrder[newIndex] as "up" | "down" | "left" | "right";
// };

// export const fireCannon = (ship: Ship): Cannonball => {
//   const shipLength = SHIP_LENGTH;
//   const shipWidth = SHIP_WIDTH;
//   const cannonball: Cannonball = {
//     x: ship.x,
//     y: ship.y,
//     dx: 0,
//     dy: 0,
//   };

//   if (ship.direction === "up" || ship.direction === "down") {
//     cannonball.x = ship.cannonSide === "left" ? ship.x - 1 : ship.x + shipWidth;
//     cannonball.y =
//       ship.direction === "up"
//         ? ship.y - shipLength + 1
//         : ship.y + shipLength - 1;
//     cannonball.dy = ship.direction === "up" ? -1 : 1;
//   } else {
//     cannonball.y = ship.cannonSide === "left" ? ship.y + shipWidth : ship.y - 1;
//     cannonball.x =
//       ship.direction === "left"
//         ? ship.x - shipLength + 1
//         : ship.x + shipLength - 1;
//     cannonball.dx = ship.direction === "left" ? -1 : 1;
//   }

//   return cannonball;
// };
