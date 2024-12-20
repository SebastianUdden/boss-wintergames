import { Button } from "@/components/wg-24/ui/button";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { IMiniGameBase } from "../MiniGame";
import { Scores } from "../Scores";
import { Plank } from "./Plank";
import { usePaddleControls } from "./usePaddleControls";
import { useGameLoop } from "./useGameLoop";
import { Ball } from "./Ball";
import { provideScoresOnWinner } from "../Winner";
import { INITIAL_BALL_SPEED } from "./gameLoopUtils";

export const REFERENCE_WIDTH = 500; // Standard width for normal speed
export const HORIZONTAL_SPEED = 4;
export const VERTICAL_SPEED = 3;
export const INITIAL_PADDLE_HEIGHT = 200;

type GameState = "ready" | "active" | "finished";

export const Pong = ({ players, onGameComplete }: IMiniGameBase) => {
  const [gameState, setGameState] = useState<GameState>("ready");
  const [showScore] = useState<string | undefined>();
  const [winner, setWinner] = useState("");
  const [showP1Plank, setShowP1Plank] = useState(true);
  const [showP2Plank, setShowP2Plank] = useState(true);
  const [message, setMessage] = useState("Ready your cannons!");

  // Refs for paddles and ball positions
  const player1PaddleRef = useRef<HTMLDivElement>(null);
  const player2PaddleRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const gameBoxRef = useRef<HTMLDivElement>(null);
  const ballSpeed = useRef({ x: HORIZONTAL_SPEED, y: VERTICAL_SPEED });

  const resetBall = () => {
    if (ballRef.current && gameBoxRef.current) {
      const gameBox = gameBoxRef.current.getBoundingClientRect();
      const widthRatio = gameBox.width / REFERENCE_WIDTH;

      ballRef.current.style.left = "50%";
      ballRef.current.style.top = "50%";
      ballSpeed.current = { x: 0, y: 0 };

      setTimeout(() => {
        ballSpeed.current = {
          x:
            (Math.random() > 0.5
              ? INITIAL_BALL_SPEED.x
              : -INITIAL_BALL_SPEED.x) * widthRatio,
          y: Math.random() > 0.5 ? INITIAL_BALL_SPEED.y : -INITIAL_BALL_SPEED.y,
        };
      }, 2000);
    }
  };

  // Track paddle sizes
  const { keys, player1PaddleHeight, player2PaddleHeight, resetPaddleHeights } =
    usePaddleControls({
      gameState,
      gameBoxRef,
      initialPaddleHeight: INITIAL_PADDLE_HEIGHT,
    });

  const {
    t1Score,
    t2Score,
    cannonBalls,
    p1Charges,
    p2Charges,
    p1Hits,
    p2Hits,
  } = useGameLoop({
    gameState,
    gameBoxRef,
    player1PaddleRef,
    player2PaddleRef,
    ballRef,
    ballSpeed,
    resetBall,
    keys,
  });

  useEffect(() => {
    if (!showP1Plank) {
      setWinner(players[1][0].name);
    }
    if (!showP2Plank) {
      setWinner(players[0][0].name);
    }
  }, [showP1Plank, showP2Plank]);

  useEffect(() => {
    if (t1Score > 9) {
      setWinner(players[0][0].name);
    }
    if (t2Score > 9) {
      setWinner(players[1][0].name);
    }
  }, [t1Score, t2Score, players]);

  useEffect(() => {
    if (gameState === "ready" && gameBoxRef.current) {
      const gameBox = gameBoxRef.current.getBoundingClientRect();
      const paddleHeight = INITIAL_PADDLE_HEIGHT; // Default paddle height

      const centeredPosition = (gameBox.height - paddleHeight) / 2;

      if (player1PaddleRef.current) {
        player1PaddleRef.current.style.top = `${centeredPosition}px`;
      }
      if (player2PaddleRef.current) {
        player2PaddleRef.current.style.top = `${centeredPosition}px`;
      }
    }
  }, [gameState]);

  const startGame = () => {
    setGameState("active");
    setMessage("The scourge of the seas has been sighted, fire true!");

    if (
      player1PaddleRef.current &&
      player2PaddleRef.current &&
      gameBoxRef.current
    ) {
      const gameBox = gameBoxRef.current.getBoundingClientRect();
      const paddleHeight = player1PaddleRef.current.offsetHeight;

      // Center paddles vertically
      const centeredPosition = (gameBox.height - paddleHeight) / 2;

      player1PaddleRef.current.style.top = `${centeredPosition}px`;
      player2PaddleRef.current.style.top = `${centeredPosition}px`;
    }

    resetBall();
  };

  useEffect(() => {
    provideScoresOnWinner({ onGameComplete, players, winner });
  }, [winner, players]);

  return (
    <div className="flex flex-col justify-between h-full p-4 bg-gray-800 rounded-lg select-none">
      <div className="flex flex-col">
        <h1 className="mb-2">Cannons</h1>
        <p className="mb-2 text-lg">{message}</p>
      </div>
      <div
        ref={gameBoxRef}
        className="relative w-full mt-4 overflow-hidden bg-black h-1/2"
        style={{
          backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
          url('/games/cannons/ocean-stock.webp')
        `,
          backgroundSize: "cover", // Ensures the image covers the entire container
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents tiling
          backgroundColor: "black", // Fallback color
        }}
      >
        {gameState === "ready" && (
          <Button
            className="absolute z-50 p-20 text-4xl text-white -translate-x-1/2 -translate-y-1/2 bg-black left-1/2 top-1/2 hover:opacity-90"
            onClick={startGame}
          >
            Start Game
          </Button>
        )}
        {/* Player 1 Paddle */}
        {showP1Plank && (
          <Plank
            ref={player1PaddleRef}
            paddleHeight={player1PaddleHeight}
            hits={p1Hits} // Player 2's hits reduce Player 1's plank
            charges={p1Charges}
            position="left"
            onPlankDestroyed={() => setShowP1Plank(false)}
          />
        )}

        {/* Player 2 Paddle */}
        {showP2Plank && (
          <Plank
            ref={player2PaddleRef}
            paddleHeight={player2PaddleHeight}
            hits={p2Hits} // Player 1's hits reduce Player 2's plank
            charges={p2Charges}
            position="right"
            onPlankDestroyed={() => setShowP2Plank(false)}
          />
        )}

        <Ball
          ref={ballRef}
          showScore={false}
          gameState={gameState}
          overlayImage="/games/cannons/baby-kraken.png"
        />
        {cannonBalls.map((ball, index) => (
          <img
            key={index}
            src="/games/cannons/cannon-ball.png"
            className="absolute rounded-full"
            style={{
              width: "12px",
              height: "12px",
              left: `${ball.x}px`,
              top: `${ball.y}px`,
              transform: "translate(-50%, -30%)",
              zIndex: 99,
            }}
          />
        ))}

        {/* Score */}
        {showScore && (
          <p
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl",
              showScore
            )}
          >
            Score!
          </p>
        )}
      </div>
      <div className="w-full mt-4">
        <Scores
          players={players}
          scores={[t1Score, t2Score]}
          winner={winner}
          controls={[
            ["w", "a", "s", "d", "Space"],
            [<>&uarr;</>, <>&uarr;</>, <>&uarr;</>, <>&uarr;</>, "Enter"],
          ]}
        />
      </div>
    </div>
  );
};
