export interface CannonBall {
  x: number;
  y: number;
  direction: number; // 1 = right, -1 = left
  player: 0 | 1;
}

export const updateCannonBalls = (
  prevBalls: CannonBall[],
  player1Paddle: DOMRect,
  player2Paddle: DOMRect,
  gameBox: DOMRect,
  keys: { [key: string]: boolean },
  p1Charges: number,
  p2Charges: number,
  p1Fired: boolean,
  p2Fired: boolean,
  setP1Charges: React.Dispatch<React.SetStateAction<number>>,
  setP2Charges: React.Dispatch<React.SetStateAction<number>>,
  setP1Fired: React.Dispatch<React.SetStateAction<boolean>>,
  setP2Fired: React.Dispatch<React.SetStateAction<boolean>>
): CannonBall[] => {
  const newBalls = [...prevBalls];
  const toRemove = new Set<number>(); // Track indices of cannonballs to remove

  // Player 1 fires
  if (!keys[" "] && p1Charges === 0 && p1Fired) {
    newBalls.push({
      x: player1Paddle.right - gameBox.left, // Fix Player 1 cannonball x-position
      y: player1Paddle.top - gameBox.top + player1Paddle.height / 2,
      direction: 1,
      player: 0,
    });
    setP1Charges(5); // Reset charge
    setP1Fired(false); // Reset firing state
  }

  // Player 2 fires
  if (!keys["Enter"] && p2Charges === 0 && p2Fired) {
    newBalls.push({
      x: player2Paddle.left - gameBox.left, // Adjust Player 2 cannonball x-position
      y: player2Paddle.top - gameBox.top + player2Paddle.height / 2,
      direction: -1,
      player: 1,
    });
    setP2Charges(5); // Reset charge
    setP2Fired(false); // Reset firing state
  }

  // Detect cannonball collisions
  for (let i = 0; i < newBalls.length; i++) {
    for (let j = i + 1; j < newBalls.length; j++) {
      const ball = newBalls[i];
      const otherBall = newBalls[j];

      const closeInY = Math.abs(ball.y - otherBall.y) < 10; // Check proximity in Y-axis
      const movingTowardEachOther =
        (ball.direction === 1 && otherBall.direction === -1) ||
        (ball.direction === -1 && otherBall.direction === 1);
      const overlappingInX = ball.x < otherBall.x && otherBall.x - ball.x < 10; // Check proximity in X-axis

      if (closeInY && movingTowardEachOther && overlappingInX) {
        // Mark both balls for removal
        toRemove.add(i);
        toRemove.add(j);
      }
    }
  }

  // Remove all cannonballs marked for removal
  const remainingBalls = newBalls.filter((_, index) => !toRemove.has(index));

  // Update cannonball positions
  return remainingBalls
    .map((ball) => ({ ...ball, x: ball.x + ball.direction * 5 })) // Move cannonballs
    .filter((ball) => ball.x >= 0 && ball.x <= gameBox.width); // Remove out-of-bounds cannonballs
};
