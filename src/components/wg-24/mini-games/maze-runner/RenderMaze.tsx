import { cn } from "@/lib/utils";

interface RenderMazeProps {
  layout: string[];
  playerPosition: { x: number; y: number };
  secondPlayerPosition: { x: number; y: number };
  enemies: Array<{ x: number; y: number }>;
  dots: Set<string>;
  gridSize?: number;
  winner: "p1" | "p2" | false;
}

export const RenderMaze = ({
  layout,
  playerPosition,
  secondPlayerPosition,
  enemies,
  dots,
  gridSize = 50,
  winner,
}: RenderMazeProps) => {
  const remainingCoins = Array.from(dots);
  return (
    <div
      className="relative border-4 border-black"
      style={{
        width: layout[0].length * gridSize,
        height: layout.length * gridSize,
      }}
    >
      {layout.map((row, y) => (
        <div key={y} className="flex">
          {row.split("").map((cell, x) => {
            const player1Here =
              playerPosition.x === x && playerPosition.y === y;
            const player2Here =
              secondPlayerPosition.x === x && secondPlayerPosition.y === y;
            const enemyHere = enemies?.some(
              (enemy) => enemy.x === x && enemy.y === y
            );
            const wallHere = cell === "W";
            const dotHere = dots.has(`${x},${y}`);
            const floorHere =
              cell === "." || cell === "X" || cell === "Y" || wallHere;

            return (
              <div
                key={x}
                className={cn(
                  "flex items-center justify-center",
                  cell === "W" ? "rounded-lg" : "bg-black"
                )}
                style={{
                  width: gridSize,
                  height: gridSize,
                  position: "relative",
                }}
              >
                {wallHere && (
                  <img
                    src="/games/maze-runner/wall.webp"
                    alt="Wall"
                    className="absolute z-10 opacity-60"
                    style={{
                      width: gridSize,
                      height: gridSize,
                    }}
                  />
                )}
                {floorHere && (
                  <img
                    src="/games/maze-runner/wall.webp"
                    alt="Wall"
                    className="absolute z-10 rotate-90 opacity-40"
                    style={{
                      width: gridSize,
                      height: gridSize,
                    }}
                  />
                )}

                {player1Here && (
                  <img
                    src="/games/maze-runner/pirate.png"
                    alt="Player 1"
                    className={cn(
                      "absolute z-20",
                      winner === "p2"
                        ? "-rotate-90 translate-y-6 -translate-x-12 transition-transform duration-300"
                        : ""
                    )}
                    style={{
                      width: gridSize * 0.75,
                      height: gridSize * 0.75,
                    }}
                  />
                )}

                {player2Here && (
                  <img
                    src="/games/maze-runner/pirate2.png"
                    alt="Player 2"
                    className={cn(
                      "absolute z-20",
                      winner === "p1"
                        ? "rotate-90 translate-y-6 translate-x-12 transition-transform duration-300"
                        : ""
                    )}
                    style={{
                      width: gridSize * 0.75,
                      height: gridSize * 0.75,
                    }}
                  />
                )}
                {player2Here &&
                  remainingCoins.length === 1 &&
                  winner !== "p1" && (
                    <img
                      src="/games/maze-runner/aztec-coin.png"
                      alt="Aztec Coin"
                      className={cn(
                        "absolute z-10 -translate-x-4 -translate-y-1",
                        winner === "p2"
                          ? "transition-transform duration-300"
                          : ""
                      )}
                      style={{
                        width: gridSize * 0.4,
                        height: gridSize * 0.4,
                      }}
                    />
                  )}
                {dotHere &&
                  !enemyHere &&
                  !player1Here &&
                  remainingCoins.length !== 1 && (
                    <img
                      src="/games/maze-runner/aztec-coin.png"
                      alt="Aztec Coin"
                      className={cn(
                        "absolute z-10",
                        player2Here ? "-translate-y-1 -translate-x-4" : ""
                      )}
                      style={{
                        width: gridSize * 0.4,
                        height: gridSize * 0.4,
                      }}
                    />
                  )}

                {enemyHere && (
                  <div
                    className="absolute z-30 bg-red-500 rounded-full"
                    style={{
                      width: gridSize * 0.75,
                      height: gridSize * 0.75,
                    }}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
