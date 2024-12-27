import { Button } from "@/components/wg-24/ui/button";
import { GameState } from "../gameState";
import { cn } from "@/lib/utils";
import { imageRotations } from "./imageRotations";

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
  imageIndex: number;
}

export const ClickButton = ({
  gameState,
  multiplier,
  turn,
  p1Score,
  p2Score,
  handleClick,
  imageIndex,
}: IClickButton) => {
  return (
    <Button
      disabled={gameState === "finished"}
      className={cn(
        "flex w-1/2 p-12 text-5xl text-white rounded-full outline-none select-none border-none gap-4",
        getButtonColor(multiplier)
      )}
      onClick={handleClick}
    >
      {imageIndex <= 20 && (
        <div
          className={cn(
            "w-[15vh] h-[15vh] bg-[url('games/the-clicker/click-grid.png')] bg-[0%_0%] bg-[length:400%]"
          )}
        ></div>
      )}
      {imageIndex > 20 && (
        <img src={imageRotations[imageIndex]} className="w-[8vh] select-none" />
      )}
      {turn === 0 ? p1Score : gameState === "next" ? "Get ready!" : p2Score}
      {multiplier === 2 && (
        <img
          src="games/the-clicker/tombRaider.png"
          className="w-[8vh] select-none"
        />
      )}
      {multiplier === 3 && (
        <img
          src="games/the-clicker/ultraLeech.png"
          className="w-[8vh] select-none"
        />
      )}
      {multiplier === 5 && (
        <img
          src="games/the-clicker/miniGun.png"
          className="w-[8vh] select-none"
        />
      )}
    </Button>
  );
};
