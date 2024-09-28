import React, { useRef, useEffect } from "react";
import { initializePlayer, updatePlayer, drawPlayer } from "./player";
import { renderBackground } from "./background";
import { levelData, renderLevel } from "./level";
import { handleInput } from "./input";

const environmentPaths = {
  sky: "/environments/sky.png",
  clouds: "/environments/clouds.png",
  sea: "/environments/sea.png",
  farGround: "/environments/far-grounds.png",
  tileset: "/environments/tileset.png",
};
const backgroundImages: Record<string, HTMLImageElement> = {};

// Load all background images
Object.keys(environmentPaths).forEach((key) => {
  const img = new Image();
  img.src = environmentPaths[key];
  backgroundImages[key] = img;
});

export const TILE_SIZE = 32;
const SPEED = 1;

export const SideScroller: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;

    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 400;

    const player = initializePlayer(canvas, SPEED);

    // Input handling
    handleInput(player, SPEED);

    // Game loop
    // Game loop
    const gameLoop = () => {
      // Update player
      updatePlayer(player, canvas, SPEED);

      // Calculate camera position
      let cameraX = player.x - canvas.width / 2 + player.width / 2;
      let cameraY = player.y - canvas.height / 2 + player.height / 2;

      // Optional: Constrain camera to level boundaries
      const levelWidth = levelData[0].length * TILE_SIZE;
      const levelHeight = levelData.length * TILE_SIZE;

      cameraX = Math.max(0, Math.min(cameraX, levelWidth - canvas.width));
      cameraY = Math.max(0, Math.min(cameraY, levelHeight - canvas.height));

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Render background layers
      renderBackground(context, player, canvas, backgroundImages);

      // Render background tiles
      renderLevel(context, cameraX, cameraY, backgroundImages, "background");

      // Draw player
      drawPlayer(context, player, cameraX, cameraY);

      // Render foreground tiles
      renderLevel(context, cameraX, cameraY, backgroundImages, "foreground");

      // Request next frame
      requestAnimationFrame(gameLoop);
    };

    // Start the game loop
    gameLoop();

    return () => {
      // Cleanup (if necessary)
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
    </div>
  );
};

export default SideScroller;
