import { log } from "../../log";

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
  const p1Paddle = {
    left: player1Paddle.left - gameBox.left,
    right: player1Paddle.right - gameBox.left,
    top: player1Paddle.top - gameBox.top,
    bottom: player1Paddle.bottom - gameBox.top,
    x: player1Paddle.x - gameBox.left,
    y: player1Paddle.y - gameBox.top,
    height: player1Paddle.height,
    width: player1Paddle.width,
  };
  const p2Paddle = {
    left: player2Paddle.left - gameBox.left,
    right: player2Paddle.right - gameBox.left,
    top: player2Paddle.top - gameBox.top,
    bottom: player2Paddle.bottom - gameBox.top,
    x: player2Paddle.x - gameBox.left,
    y: player2Paddle.y - gameBox.top,
    height: player2Paddle.height,
    width: player2Paddle.width,
  };

  // Handle firing from Player 1
  if (!keys[" "] && p1Charges === 0 && p1Fired) {
    const newBall = {
      x: p1Paddle.right + 12,
      y: p1Paddle.y + p1Paddle.height / 2,
      direction: 1,
      player: 0,
    };

    if (
      newBall.x > p1Paddle.right || // Start outside the paddle
      newBall.y < p1Paddle.top ||
      newBall.y > p1Paddle.bottom
    ) {
      newBalls.push(newBall);
      log(`Player 1 fired a cannonball at x: ${newBall.x}, y: ${newBall.y}`);
    }

    setP1Charges(5);
    setP1Fired(false);
  }

  // Handle firing from Player 2
  if (!keys["Enter"] && p2Charges === 0 && p2Fired) {
    const newBall = {
      x: p2Paddle.left - 12,
      y: p2Paddle.y + p2Paddle.height / 2,
      direction: -1,
      player: 1,
    };

    if (
      newBall.x < p2Paddle.left || // Start outside the paddle
      newBall.y < p2Paddle.top ||
      newBall.y > p2Paddle.bottom
    ) {
      newBalls.push(newBall);
      log(
        `Player 2 firing cannonball from x=${newBall.x}, y=${newBall.y}, direction=${newBall.direction}`
      );
    }

    setP2Charges(5);
    setP2Fired(false);
  }

  // Process cannonballs for collisions and hits
  for (let i = 0; i < newBalls.length; i++) {
    const ball = newBalls[i];

    if (
      ball.direction === -1 &&
      ball.x <= p1Paddle.right &&
      ball.y >= p1Paddle.top &&
      ball.y <= p1Paddle.bottom
    ) {
      hitsOnP1 += 0.5;
      toRemove.add(i);
      log(`Cannonball hit Player 1's plank at x: ${ball.x}, y: ${ball.y}`);
      continue;
    }

    if (
      ball.direction === 1 &&
      ball.x >= p2Paddle.left &&
      ball.y >= p2Paddle.top &&
      ball.y <= p2Paddle.bottom
    ) {
      hitsOnP2 += 0.5;
      toRemove.add(i);
      log(`Cannonball hit Player 2's plank at x: ${ball.x}, y: ${ball.y}`);
      continue;
    }

    if (ball.direction === -1) {
      if (ball.x < p1Paddle.right) {
        log("Passed player 1 paddle");
      }
    }

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
        log(
          `Cannonball collision detected between x: ${ball.x}, y: ${ball.y} and x: ${otherBall.x}, y: ${otherBall.y}`
        );
      }
    }
  }

  // Remove all cannonballs marked for removal
  const remainingBalls = newBalls.filter((_, index) => !toRemove.has(index));

  // Update positions for remaining cannonballs
  const updatedBalls = remainingBalls
    .map((ball) => ({ ...ball, x: ball.x + ball.direction * 3 }))
    .filter((ball) => ball.x >= 0 && ball.x <= gameBox.width);

  return { updatedBalls, hitsOnP1, hitsOnP2 };
};
