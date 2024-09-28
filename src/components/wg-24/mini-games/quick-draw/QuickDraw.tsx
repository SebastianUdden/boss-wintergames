import { Badge } from "@/components/wg-24/ui/badge";
import { Button } from "@/components/wg-24/ui/button";
import { useState, useEffect, useCallback } from "react";
import { Pistol } from "./Pistol";
import { cn } from "@/lib/utils";
import "./pistol.css";
import { IScore } from "../Score";

type GameState = "ready" | "active" | "draw" | "finished";

interface PlayerState {
  player1: boolean;
  player2: boolean;
  player3: boolean;
}

type Direction = "left" | "right" | "center" | "away";
interface Directions {
  player1: Direction;
  player2: Direction;
  player3: Direction;
}

interface IQuickDraw {
  players: [string, string, string];
  onGameComplete: (playerScores: IScore[]) => void;
}
export const QuickDraw = ({ players, onGameComplete }: IQuickDraw) => {
  const [winner, setWinner] = useState<string | undefined>();
  const [gameState, setGameState] = useState<GameState>("ready");
  const [message, setMessage] = useState("");

  const [bullets, setBullets] = useState<PlayerState>({
    player1: false,
    player2: false,
    player3: false,
  });

  // Pistol orientations: center, left, or right (relative to the triangle)
  const [pistolDirections, setPistolDirections] = useState<Directions>({
    player1: "center", // Can be "center", "left", or "right"
    player2: "center",
    player3: "center",
  });

  const [deadPlayers, setDeadPlayers] = useState<PlayerState>({
    player1: false,
    player2: false,
    player3: false,
  });

  useEffect(() => {
    if (gameState === "active") {
      setTimeout(() => {
        setMessage("Wait for the signal...");
        const signalTime = Math.random() * 2000 + 2000; // 2 to 4 seconds delay
        setTimeout(() => {
          setMessage("DRAW!");
          setGameState("draw"); // Trigger the rotation of guns
        }, signalTime);
      }, 2000);
    }
  }, [gameState]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (gameState === "draw") {
        setPistolDirections((prevDirections) => {
          const newDirections = { ...prevDirections };
          switch (event.key) {
            case "a": // Player 1 aims left at Player 3
              newDirections.player1 = "left";
              break;
            case "s": // Player 1 fires
              setBullets((prevBullets) => ({ ...prevBullets, player1: true }));
              setTimeout(
                () =>
                  setBullets((prevBullets) => ({
                    ...prevBullets,
                    player1: false,
                  })),
                500
              );
              // Check if player1 hit player2 or player3 based on aim
              if (prevDirections.player1 === "right" && !deadPlayers.player2) {
                setDeadPlayers((prevDead) => ({ ...prevDead, player2: true }));
              } else if (
                prevDirections.player1 === "left" &&
                !deadPlayers.player3
              ) {
                setDeadPlayers((prevDead) => ({ ...prevDead, player3: true }));
              }
              break;
            case "d": // Player 1 aims right at Player 2
              newDirections.player1 = "right";
              break;
            case "l": // Player 2 aims left at Player 1
              newDirections.player2 = "left";
              break;
            case "ö": // Player 2 fires
              setBullets((prevBullets) => ({ ...prevBullets, player2: true }));
              setTimeout(
                () =>
                  setBullets((prevBullets) => ({
                    ...prevBullets,
                    player2: false,
                  })),
                500
              );
              if (prevDirections.player2 === "right" && !deadPlayers.player3) {
                setDeadPlayers((prevDead) => ({ ...prevDead, player3: true }));
              } else if (
                prevDirections.player2 === "left" &&
                !deadPlayers.player1
              ) {
                setDeadPlayers((prevDead) => ({ ...prevDead, player1: true }));
              }
              break;
            case "ä": // Player 2 aims right at Player 3
              newDirections.player2 = "right";
              break;
            case "1": // Player 3 aims left at Player 2
              newDirections.player3 = "left";
              break;
            case "2": // Player 3 fires
              setBullets((prevBullets) => ({ ...prevBullets, player3: true }));
              setTimeout(
                () =>
                  setBullets((prevBullets) => ({
                    ...prevBullets,
                    player3: false,
                  })),
                500
              );
              if (prevDirections.player3 === "right" && !deadPlayers.player1) {
                setDeadPlayers((prevDead) => ({ ...prevDead, player1: true }));
              } else if (
                prevDirections.player3 === "left" &&
                !deadPlayers.player2
              ) {
                setDeadPlayers((prevDead) => ({ ...prevDead, player2: true }));
              }
              break;
            case "3": // Player 3 aims right at Player 1
              newDirections.player3 = "right";
              break;
            default:
              break;
          }
          return newDirections;
        });
      }
    },
    [gameState, deadPlayers] // Dependencies: gameState and deadPlayers
  );

  useEffect(() => {
    if (gameState === "draw") {
      window.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameState, handleKeyPress]);

  useEffect(() => {
    const alivePlayers = Object.values(deadPlayers).filter(
      (dead) => !dead
    ).length;
    if (alivePlayers === 1) {
      setGameState("finished");
      let whoWon = "";
      if (!deadPlayers.player1) {
        whoWon = "player1";
      }
      if (!deadPlayers.player2) {
        whoWon = "player2";
      }
      if (!deadPlayers.player3) {
        whoWon = "player3";
      }
      const winnerName =
        players[whoWon === "player1" ? 0 : whoWon === "player2" ? 1 : 2];
      setWinner(winnerName);
      setMessage(`${winnerName} är BOSS!`);
    }
  }, [players, deadPlayers]);

  const startGame = () => {
    setGameState("active");
    setMessage("Walk away from each other...");
    setPistolDirections({
      player1: "center",
      player2: "center",
      player3: "center",
    });
  };

  return (
    <div className="p-4 bg-yellow-900 rounded-lg">
      <h2 className="text-2xl font-bold">The BOSS, the Bad and the Ugly</h2>
      <div className="flex flex-wrap justify-between gap-2 mt-2 mb-4 mr-1 sm:ml-10 sm:w-80">
        {players.map((p, i) => (
          <>
            <Badge className="bg-pink-500 hover:bg-pink-400">{p}</Badge>
            {i !== players.length - 1 && <span>versus</span>}
          </>
        ))}
      </div>
      <p>Tre personer, tre pistoler, en mexikansk standoff...</p>

      <div className="flex flex-col items-center ">
        {/* Guns in a Triangle */}
        <div className="relative w-full max-h-[70vh] max-w-[70vh] mt-6 aspect-square bg-yellow-950 rounded-xl">
          <p
            className={cn(
              "absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full md:text-xl bg-red-950 left-1/2 top-1/2",
              gameState !== "ready" && "p-2 md:p-10"
            )}
          >
            {message}
          </p>
          {/* Gun 1 (Top) */}
          <div
            className={cn(
              "absolute gunman",
              gameState === "active" ||
                gameState === "draw" ||
                gameState === "finished"
                ? "p1-move-out"
                : "p1-move-in"
            )}
          >
            <div
              className={cn(
                "gun-container",
                gameState === "draw"
                  ? getPistolRotation("player1", pistolDirections)
                  : "p1-rotate-away"
              )}
            >
              {!deadPlayers.player1 && (
                <div className={cn("pistol-container", "p1-rotate")}>
                  <Pistol />
                </div>
              )}
              {deadPlayers.player1 && (
                <div className="dead-player-indicator">
                  <Pistol />
                  <div className="red-circle"></div> {/* Add this red circle */}
                </div>
              )}
              {bullets.player1 && (
                <div className="p1-bullet-rotate">
                  <div className="absolute left-10 bottom-20 bullet-shape"></div>
                </div>
              )}
            </div>
          </div>

          {/* Gun 2 (Bottom Left) */}
          <div
            className={cn(
              "absolute gunman",
              gameState === "active" ||
                gameState === "draw" ||
                gameState === "finished"
                ? "p2-move-out"
                : "p2-move-in"
            )}
          >
            <div
              className={cn(
                "gun-container",
                gameState === "draw"
                  ? getPistolRotation("player2", pistolDirections)
                  : "p2-rotate-away"
              )}
            >
              {!deadPlayers.player2 && (
                <div className={cn("pistol-container", "p1-rotate")}>
                  <Pistol />
                </div>
              )}
              {deadPlayers.player2 && (
                <div className="dead-player-indicator">
                  <Pistol />
                  <div className="red-circle"></div> {/* Add this red circle */}
                </div>
              )}
              {bullets.player2 && (
                <div className="p2-bullet-rotate">
                  <div className="absolute left-10 bottom-20 bullet-shape"></div>
                </div>
              )}
            </div>
          </div>

          {/* Gun 3 (Bottom Right) */}
          <div
            className={cn(
              "absolute gunman",
              gameState === "active" ||
                gameState === "draw" ||
                gameState === "finished"
                ? "p3-move-out"
                : "p3-move-in"
            )}
          >
            <div
              className={cn(
                "gun-container",
                gameState === "draw"
                  ? getPistolRotation("player3", pistolDirections)
                  : "p3-rotate-away"
              )}
            >
              {!deadPlayers.player3 && (
                <div className={cn("pistol-container", "p1-rotate")}>
                  <Pistol facing="right" />
                </div>
              )}
              {deadPlayers.player3 && (
                <div className="dead-player-indicator">
                  <Pistol facing="right" />
                  <div className="red-circle"></div> {/* Add this red circle */}
                </div>
              )}
              {bullets.player3 && (
                <div className="p3-bullet-rotate">
                  <div className="absolute right-10 bottom-20 bullet-shape"></div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4">
          {gameState === "ready" && (
            <Button
              className="px-4 py-2 text-white bg-yellow-600 hover:bg-yellow-500"
              onClick={startGame}
            >
              Vem är BOSS?
            </Button>
          )}
          {gameState === "finished" && (
            <Button
              className="bg-green-700 hover:bg-green-500"
              onClick={() => {
                const scores = [0, 0, 0].map((s, i) => ({
                  score: players[i] === winner ? 10000 : s,
                  player: players[i],
                }));
                onGameComplete(scores);
              }}
            >
              Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const getPistolRotation = (
  player: "player1" | "player2" | "player3",
  pistolDirections: Directions
) => {
  const rotations = {
    player1: {
      away: "p1-rotate-away",
      center: "p1-rotate-center",
      left: "p1-rotate-left",
      right: "p1-rotate-right",
    },
    player2: {
      away: "p2-rotate-away",
      center: "p2-rotate-center",
      left: "p2-rotate-left",
      right: "p2-rotate-right",
    },
    player3: {
      away: "p3-rotate-away",
      center: "p3-rotate-center",
      left: "p3-rotate-left",
      right: "p3-rotate-right",
    },
  };
  const rotation = pistolDirections[player];
  if (!rotation) return undefined;
  return rotations[player][rotation];
};
