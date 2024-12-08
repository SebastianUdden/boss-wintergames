import { cn } from "@/lib/utils";

interface ICard {
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
  isActive: boolean;
  img: string;
  onClick: () => void;
}

export const Card = ({
  isFlipped,
  isMatched,
  pairId,
  img,
  isActive,
  onClick,
}: ICard) => (
  <button
    className={cn(
      "w-[6vh] h-[6vh] md:w-[8vw] md:h-[8vw] flex items-center justify-center cursor-pointer outline-none p-0 bg-black",
      isActive && !isMatched ? "border-4 border-blue-500" : "border-none",
      isMatched ? "cursor-default" : ""
    )}
    disabled={isMatched}
    onClick={onClick}
  >
    {isFlipped &&
      !isMatched &&
      (img ? (
        <img src={img} className="w-full" />
      ) : (
        <span className="text-1xl">{pairId}</span>
      ))}
    {!isFlipped && !isMatched && (
      <img src="/games/memory/boss.png" className="w-full" />
    )}
  </button>
);
