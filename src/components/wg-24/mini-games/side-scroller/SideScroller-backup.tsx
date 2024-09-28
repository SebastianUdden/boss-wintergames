import React, { useRef, useEffect } from "react";

// Sprite paths
const spritePaths = {
  idle: "/games/sprites/player/idle.png",
  run: "/games/sprites/player/run.png",
  jump: "/games/sprites/player/jump.png",
  fall: "/games/sprites/player/fall.png",
  attack: "/games/sprites/player/attack.png",
  // Add other actions if available
};

// Environment paths
const environmentPaths = {
  sky: "/environments/sky.png",
  clouds: "/environments/clouds.png",
  sea: "/environments/sea.png",
  farGround: "/environments/far-grounds.png",
  tileset: "/environments/tileset.png",
};

const LEVEL = [
  "................",
  "................",
  "................",
  "................",
  "xxxxxxxxxxxxxxxx",
];

export const SideScroller: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let jumpKeyPressed = false;

  useEffect(() => {
    // Setup canvas
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;

    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 400;

    // Define tile size based on map dimensions
    const map = LEVEL;

    const numRows = map.length;
    const numCols = map[0].length;

    const tileSize = {
      width: canvas.width / numCols,
      height: canvas.height / numRows,
    };

    // Convert the map to level data
    const levelData = convertMapToLevelData(map, tileSize);

    // Define SPEED constant
    const SPEED = 0.7; // Adjust this value to change the game speed (e.g., 0.5 for slower, 1 for normal, 2 for faster)

    // Base values for game physics and animation
    const basePlayerSpeed = 5; // Base horizontal movement speed
    const baseGravity = 0.2; // Base gravity
    const baseJumpVelocity = -8; // Base jump velocity
    const baseFramesPerSprite = 8; // Base frames per sprite for animations

    // Adjusted values based on SPEED
    const playerSpeed = basePlayerSpeed * SPEED;
    const gravity = baseGravity * SPEED;
    const jumpVelocity = baseJumpVelocity * SPEED;
    const framesPerSprite = baseFramesPerSprite / SPEED; // Inverse to make animations slower when SPEED is lower

    // Load sprite sheets
    const spriteSheets: Record<string, HTMLImageElement> = {};
    const backgroundImages: Record<string, HTMLImageElement> = {};

    const actions = ["idle", "run", "jump", "fall", "attack"];
    const environmentKeys = Object.keys(environmentPaths);

    let imagesLoaded = 0;
    const imagesToLoad = actions.length + environmentKeys.length;

    const loadImage = (path: string, key: string, isSprite = false) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        if (isSprite) {
          spriteSheets[key] = img;
        } else {
          backgroundImages[key] = img;
        }
        imagesLoaded++;
        if (imagesLoaded === imagesToLoad) {
          gameLoop();
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${img.src}`);
      };
    };

    // Load environment images
    environmentKeys.forEach((key) => {
      loadImage(environmentPaths[key], key);
    });

    // Load sprite sheets
    actions.forEach((action) => {
      loadImage(spritePaths[action], action, true);
    });

    //   const img = new Image();
    //   img.src = spritePaths[action];
    //   spriteSheets[action] = img;
    //   img.onload = () => {
    //     imagesLoaded++;
    //     if (imagesLoaded === imagesToLoad) {
    //       // All images are loaded, start the game
    //       gameLoop();
    //     }
    //   };
    //   img.onerror = () => {
    //     console.error(`Failed to load image: ${img.src}`);
    //   };
    // });

    // Player properties
    const player = {
      x: 50,
      y: canvas.height - tileSize.height - 150,
      width: 50,
      height: 50,
      speed: playerSpeed,
      velocityX: 0,
      velocityY: 0,
      jumping: false,
      action: "idle", // Current action
      frameIndex: 0, // Current frame in the animation
      frameCount: 0, // Counter for frame rate control
      framesPerSprite: framesPerSprite, // Adjusted animation speed
      facingRight: true, // For sprite mirroring
      isAttacking: false,
    };

    // Sprite configuration
    const spriteConfig: Record<
      string,
      { frameWidth: number; frameHeight: number; totalFrames: number }
    > = {
      idle: { frameWidth: 128, frameHeight: 96, totalFrames: 4 },
      run: { frameWidth: 128, frameHeight: 96, totalFrames: 8 },
      jump: { frameWidth: 128, frameHeight: 96, totalFrames: 3 },
      fall: { frameWidth: 128, frameHeight: 96, totalFrames: 2 },
      attack: { frameWidth: 128, frameHeight: 96, totalFrames: 8 },
      // Add other actions with their frame configurations
    };

    // Key press state
    const keys: Record<string, boolean> = {};

    // Event listeners for key presses
    const keyDownHandler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keys[key] = true;

      // Detect jump key press
      if ((key === "w" || key === "arrowup") && !jumpKeyPressed) {
        jumpKeyPressed = true;
        if (!player.jumping) {
          player.velocityY = jumpVelocity;
          player.jumping = true;
        }
      }
    };

    const keyUpHandler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keys[key] = false;

      // Reset jump key pressed state when the key is released
      if (key === "w" || key === "arrowup") {
        jumpKeyPressed = false;
      }
    };

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    // Camera for scrolling
    let cameraX = 0;

    // Game loop
    const gameLoop = () => {
      // Handle input
      if (!player.isAttacking) {
        if (keys["a"] || keys["arrowleft"]) {
          player.velocityX = -player.speed;
          player.facingRight = false;
        } else if (keys["d"] || keys["arrowright"]) {
          player.velocityX = player.speed;
          player.facingRight = true;
        } else {
          player.velocityX = 0;
        }
      } else {
        player.velocityX = 0;
      }

      if (keys[" "] || (keys["space"] && !player.isAttacking)) {
        // Player attacks
        player.action = "attack";
        player.frameIndex = 0; // Reset animation
        player.isAttacking = true;
      }

      // Apply physics
      player.velocityY += gravity;
      player.x += player.velocityX;
      player.y += player.velocityY;

      // Horizontal collision with obstacles (excluding ground blocks)
      for (const obstacle of levelData.obstacles) {
        if (
          player.x + player.width > obstacle.x &&
          player.x < obstacle.x + obstacle.width &&
          player.y + player.height > obstacle.y &&
          player.y < obstacle.y + obstacle.height
        ) {
          if (player.velocityX > 0) {
            // Moving right
            player.x = obstacle.x - player.width;
          } else if (player.velocityX < 0) {
            // Moving left
            player.x = obstacle.x + obstacle.width;
          }
          player.velocityX = 0;
        }
      }

      // Vertical collision with platforms (one-way platforms)
      let onPlatform = false;
      for (const platform of levelData.platforms) {
        if (
          player.velocityY > 0 && // Only check when falling down
          player.x + player.width > platform.x &&
          player.x < platform.x + platform.width &&
          player.y + player.height > platform.y &&
          player.y + player.height <= platform.y + platform.height
        ) {
          // Player lands on a platform
          player.y = platform.y - player.height;
          player.velocityY = 0;
          player.jumping = false;
          onPlatform = true;
          break;
        }
      }

      // Vertical collision with ground blocks
      for (const ground of levelData.groundBlocks) {
        if (
          player.x + player.width > ground.x &&
          player.x < ground.x + ground.width &&
          player.y + player.height > ground.y &&
          player.y < ground.y + ground.height
        ) {
          if (player.velocityY > 0) {
            // Falling down onto ground block
            player.y = ground.y - player.height;
            player.velocityY = 0;
            player.jumping = false;
          } else if (player.velocityY < 0) {
            // Hitting head on ground block (if necessary)
            player.y = ground.y + ground.height;
            player.velocityY = 0;
          }
        }
      }

      // Pit detection
      let overPit = false;
      for (const pit of levelData.pits) {
        if (
          player.x + player.width > pit.x &&
          player.x < pit.x + pit.width &&
          player.y + player.height >= canvas.height - tileSize.height
        ) {
          overPit = true;
          break;
        }
      }

      if (overPit) {
        // Player falls into the pit
        player.jumping = true;
      }

      // Ground collision (if necessary)
      if (
        player.y + player.height >= canvas.height - tileSize.height &&
        !onPlatform &&
        !overPit
      ) {
        player.y = canvas.height - tileSize.height - player.height;
        player.velocityY = 0;
        player.jumping = false;
      }

      // Prevent player from moving outside the game area
      if (player.x < 0) player.x = 0;

      // Determine player action
      if (player.action !== "attack") {
        if (player.velocityY < 0) {
          player.action = "jump";
        } else if (player.velocityY > 0 && !player.jumping) {
          player.action = "fall";
        } else if (player.velocityX !== 0) {
          player.action = "run";
        } else {
          player.action = "idle";
        }
      }

      // Update animation frame
      player.frameCount++;
      if (player.frameCount >= player.framesPerSprite) {
        player.frameCount = 0;
        player.frameIndex++;
        const totalFrames = spriteConfig[player.action].totalFrames;
        if (player.frameIndex >= totalFrames) {
          player.frameIndex = 0;
          if (player.action === "attack") {
            // Return to idle after attack animation
            player.action = "idle";
            player.isAttacking = false;
          }
        }
      }

      // Update player dimensions based on current action's frame size
      const currentSpriteConfig = spriteConfig[player.action];
      player.width = currentSpriteConfig.frameWidth;
      player.height = currentSpriteConfig.frameHeight;

      // Update camera position
      cameraX = player.x - canvas.width / 2 + player.width / 2;
      if (cameraX < 0) cameraX = 0;

      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background layers with parallax effect
      context.drawImage(
        backgroundImages.sky,
        0,
        0,
        canvas.width,
        canvas.height
      );

      context.drawImage(
        backgroundImages.clouds,
        -cameraX * 0.2, // Parallax factor
        0,
        canvas.width / 2,
        canvas.height / 2
      );

      context.drawImage(
        backgroundImages.sea,
        -cameraX * 0.4, // Parallax factor
        0,
        canvas.width / 4,
        canvas.height / 4
      );

      context.drawImage(
        backgroundImages.farGround,
        -cameraX * 0.6, // Parallax factor
        0,
        canvas.width / 2,
        canvas.height / 2
      );

      // // Draw background
      // context.fillStyle = "#87CEEB"; // Sky blue
      // context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw tiles based on the map
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          const char = map[row][col];
          const x = col * tileSize.width - cameraX;
          const y = row * tileSize.height;

          if (char === "x") {
            // Ground block
            context.fillStyle = "#228B22"; // Ground green
            context.fillRect(x, y, tileSize.width, tileSize.height);
          } else if (char === "o") {
            // Platform
            context.fillStyle = "#8B4513"; // Brown
            context.fillRect(x, y, tileSize.width, tileSize.height);
          } else if (char === "_") {
            // Pit
            context.fillStyle = "#000000"; // Black
            context.fillRect(x, y, tileSize.width, tileSize.height);
          }
        }
      }

      // Draw player with animation

      // Save the current context state
      context.save();

      // Check the facing direction
      if (player.facingRight) {
        // No need to flip, translate normally
        context.translate(player.x - cameraX, player.y);
      } else {
        // Flip the context horizontally around the player's position
        context.translate(player.x - cameraX + player.width, player.y);
        context.scale(-1, 1);
      }

      // Draw the image at the translated origin (0, 0)
      context.drawImage(
        spriteSheets[player.action],
        player.frameIndex * currentSpriteConfig.frameWidth, // Source X
        0, // Source Y
        currentSpriteConfig.frameWidth, // Source Width
        currentSpriteConfig.frameHeight, // Source Height
        0, // Destination X
        0, // Destination Y
        player.width,
        player.height
      );

      // Restore the context to its original state
      context.restore();

      requestAnimationFrame(gameLoop);
    };

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
    </div>
  );
};

export default SideScroller;

// Converter Function
const convertMapToLevelData = (
  map: string[],
  tileSize: { width: number; height: number }
) => {
  const platforms: any[] = [];
  const groundBlocks: any[] = []; // Separate array for ground blocks
  const obstacles: any[] = []; // Obstacles like walls
  const pits: any[] = [];

  const numRows = map.length;
  const numCols = map[0].length;

  for (let row = 0; row < numRows; row++) {
    const line = map[row];
    for (let col = 0; col < numCols; col++) {
      const char = line[col];
      const x = col * tileSize.width;
      const y = row * tileSize.height;

      if (char === "o") {
        // Platform
        platforms.push({
          x: x,
          y: y,
          width: tileSize.width,
          height: tileSize.height,
        });
      } else if (char === "x") {
        // Ground block
        groundBlocks.push({
          x: x,
          y: y,
          width: tileSize.width,
          height: tileSize.height,
        });
      } else if (char === "_") {
        // Pit
        pits.push({
          x: x,
          width: tileSize.width,
        });
      }
    }
  }

  return { platforms, groundBlocks, obstacles, pits };
};
