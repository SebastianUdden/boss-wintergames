import { useEffect } from "react";
import { useMovement } from "./useMovement"; // Import the shared movement logic

// Custom hook to manage player state and movement
export const usePlayer = (
  initialPosition: { x: number; y: number },
  walls: Set<string>,
  onDotCollect: (newPosition: { x: number; y: number }) => void,
  hasWinner: boolean,
  isSecondPlayer = false, // Flag to differentiate players
  reverse = false
) => {
  const { position: playerPosition, move } = useMovement(
    initialPosition,
    walls,
    reverse
  );

  const handleKeyDown = (event: KeyboardEvent) => {
    let newPlayerPosition = playerPosition;

    // Handle movement for both players
    if (!isSecondPlayer) {
      // WASD controls for Player 2
      switch (event.key) {
        case "w":
          newPlayerPosition = move("up");
          break;
        case "s":
          newPlayerPosition = move("down");
          break;
        case "a":
          newPlayerPosition = move("left");
          break;
        case "d":
          newPlayerPosition = move("right");
          break;
      }
    } else {
      // Arrow controls for Player 1
      switch (event.key) {
        case "ArrowUp":
          newPlayerPosition = move("down");
          break;
        case "ArrowDown":
          newPlayerPosition = move("up");
          break;
        case "ArrowLeft":
          newPlayerPosition = move("right");
          break;
        case "ArrowRight":
          newPlayerPosition = move("left");
          break;
      }
    }

    onDotCollect(newPlayerPosition); // Callback to check if a dot was collected
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (hasWinner) {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerPosition, walls, hasWinner]); // Dependency on playerPosition and walls

  return playerPosition;
};
