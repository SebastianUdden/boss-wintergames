import { Badge } from "@/components/wg-24/ui/badge";
import { Button } from "@/components/wg-24/ui/button";
import { useState, useEffect, useRef } from "react";
import { IScore } from "../Score";
import { cn } from "@/lib/utils";

const HORIZONTAL_SPEED = 4;
const VERTICAL_SPEED = 3;

type GameState = "ready" | "active" | "finished";

interface IPong {
  players: [string, string, string, string];
  onGameComplete: (playerScores: IScore[]) => void;
}

export const Pong = ({ players, onGameComplete }: IPong) => {
  const [gameState, setGameState] = useState<GameState>("ready");
  const [showScore, setShowScore] = useState<string | undefined>();
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [message, setMessage] = useState("Get ready for a new Pong challenge!");

  // Refs for paddles and ball positions
  const player1PaddleRef = useRef<HTMLDivElement>(null);
  const player2PaddleRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const gameBoxRef = useRef<HTMLDivElement>(null);
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});
  const ballSpeed = useRef({ x: HORIZONTAL_SPEED, y: VERTICAL_SPEED });

  // Track previous paddle positions
  const [prevPlayer1PaddleTop, setPrevPlayer1PaddleTop] = useState(0);
  const [prevPlayer2PaddleTop, setPrevPlayer2PaddleTop] = useState(0);

  // Track paddle sizes
  const [player1PaddleHeight, setPlayer1PaddleHeight] = useState(64);
  const [player2PaddleHeight, setPlayer2PaddleHeight] = useState(64);

  useEffect(() => {
    if (gameState !== "active") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      setKeys((prev) => ({ ...prev, [event.key]: true }));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeys((prev) => ({ ...prev, [event.key]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  useEffect(() => {
    if (gameState !== "active") return;

    const gameInterval = setInterval(() => {
      const gameBox = gameBoxRef.current?.getBoundingClientRect();
      const player1Paddle = player1PaddleRef.current?.getBoundingClientRect();
      const player2Paddle = player2PaddleRef.current?.getBoundingClientRect();
      const ball = ballRef.current?.getBoundingClientRect();

      if (!gameBox || !player1Paddle || !player2Paddle || !ball) return;

      // Paddle size control for Player 1
      if (keys["a"] && player1PaddleHeight > 32) {
        setPlayer1PaddleHeight((prev) => prev - 5);
      }
      if (keys["d"] && player1PaddleHeight < gameBox.height) {
        setPlayer1PaddleHeight((prev) => prev + 5);
      }

      // Paddle size control for Player 2
      if (keys["ArrowLeft"] && player2PaddleHeight > 32) {
        setPlayer2PaddleHeight((prev) => prev - 5);
      }
      if (keys["ArrowRight"] && player2PaddleHeight < gameBox.height) {
        setPlayer2PaddleHeight((prev) => prev + 5);
      }

      // Player 1 Paddle Movement
      if (keys["w"] && player1Paddle.top > gameBox.top) {
        player1PaddleRef.current!.style.top = `${
          player1PaddleRef.current!.offsetTop - 5
        }px`;
      }
      if (keys["s"] && player1Paddle.bottom < gameBox.bottom) {
        player1PaddleRef.current!.style.top = `${
          player1PaddleRef.current!.offsetTop + 5
        }px`;
      }

      // Player 2 Paddle Movement
      if (keys["ArrowUp"] && player2Paddle.top > gameBox.top) {
        player2PaddleRef.current!.style.top = `${
          player2PaddleRef.current!.offsetTop - 5
        }px`;
      }
      if (keys["ArrowDown"] && player2Paddle.bottom < gameBox.bottom) {
        player2PaddleRef.current!.style.top = `${
          player2PaddleRef.current!.offsetTop + 5
        }px`;
      }

      // Ball Movement
      const newBallLeft = ballRef.current!.offsetLeft + ballSpeed.current.x;
      const newBallTop = ballRef.current!.offsetTop + ballSpeed.current.y;

      ballRef.current!.style.left = `${newBallLeft}px`;
      ballRef.current!.style.top = `${newBallTop}px`;

      // Ball Collision with Top and Bottom Walls
      if (newBallTop <= 0 || newBallTop + ball.height >= gameBox.height) {
        ballSpeed.current.y *= -1; // Reverse vertical direction
      }

      // Ball Collision with Player 1 Paddle
      if (
        ball.left <= player1Paddle.right &&
        ball.bottom >= player1Paddle.top &&
        ball.top <= player1Paddle.bottom &&
        ballSpeed.current.x < 0 // Ensure ball is moving towards the paddle
      ) {
        // Calculate paddle movement direction
        const paddleDirection = player1Paddle.top - prevPlayer1PaddleTop;

        // Adjust the ball's vertical speed based on paddle movement
        if (paddleDirection < 0 && ballSpeed.current.y < 0) {
          // Paddle moving up, ball moving up, increase speed
          ballSpeed.current.y -= 1;
        } else if (paddleDirection > 0 && ballSpeed.current.y > 0) {
          // Paddle moving down, ball moving down, increase speed
          ballSpeed.current.y += 1;
        } else {
          // Paddle moving opposite direction, reduce speed
          ballSpeed.current.y *= 0.8;
        }

        ballSpeed.current.x *= -1; // Reverse horizontal direction
      }

      // Ball Collision with Player 2 Paddle
      if (
        ball.right >= player2Paddle.left &&
        ball.bottom >= player2Paddle.top &&
        ball.top <= player2Paddle.bottom &&
        ballSpeed.current.x > 0 // Ensure ball is moving towards the paddle
      ) {
        // Calculate paddle movement direction
        const paddleDirection = player2Paddle.top - prevPlayer2PaddleTop;

        // Adjust the ball's vertical speed based on paddle movement
        if (paddleDirection < 0 && ballSpeed.current.y < 0) {
          // Paddle moving up, ball moving up, increase speed
          ballSpeed.current.y -= 1;
        } else if (paddleDirection > 0 && ballSpeed.current.y > 0) {
          // Paddle moving down, ball moving down, increase speed
          ballSpeed.current.y += 1;
        } else {
          // Paddle moving opposite direction, reduce speed
          ballSpeed.current.y *= 0.8;
        }

        ballSpeed.current.x *= -1; // Reverse horizontal direction
      }

      // Ball Out of Bounds (Left/Right)
      if (ball.left <= gameBox.left) {
        setScores((prev) => [prev[0], prev[1], prev[2] + 1, prev[3] + 1]);
        resetBall();
      }
      if (ball.right >= gameBox.right) {
        setScores((prev) => [prev[0] + 1, prev[1] + 1, prev[2], prev[3]]);
        resetBall();
      }

      // Update paddle positions
      setPrevPlayer1PaddleTop(player1Paddle.top);
      setPrevPlayer2PaddleTop(player2Paddle.top);
    }, 20);

    return () => clearInterval(gameInterval);
  }, [keys, gameState]);

  useEffect(() => {
    if (scores.some((s) => s > 3)) {
      setGameState("finished");
    }
  }, [scores]);

  const resetBall = () => {
    // setTimeout(() => {
    //   setShowScore(undefined);
    if (ballRef.current) {
      ballRef.current.style.left = "50%";
      ballRef.current.style.top = "50%";
      ballSpeed.current = {
        x: Math.random() > 0.5 ? HORIZONTAL_SPEED : -HORIZONTAL_SPEED,
        y: Math.random() > 0.5 ? VERTICAL_SPEED : -VERTICAL_SPEED,
      };
    }
    // }, 2000);
  };

  const startGame = () => {
    setGameState("active");
    setMessage("Game On! Control your paddles!");
  };

  const endGame = () => {
    setGameState("finished");
    setMessage("Game Over!");
    onGameComplete(
      scores.map((s, i) => ({ score: s * 1000, player: players[i] }))
    );
  };

  return (
    <div className="flex flex-col p-4 bg-green-900 rounded-lg">
      <h2 className="text-2xl font-bold">Killerball</h2>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex flex-col gap-2">
          {players.slice(0, 2).map((p) => (
            <Badge key={p} className="bg-green-500 hover:bg-green-400">
              {p}
            </Badge>
          ))}
        </div>
        <div>versus</div>
        <div className="flex flex-col gap-2">
          {players.slice(2, 4).map((p) => (
            <Badge key={p} className="bg-pink-500 hover:bg-pink-400">
              {p}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {gameState === "ready" && (
          <Button
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-500"
            onClick={startGame}
          >
            Start Game
          </Button>
        )}
      </div>
      <p className="mt-4 text-lg">{message}</p>

      <div className="flex justify-between">
        <Badge className="text-xl bg-green-500 rounded-full hover:bg-green-400">
          {scores[0]}
        </Badge>
        <Badge className="text-xl bg-pink-500 rounded-full hover:bg-pink-400">
          {scores[2]}
        </Badge>
      </div>
      <div
        ref={gameBoxRef}
        className="relative w-full h-64 mt-4 overflow-hidden bg-black"
      >
        {/* Player 1 Paddle */}
        <div
          ref={player1PaddleRef}
          className="absolute w-2"
          style={{
            height: `${player1PaddleHeight}px`,
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "white",
          }}
        />

        {/* Player 2 Paddle */}
        <div
          ref={player2PaddleRef}
          className="absolute w-2"
          style={{
            height: `${player2PaddleHeight}px`,
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "white",
          }}
        />

        {/* Ball */}
        <div
          ref={ballRef}
          className={cn(
            "absolute w-4 h-4 bg-red-500 rounded-full",
            showScore ? "hidden" : "block"
          )}
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

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

      {gameState === "finished" && (
        <Button
          className="mt-4 bg-green-700 hover:bg-green-500"
          onClick={endGame}
        >
          Complete
        </Button>
      )}
    </div>
  );
};
