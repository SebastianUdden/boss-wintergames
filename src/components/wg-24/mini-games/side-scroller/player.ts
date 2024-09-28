const SPEED = 1;

const spritePaths = {
  idle: "/games/sprites/player/idle.png",
  run: "/games/sprites/player/run.png",
  jump: "/games/sprites/player/jump.png",
  fall: "/games/sprites/player/fall.png",
  attack: "/games/sprites/player/attack.png",
};

const spriteSheets: Record<string, HTMLImageElement> = {};

// Load all the sprites for different player actions
Object.keys(spritePaths).forEach((action) => {
  const img = new Image();
  img.src = spritePaths[action];
  spriteSheets[action] = img;
});

// Sprite configurations for animation frames
const spriteConfig: Record<
  string,
  {
    frameWidth: number;
    frameHeight: number;
    totalFrames: number;
    framesPerSprite: number;
  }
> = {
  idle: {
    frameWidth: 128,
    frameHeight: 96,
    totalFrames: 4,
    framesPerSprite: 24 / SPEED,
  },
  run: {
    frameWidth: 128,
    frameHeight: 96,
    totalFrames: 8,
    framesPerSprite: 12 / SPEED,
  },
  jump: {
    frameWidth: 128,
    frameHeight: 96,
    totalFrames: 3,
    framesPerSprite: 12,
  },
  fall: {
    frameWidth: 128,
    frameHeight: 96,
    totalFrames: 2,
    framesPerSprite: 12,
  },
  attack: {
    frameWidth: 128,
    frameHeight: 96,
    totalFrames: 8,
    framesPerSprite: 8 / SPEED,
  },
};

export const initializePlayer = (canvas: HTMLCanvasElement, speed: number) => {
  return {
    x: 300,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    speed: 1 * speed,
    velocityX: 0,
    velocityY: 0,
    jumping: false,
    action: "idle",
    frameIndex: 0,
    frameCount: 0,
    facingRight: true,
    isAttacking: false,
    gravity: 0.1 / speed,
  };
};

export const updatePlayer = (
  player: any,
  canvas: HTMLCanvasElement,
  speed: number
) => {
  const previousAction = player.action; // Store the previous action for comparison

  // Apply gravity and physics
  player.velocityY += player.gravity * speed;
  player.x += player.velocityX;
  player.y += player.velocityY;

  // Ground collision
  if (player.y + player.height >= canvas.height - 30) {
    player.y = canvas.height - 30 - player.height;
    player.velocityY = 0;
    player.jumping = false; // Player is on the ground, not jumping or falling
  } else {
    player.jumping = true; // Player is in the air (either jumping or falling)
  }

  // Check if player is attacking
  if (player.action === "attack") {
    player.frameCount++;
    if (player.frameCount >= spriteConfig[player.action].framesPerSprite) {
      player.frameCount = 0;
      player.frameIndex++;
      const totalFrames = spriteConfig[player.action].totalFrames;
      if (player.frameIndex >= totalFrames) {
        // Attack animation finished, return to default state
        player.frameIndex = 0;
        player.isAttacking = false;

        // Return to either idle or run, based on velocity
        if (player.velocityX === 0) {
          player.action = "idle";
        } else {
          player.action = "run";
        }
      }
    }
    return; // Early return so we don’t update other animations while attacking
  }

  // Determine player action based on movement (only if not attacking)
  if (player.velocityY < 0) {
    player.action = "jump";
  } else if (player.velocityY > 0 && player.jumping) {
    player.action = "fall";
  } else if (player.velocityX !== 0) {
    player.action = "run";
  } else {
    player.action = "idle";
  }

  // If action changes, reset the frame index to prevent "disappearing"
  if (player.action !== previousAction) {
    player.frameIndex = 0;
    player.frameCount = 0; // Reset the frameCount as well
  }

  // Update animation frame for non-attack states
  player.frameCount++;
  if (player.frameCount >= spriteConfig[player.action].framesPerSprite) {
    player.frameCount = 0;
    player.frameIndex++;
    const totalFrames = spriteConfig[player.action].totalFrames;
    if (player.frameIndex >= totalFrames) {
      player.frameIndex = 0;
    }
  }
};

export const drawPlayer = (
  context: CanvasRenderingContext2D,
  player: any,
  cameraX: number,
  cameraY: number
) => {
  const currentSpriteConfig = spriteConfig[player.action];
  player.width = currentSpriteConfig.frameWidth;
  player.height = currentSpriteConfig.frameHeight;

  // Save the current context state for sprite mirroring
  context.save();

  // Adjust the player's position by the camera's offset
  const adjustedX = player.x - cameraX;
  const adjustedY = player.y - cameraY;

  if (player.facingRight) {
    context.translate(adjustedX, adjustedY);
  } else {
    context.translate(adjustedX + player.width, adjustedY);
    context.scale(-1, 1); // Mirror the sprite if facing left
  }

  // Draw the current sprite frame
  context.drawImage(
    spriteSheets[player.action],
    player.frameIndex * currentSpriteConfig.frameWidth, // Source X (current frame)
    0, // Source Y (all actions in one row)
    currentSpriteConfig.frameWidth,
    currentSpriteConfig.frameHeight,
    0, // Destination X (already translated)
    0, // Destination Y
    player.width,
    player.height
  );

  // Restore the context state after drawing the mirrored sprite
  context.restore();
};
