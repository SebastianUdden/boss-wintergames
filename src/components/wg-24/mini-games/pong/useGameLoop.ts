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
      setCannonBalls((prevBalls) =>
        updateCannonBalls(
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
        )
      );

      // Recharge cannons
      if (keys[" "] && p1Charges > 0 && !p1Fired) {
        setP1Fired(true);
        setP1Charges((prev) => Math.max(prev - 1, 0));
      }
      if (!keys[" "] && p1Fired) {
        setP1Fired(false);
      }

      if (keys["Enter"] && p2Charges > 0 && !p2Fired) {
        setP2Fired(true);
        setP2Charges((prev) => Math.max(prev - 1, 0));
      }
      if (!keys["Enter"] && p2Fired) {
        setP2Fired(false);
      }

      // Update paddle positions
      setPrevPlayer1Top(player1Paddle.top);
      setPrevPlayer2Top(player2Paddle.top);
    }, 20);

    return () => clearInterval(gameInterval);
  }, [keys, gameState, p1Charges, p2Charges, p1Fired, p2Fired]);

  return { t1Score, t2Score, cannonBalls, p1Charges, p2Charges };
};

// export const useGameLoop = ({
//   gameState,
//   gameBoxRef,
//   player1PaddleRef,
//   player2PaddleRef,
//   ballRef,
//   ballSpeed,
//   keys,
//   resetBall,
// }: IUseGameLoop) => {
//   const [t1Score, setT1Score] = useState(0);
//   const [t2Score, setT2Score] = useState(0);
//   const [cannonBalls, setCannonBalls] = useState<CannonBall[]>([]);
//   const [prevPlayer1Top, setPrevPlayer1Top] = useState(0);
//   const [prevPlayer2Top, setPrevPlayer2Top] = useState(0);

//   // Cannon recharge counters
//   const [p1Charges, setP1Charges] = useState(5);
//   const [p2Charges, setP2Charges] = useState(5);

//   // Track key-up events
//   const [p1Fired, setP1Fired] = useState(false);
//   const [p2Fired, setP2Fired] = useState(false);

//   useEffect(() => {
//     if (gameState !== "active") return;

//     const gameInterval = setInterval(() => {
//       const gameBox = gameBoxRef.current?.getBoundingClientRect();
//       const player1Paddle = player1PaddleRef.current?.getBoundingClientRect();
//       const player2Paddle = player2PaddleRef.current?.getBoundingClientRect();
//       const ball = ballRef.current?.getBoundingClientRect();

//       if (!gameBox || !player1Paddle || !player2Paddle || !ball) return;

//       // Move paddles
//       movePaddles(player1PaddleRef, player2PaddleRef, keys, gameBox.height);

//       // Ball movement and collisions
//       handleBallMovement(ballRef, ballSpeed, gameBox);
//       checkBallCollisions(
//         ball,
//         player1Paddle,
//         player2Paddle,
//         gameBox,
//         ballSpeed,
//         setT1Score,
//         setT2Score,
//         resetBall,
//         prevPlayer1Top,
//         prevPlayer2Top
//       );

//       // Fire cannonballs
//       setCannonBalls((prevBalls) => {
//         const newBalls = [...prevBalls];

//         // Player 1 fires
//         if (!keys[" "] && p1Charges === 0 && p1Fired) {
//           newBalls.push({
//             x: player1Paddle.right - 40,
//             y: player1Paddle.top - gameBox.top + player1Paddle.height / 2,
//             direction: 1,
//             player: 0,
//           });
//           setP1Charges(5);
//           setP1Fired(false);
//         }

//         // Player 2 fires
//         if (!keys["Enter"] && p2Charges === 0 && p2Fired) {
//           newBalls.push({
//             x: player2Paddle.left - 70,
//             y: player2Paddle.top - gameBox.top + player2Paddle.height / 2,
//             direction: -1,
//             player: 1,
//           });
//           setP2Charges(5);
//           setP2Fired(false);
//         }

//         // Detect cannonball collisions
//         const remainingBalls = newBalls.filter((ball, i, arr) => {
//           for (let j = 0; j < arr.length; j++) {
//             if (i !== j) {
//               const otherBall = arr[j];
//               // Check if balls have roughly the same y and opposite directions
//               const closeInY = Math.abs(ball.y - otherBall.y) < 10;
//               const movingTowardEachOther =
//                 (ball.direction === 1 && otherBall.direction === -1) ||
//                 (ball.direction === -1 && otherBall.direction === 1);
//               const overlappingInX =
//                 ball.x < otherBall.x && otherBall.x - ball.x < 10;

//               if (closeInY && movingTowardEachOther && overlappingInX) {
//                 return false; // Remove this ball
//               }
//             }
//           }
//           return true; // Keep this ball
//         });

//         // Update cannonball positions
//         return remainingBalls
//           .map((ball) => ({ ...ball, x: ball.x + ball.direction * 5 }))
//           .filter((ball) => ball.x >= 0 && ball.x <= gameBox.width);
//       });

//       // Recharge cannons
//       if (keys[" "] && p1Charges > 0 && !p1Fired) {
//         setP1Fired(true);
//         setP1Charges((prev) => Math.max(prev - 1, 0));
//       }
//       if (!keys[" "] && p1Fired) {
//         setP1Fired(false);
//       }

//       if (keys["Enter"] && p2Charges > 0 && !p2Fired) {
//         setP2Fired(true);
//         setP2Charges((prev) => Math.max(prev - 1, 0));
//       }
//       if (!keys["Enter"] && p2Fired) {
//         setP2Fired(false);
//       }

//       // Update paddle positions
//       setPrevPlayer1Top(player1Paddle.top);
//       setPrevPlayer2Top(player2Paddle.top);
//     }, 20);

//     return () => clearInterval(gameInterval);
//   }, [keys, gameState, p1Charges, p2Charges, p1Fired, p2Fired]);

//   return { t1Score, t2Score, cannonBalls, p1Charges, p2Charges };
// };
