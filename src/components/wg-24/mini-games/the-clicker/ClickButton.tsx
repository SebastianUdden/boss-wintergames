import { Button } from "@/components/wg-24/ui/button";
import { GameState } from "../gameState";
import { cn } from "@/lib/utils";

const getButtonColor = (multiplier: number) => {
  if (multiplier === 5) return "bg-red-500 hover:bg-red-600";
  if (multiplier === 3) return "bg-teal-500 hover:bg-teal-600";
  if (multiplier === 2) return "bg-blue-500 hover:bg-blue-600";
  return "bg-gray-600 hover:bg-gray-700";
};

interface IClickButton {
  gameState: GameState;
  multiplier: number;
  handleClick: () => void;
  turn: number;
  p1Score: number;
  p2Score: number;
}

export const ClickButton = ({
  gameState,
  multiplier,
  turn,
  p1Score,
  p2Score,
  handleClick,
}: IClickButton) => {
  return (
    <Button
      disabled={gameState === "finished"}
      className={cn(
        "w-1/4 p-12 text-5xl text-white rounded-full outline-none select-none border-none",
        getButtonColor(multiplier)
      )}
      onClick={handleClick}
    >
      {turn === 0 ? p1Score : gameState === "next" ? "Get ready!" : p2Score}
      {multiplier === 1 ? "" : ` x${multiplier}`}
    </Button>
  );
};
