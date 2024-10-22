export const GAME_INTERVAL = 60;
export const GRID_WIDTH = 150;
export const GRID_HEIGHT = 80;
export const CELL_SIZE = 5;
export const SHIP_LENGTH = CELL_SIZE * 4;
export const SHIP_WIDTH = CELL_SIZE * 2;
export const SHIP_HEALTH = 5;

// Rotation-related constants
export const COOLDOWN_DURATION = GAME_INTERVAL / 3; // Adjust as needed
// Rotation-related constants
export const ROTATION_SPEED_FACTOR = 0.25; // Make this smaller for slower turns
export const TURNING_STEPS = 7;
export const TOTAL_TURN_STEPS = Math.round(
  GAME_INTERVAL * ROTATION_SPEED_FACTOR
); // Increased number of steps
export const TURN_DURATION_MS = TOTAL_TURN_STEPS * GAME_INTERVAL; // Longer transition for slower turning

// Movement speed constants
export const MOVEMENT_SPEED_FACTOR = 2; // Slower movement during turning, adjust between 0 and 1
