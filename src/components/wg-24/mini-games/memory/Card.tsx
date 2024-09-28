import { cn } from "@/lib/utils";

interface ICard {
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export const Card = ({ isFlipped, isMatched, pairId, onClick }: ICard) => (
  <button
    className={cn(
      "w-[7vh] h-[7vh] md:w-[10vw] md:h-[10vw] flex items-center justify-center cursor-pointer border-none outline-none",
      isFlipped || isMatched ? "bg-pink-600" : "bg-gray-700"
    )}
    onClick={onClick}
  >
    {isFlipped || isMatched ? (
      <span className="text-1xl">{pairId}</span>
    ) : (
      <span></span>
    )}
  </button>
);
