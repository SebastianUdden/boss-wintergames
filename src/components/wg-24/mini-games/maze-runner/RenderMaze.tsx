interface RenderMazeProps {
  layout: string[];
  playerPosition: { x: number; y: number };
  enemies: Array<{ x: number; y: number }>;
  dots: Set<string>;
}

export const RenderMaze = ({
  layout,
  playerPosition,
  enemies,
  dots,
}: RenderMazeProps) => {
  return (
    <div className="relative w-[640px] h-[640px] border-4 border-black">
      {layout.map((row, y) => (
        <div key={y} className="flex">
          {row.split("").map((cell, x) => {
            const playerHere = playerPosition.x === x && playerPosition.y === y;
            const enemyHere = enemies.some(
              (enemy) => enemy.x === x && enemy.y === y
            );
            const dotHere = dots.has(`${x},${y}`);

            return (
              <div
                key={x}
                className={`flex justify-center items-center w-8 h-8 ${
                  cell === "W"
                    ? "bg-blue-500 rounded-lg border-2 border-blue-800"
                    : "bg-black"
                }`}
                style={{
                  position: "relative",
                }}
              >
                {dotHere && !enemyHere && !playerHere && (
                  <div className="absolute z-10 w-2 h-2 bg-white rounded-full"></div> // Dot (if no enemy or player is here)
                )}

                {playerHere && !enemyHere && (
                  <div className="absolute z-20 w-6 h-6 bg-yellow-500 rounded-full"></div> // Pacman-like player
                )}

                {enemyHere && (
                  <div className="absolute z-30 w-6 h-6 bg-red-500 rounded-full"></div> // Simple ghost enemies
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
