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
): { updatedBalls: CannonBall[]; hitsOnP1: number; hitsOnP2: number } => {
  const newBalls = [...prevBalls];
  const toRemove = new Set<number>();
  let hitsOnP1 = 0;
  let hitsOnP2 = 0;

  // Handle firing from Player 1
  if (!keys[" "] && p1Charges === 0 && p1Fired) {
    const newBall = {
      x: player1Paddle.right - gameBox.left,
      y: player1Paddle.top - gameBox.top + player1Paddle.height / 2,
      direction: 1,
      player: 0,
    };

    // Prevent immediate collision with Player 1's paddle
    if (
      newBall.x > player1Paddle.right || // Start outside the paddle
      newBall.y < player1Paddle.top ||
      newBall.y > player1Paddle.bottom
    ) {
      newBalls.push(newBall);
    }

    setP1Charges(5);
    setP1Fired(false);
  }

  // Handle firing from Player 2
  if (!keys["Enter"] && p2Charges === 0 && p2Fired) {
    const newBall = {
      x: player2Paddle.left - gameBox.left,
      y: player2Paddle.top - gameBox.top + player2Paddle.height / 2,
      direction: -1,
      player: 1,
    };

    // Prevent immediate collision with Player 2's paddle
    if (
      newBall.x < player2Paddle.left || // Start outside the paddle
      newBall.y < player2Paddle.top ||
      newBall.y > player2Paddle.bottom
    ) {
      newBalls.push(newBall);
    }

    setP2Charges(5);
    setP2Fired(false);
  }

  // Process cannonballs for collisions and hits
  for (let i = 0; i < newBalls.length; i++) {
    const ball = newBalls[i];

    // Check if a cannonball hits Player 1's Plank
    if (
      ball.direction === -1 &&
      ball.x <= player1Paddle.right &&
      ball.y >= player1Paddle.top &&
      ball.y <= player1Paddle.bottom
    ) {
      hitsOnP1++;
      toRemove.add(i);
    }

    // Check if a cannonball hits Player 2's Plank
    if (
      ball.direction === 1 &&
      ball.x >= player2Paddle.left &&
      ball.y >= player2Paddle.top &&
      ball.y <= player2Paddle.bottom
    ) {
      hitsOnP2++;
      toRemove.add(i);
    }

    // Detect cannonball-to-cannonball collisions
    for (let j = i + 1; j < newBalls.length; j++) {
      const otherBall = newBalls[j];
      const closeInY = Math.abs(ball.y - otherBall.y) < 10;
      const movingTowardEachOther =
        (ball.direction === 1 && otherBall.direction === -1) ||
        (ball.direction === -1 && otherBall.direction === 1);
      const overlappingInX = Math.abs(ball.x - otherBall.x) < 10;

      if (closeInY && movingTowardEachOther && overlappingInX) {
        toRemove.add(i);
        toRemove.add(j);
      }
    }
  }

  // Remove all cannonballs marked for removal
  const remainingBalls = newBalls.filter((_, index) => !toRemove.has(index));

  // Update positions for remaining cannonballs
  const updatedBalls = remainingBalls
    .map((ball) => ({ ...ball, x: ball.x + ball.direction * 5 }))
    .filter((ball) => ball.x >= 0 && ball.x <= gameBox.width);

  return { updatedBalls, hitsOnP1, hitsOnP2 };
};
