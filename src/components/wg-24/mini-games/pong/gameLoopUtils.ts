export type BallSpeed = { x: number; y: number };
export const INITIAL_BALL_SPEED: BallSpeed = {
  x: 3, // Horizontal speed
  y: 3, // Vertical speed
};

export const handleBallMovement = (
  ballRef: React.RefObject<HTMLDivElement>,
  ballSpeed: React.MutableRefObject<BallSpeed>,
  gameBox: DOMRect
) => {
  if (ballRef.current) {
    const newBallLeft = ballRef.current.offsetLeft + ballSpeed.current.x;
    const newBallTop = ballRef.current.offsetTop + ballSpeed.current.y;
    const ballHeight = ballRef.current.offsetHeight;

    // Update ball position
    ballRef.current.style.left = `${newBallLeft}px`;
    ballRef.current.style.top = `${newBallTop}px`;

    // Ball collision with top wall
    if (newBallTop <= 0) {
      ballSpeed.current.y *= -1; // Reverse vertical speed
      ballRef.current.style.top = `0px`; // Snap to the top
      enforceMinMaxVerticalSpeed(ballSpeed);
    }

    // Ball collision with bottom wall
    if (newBallTop + ballHeight >= gameBox.height) {
      ballSpeed.current.y *= -1; // Reverse vertical speed
      ballRef.current.style.top = `${gameBox.height - ballHeight}px`; // Snap to the bottom
      enforceMinMaxVerticalSpeed(ballSpeed);
    }
  }
};

export const checkBallCollisions = (
  ball: DOMRect,
  player1: DOMRect,
  player2: DOMRect,
  gameBox: DOMRect,
  ballSpeed: React.MutableRefObject<{ x: number; y: number }>,
  setT1Score: React.Dispatch<React.SetStateAction<number>>,
  setT2Score: React.Dispatch<React.SetStateAction<number>>,
  resetBall: () => void,
  prevPlayer1Top: number,
  prevPlayer2Top: number
) => {
  // Ball collision with Player 1 Paddle
  if (
    ball.left <= player1.right &&
    ball.bottom >= player1.top &&
    ball.top <= player1.bottom &&
    ballSpeed.current.x < 0
  ) {
    ballSpeed.current.x *= -1;
    ballSpeed.current.y += (player1.top - prevPlayer1Top) * 0.2;
    enforceMinMaxVerticalSpeed(ballSpeed);
  }

  // Ball collision with Player 2 Paddle
  if (
    ball.right >= player2.left &&
    ball.bottom >= player2.top &&
    ball.top <= player2.bottom &&
    ballSpeed.current.x > 0
  ) {
    ballSpeed.current.x *= -1;
    ballSpeed.current.y += (player2.top - prevPlayer2Top) * 0.2;
    enforceMinMaxVerticalSpeed(ballSpeed);
  }

  // Ball out of bounds
  if (ball.left <= gameBox.left) {
    setT2Score((prev) => prev + 1);
    resetBall();
  }
  if (ball.right >= gameBox.right) {
    setT1Score((prev) => prev + 1);
    resetBall();
  }
};

export const movePaddles = (
  player1Ref: React.RefObject<HTMLDivElement>,
  player2Ref: React.RefObject<HTMLDivElement>,
  keys: { [key: string]: boolean },
  gameHeight: number
) => {
  const step = 5;

  if (player1Ref.current) {
    const player1Top = parseInt(player1Ref.current.style.top) || 0;

    if (keys["w"]) {
      player1Ref.current.style.top = `${Math.max(player1Top - step, 0)}px`;
    }

    if (keys["s"]) {
      const maxTop = gameHeight - step - player1Ref.current.offsetHeight;
      player1Ref.current.style.top = `${Math.min(player1Top + step, maxTop)}px`;
    }
  }

  if (player2Ref.current) {
    const player2Top = parseInt(player2Ref.current.style.top) || 0;

    if (keys["ArrowUp"]) {
      player2Ref.current.style.top = `${Math.max(player2Top - step, 0)}px`;
    }

    if (keys["ArrowDown"]) {
      const maxTop = gameHeight - step - player2Ref.current.offsetHeight;
      player2Ref.current.style.top = `${Math.min(player2Top + step, maxTop)}px`;
    }
  }
};

export const enforceMinMaxVerticalSpeed = (
  ballSpeed: React.MutableRefObject<BallSpeed>
) => {
  const MIN_VERTICAL_SPEED = INITIAL_BALL_SPEED.y / 2;
  const MAX_VERTICAL_SPEED = INITIAL_BALL_SPEED.y * 2;

  if (Math.abs(ballSpeed.current.y) < MIN_VERTICAL_SPEED) {
    ballSpeed.current.y =
      ballSpeed.current.y > 0 ? MIN_VERTICAL_SPEED : -MIN_VERTICAL_SPEED;
  }
  if (Math.abs(ballSpeed.current.y) > MAX_VERTICAL_SPEED) {
    ballSpeed.current.y =
      ballSpeed.current.y > 0 ? MAX_VERTICAL_SPEED : -MAX_VERTICAL_SPEED;
  }
};
