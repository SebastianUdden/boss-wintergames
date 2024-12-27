import { useEffect, useState, RefObject } from "react";
import {
  BallSpeed,
  checkBallCollisions,
  handleBallMovement,
  movePaddles,
} from "./gameLoopUtils";
import { CannonBall, updateCannonBalls } from "./updateCannonBalls";

interface IUseGameLoop {
  gameState: "ready" | "active" | "finished";
  gameBoxRef: RefObject<HTMLDivElement>;
  player1PaddleRef: RefObject<HTMLDivElement>;
  player2PaddleRef: RefObject<HTMLDivElement>;
  ballRef: RefObject<HTMLDivElement>;
  ballSpeed: React.MutableRefObject<BallSpeed>;
  keys: { [key: string]: boolean };
  resetBall: () => void;
}

export const useGameLoop = ({
  gameState,
  gameBoxRef,
  player1PaddleRef,
  player2PaddleRef,
  ballRef,
  ballSpeed,
  keys,
  resetBall,
}: IUseGameLoop) => {
  const [t1Score, setT1Score] = useState(0);
  const [t2Score, setT2Score] = useState(0);
  const [cannonBalls, setCannonBalls] = useState<CannonBall[]>([]);
  const [p1Hits, setP1Hits] = useState(0); // Hits on Player 1's Plank
  const [p2Hits, setP2Hits] = useState(0); // Hits on Player 2's Plank
  const [prevPlayer1Top, setPrevPlayer1Top] = useState(0);
  const [prevPlayer2Top, setPrevPlayer2Top] = useState(0);

  const [p1Charges, setP1Charges] = useState(5);
  const [p2Charges, setP2Charges] = useState(5);

  const [p1Fired, setP1Fired] = useState(false);
  const [p2Fired, setP2Fired] = useState(false);

  useEffect(() => {
    if (gameState !== "active") return;

    const gameInterval = setInterval(() => {
      const gameBox = gameBoxRef.current?.getBoundingClientRect();
      const player1Paddle = player1PaddleRef.current?.getBoundingClientRect();
      const player2Paddle = player2PaddleRef.current?.getBoundingClientRect();
      const ball = ballRef.current?.getBoundingClientRect();

      if (!gameBox || !player1Paddle || !player2Paddle || !ball) return;

      // Move paddles
      movePaddles(player1PaddleRef, player2PaddleRef, keys, gameBox.height);

      // Ball movement and collisions
      handleBallMovement(ballRef, ballSpeed, gameBox);
      checkBallCollisions(
        ball,
        player1Paddle,
        player2Paddle,
        gameBox,
        ballSpeed,
        setT1Score,
        setT2Score,
        resetBall,
        prevPlayer1Top,
        prevPlayer2Top
      );

      // Update cannonballs
      setCannonBalls((prevBalls) => {
        const { updatedBalls, hitsOnP1, hitsOnP2 } = updateCannonBalls(
          prevBalls,
          player1Paddle,
          player2Paddle,
          gameBox,
          keys,
          p1Charges,
          p2Charges,
          p1Fired,
          p2Fired,
          setP1Charges,
          setP2Charges,
          setP1Fired,
          setP2Fired
        );

        // Update hits
        if (hitsOnP1 > 0) setP1Hits((prev) => prev + hitsOnP1);
        if (hitsOnP2 > 0) setP2Hits((prev) => prev + hitsOnP2);

        return updatedBalls;
      });

      // Recharge cannons
      if (keys["x"] && p1Charges > 0 && !p1Fired) {
        setP1Fired(true);
        setP1Charges((prev) => Math.max(prev - 1, 0));
      }
      if (!keys["x"] && p1Fired) {
        setP1Fired(false);
      }

      if (keys[","] && p2Charges > 0 && !p2Fired) {
        setP2Fired(true);
        setP2Charges((prev) => Math.max(prev - 1, 0));
      }
      if (!keys[","] && p2Fired) {
        setP2Fired(false);
      }

      // Update paddle positions
      setPrevPlayer1Top(player1Paddle.top);
      setPrevPlayer2Top(player2Paddle.top);
    }, 20);

    return () => clearInterval(gameInterval);
  }, [keys, gameState, p1Charges, p2Charges, p1Fired, p2Fired]);

  return {
    t1Score,
    t2Score,
    cannonBalls,
    p1Charges,
    p2Charges,
    p1Hits,
    p2Hits,
  };
};
