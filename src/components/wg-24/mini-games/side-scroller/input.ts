export const handleInput = (player: any, speed: number) => {
  const keys: Record<string, boolean> = {};

  const keyDownHandler = (e: KeyboardEvent) => {
    keys[e.key.toLowerCase()] = true;

    if (keys["a"] || keys["arrowleft"]) {
      player.velocityX = -player.speed;
      player.facingRight = false;
    } else if (keys["d"] || keys["arrowright"]) {
      player.velocityX = player.speed;
      player.facingRight = true;
    }

    if ((keys["w"] || keys["arrowup"]) && !player.jumping) {
      player.velocityY = -4 * speed;
      player.jumping = true;
    }

    // Trigger attack action when the space bar is pressed
    if (keys[" "] || keys["space"]) {
      if (!player.isAttacking) {
        // Only trigger attack if not already attacking
        player.action = "attack";
        player.frameIndex = 0; // Reset animation frame index
        player.isAttacking = true;
        // player.velocityX = 0; // Optional: stop movement while attacking
      }
    }
  };

  const keyUpHandler = (e: KeyboardEvent) => {
    keys[e.key.toLowerCase()] = false;

    if (!keys["a"] && !keys["d"] && !keys["arrowleft"] && !keys["arrowright"]) {
      player.velocityX = 0;
    }
  };

  window.addEventListener("keydown", keyDownHandler);
  window.addEventListener("keyup", keyUpHandler);
};
