import { Badge } from "@/components/wg-24/ui/badge";
import { Button } from "@/components/wg-24/ui/button";
import { useState, useEffect } from "react";
import { MiniGameProps } from "../MiniGame";
import { Pistol } from "./Pistol"; // Import the Pistol component
import { cn } from "@/lib/utils";
import "./pistol.css";

type GameState = "ready" | "active" | "draw" | "finished";
type Direction = "left" | "right" | "center" | "away";
interface Directions {
  player1: Direction;
  player2: Direction;
  player3: Direction;
}
export const QuickDraw = ({ players, onGameComplete }: MiniGameProps) => {
  const [gameState, setGameState] = useState<GameState>("ready");
  const [message, setMessage] = useState("");

  const [bullets, setBullets] = useState({
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

  const [deadPlayers, setDeadPlayers] = useState({
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

  const handleKeyPress = (event: KeyboardEvent) => {
    if (gameState === "draw") {
      switch (event.key) {
        case "a": // Player 1 aims left at Player 3
          setPistolDirections((prev) => ({ ...prev, player1: "left" }));
          break;
        case "s": // Player 1 fires
          setBullets({ ...bullets, player1: true });
          setTimeout(() => setBullets({ ...bullets, player1: false }), 500);

          // Check if player1 hit player2 or player3 based on aim
          if (pistolDirections.player1 === "right" && !deadPlayers.player2) {
            setDeadPlayers({ ...deadPlayers, player2: true });
          } else if (
            pistolDirections.player1 === "left" &&
            !deadPlayers.player3
          ) {
            setDeadPlayers({ ...deadPlayers, player3: true });
          }
          break;
        case "d": // Player 1 aims right at Player 2
          setPistolDirections((prev) => ({ ...prev, player1: "right" }));
          break;
        case "l": // Player 2 aims left at Player 1
          setPistolDirections((prev) => ({ ...prev, player2: "left" }));
          break;
        case "ö": // Player 2 fires
          setBullets({ ...bullets, player2: true });
          setTimeout(() => setBullets({ ...bullets, player2: false }), 500);
          break;
        case "ä": // Player 2 aims right at Player 3
          setPistolDirections((prev) => ({ ...prev, player2: "right" }));
          break;
        case "1": // Player 3 aims left at Player 2
          setPistolDirections((prev) => ({ ...prev, player3: "left" }));
          break;
        case "2": // Player 3 fires
          setBullets({ ...bullets, player3: true });
          setTimeout(() => setBullets({ ...bullets, player3: false }), 500);
          break;
        case "3": // Player 3 aims right at Player 1
          setPistolDirections((prev) => ({ ...prev, player3: "right" }));
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (gameState === "draw") {
      window.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameState]);

  useEffect(() => {
    const alivePlayers = Object.values(deadPlayers).filter(
      (dead) => !dead
    ).length;
    if (alivePlayers === 1) {
      setGameState("finished");
      const winner = Object.keys(deadPlayers).find(
        (player) => !deadPlayers[player]
      );
      setMessage(
        `Winner: ${
          players[winner === "player1" ? 0 : winner === "player2" ? 1 : 2].name
        }`
      );
    }
  }, [deadPlayers]);

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
      <h2 className="text-2xl font-bold">Boss, Bad, Ugly</h2>
      <Badge className="bg-pink-500 hover:bg-pink-400">1v1v1</Badge>
      <p>Tre personer, tre pistoler, en mexikansk standoff...</p>

      <div className="flex flex-col items-center ">
        <div className="mt-4">
          <Button
            disabled={gameState !== "ready"}
            className="px-4 py-2 text-white bg-yellow-600 hover:bg-yellow-500"
            onClick={startGame}
          >
            Vem är BOSS?
          </Button>
        </div>

        {/* Guns in a Triangle */}
        <div className="relative w-full max-h-[70vh] max-w-[70vh] mt-6 aspect-square bg-yellow-950 rounded-xl">
          {/* Gun 1 (Top) */}
          <div
            className={cn(
              "absolute gunman",
              gameState === "active" || gameState === "draw"
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
                  <Pistol facing="down" />
                </div>
              )}
              {deadPlayers.player1 && (
                <div className="dead-player-indicator">
                  <Pistol facing="down" className="grayscale" />
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
              gameState === "active" || gameState === "draw"
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
                  <Pistol facing="down" />
                </div>
              )}
              {deadPlayers.player2 && (
                <div className="dead-player-indicator">
                  <Pistol facing="down" className="grayscale" />
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
              gameState === "active" || gameState === "draw"
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

        <p className="mt-4 text-lg">{message}</p>

        {gameState === "finished" && (
          <Button
            className="bg-green-700 hover:bg-green-500"
            onClick={() => {
              // Finish game logic here
            }}
          >
            Complete
          </Button>
        )}
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
