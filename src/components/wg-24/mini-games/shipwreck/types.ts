// src/types.ts

export type GameState = "ready" | "active" | "finished";

export interface IScore {
  score: number;
  player: string;
}

export interface IShipwreckProps {
  players: [string, string, string, string];
  onGameComplete: (playerScores: IScore[]) => void;
}

export interface Ship {
  id: string; // Add this line
  x: number;
  y: number;
  direction: "up" | "down" | "left" | "right";
  newDirection?: "up" | "down" | "left" | "right";
  rotationAngle: number;
  health: number;
  speed: number;
  turning: boolean;
  turnProgress: number;
  turningSteps: number;
  turnCooldown: number;
  slowedSteps: number;
  cannonSide: "left" | "right";
  cannonCharge: number;
  cannonSwitchProgress: number;
  collisionTimer: number;
  isRammer: boolean;
}

export interface Cannonball {
  x: number;
  y: number;
  dx: number;
  dy: number;
}
