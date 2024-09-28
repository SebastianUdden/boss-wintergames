import { useEffect } from "react";
import { useMovement } from "./useMovement"; // Import the shared movement logic

// Custom hook to manage player state and movement
export const usePlayer = (
  initialPosition: { x: number; y: number },
  walls: Set<string>,
  onDotCollect: (newPosition: { x: number; y: number }) => void
) => {
  const { position: playerPosition, move } = useMovement(
    initialPosition,
    walls
  );

  const handleKeyDown = (event: KeyboardEvent) => {
    let newPlayerPosition = playerPosition;

    switch (event.key) {
      case "ArrowUp":
        newPlayerPosition = move("up");
        break;
      case "ArrowDown":
        newPlayerPosition = move("down");
        break;
      case "ArrowLeft":
        newPlayerPosition = move("left");
        break;
      case "ArrowRight":
        newPlayerPosition = move("right");
        break;
    }

    onDotCollect(newPlayerPosition); // Callback to check if a dot was collected
  };

  // Attach keydown listener for player movement
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerPosition, walls]); // Dependency on playerPosition and walls

  return playerPosition;
};
