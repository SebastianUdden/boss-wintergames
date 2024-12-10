import { cn } from "@/lib/utils";

export interface ICard {
  pairId: number;
  isFlipped: boolean;
  img: string;
  matchedBy?: number;
}

interface ICardProps extends ICard {
  isActive: boolean;
  index: number;
  borderColor: string;
  canFlip: boolean;
  isMatched: boolean;
  onClick: () => void;
  onHover: () => void;
}

export const Card = ({
  borderColor,
  isFlipped,
  isMatched,
  pairId,
  img,
  isActive,
  canFlip,
  onClick,
  onHover,
}: ICardProps) => (
  // <div className="relative outline-none">
  //   <button
  //     className={cn(
  //       "flex items-center justify-center cursor-pointer border-none outline-none p-0 bg-black rounded-md hover:outline-none hover:border-none focus:outline-none focus:border-none",
  //       isMatched ? "cursor-default" : ""
  //     )}
  //     disabled={isMatched}
  //     onClick={onClick}
  //     onMouseOver={onHover}
  //     style={{
  //       width: "min(15vh, 7vw)",
  //       height: "min(15vh, 7vw)",
  //     }}
  //   >
  //     {isFlipped &&
  //       !isMatched &&
  //       (img ? (
  //         <img src={img} className="w-full rounded-md outline-none" />
  //       ) : (
  //         <span className="text-1xl">{pairId}</span>
  //       ))}
  //     {!isFlipped && !isMatched && (
  //       <img src="/games/memory/boss.png" className="w-full rounded-md" />
  //     )}
  //   </button>
  //   <div
  //     className={cn(
  //       "absolute inset-0 border-8 pointer-events-none outline-none rounded-md",
  //       borderColor,
  //       isActive && !isMatched && canFlip ? "opacity-100" : "opacity-0"
  //     )}
  //   />
  // </div>
  <div
    className="relative"
    style={{
      perspective: "1000px", // Enable 3D effect
    }}
  >
    {/* Flip container */}
    <div
      className={cn(
        "w-full h-full transition-transform duration-500",
        isFlipped ? "transform rotate-y-180" : ""
      )}
      style={{
        transformStyle: "preserve-3d", // Enable 3D space
        width: "min(15vh, 7vw)",
        height: "min(15vh, 7vw)",
      }}
      onClick={onClick}
    >
      {!isMatched && (
        <>
          {/* Front Side */}
          <div
            className={cn(
              "absolute w-full h-full flex items-center justify-center text-white cursor-pointer",
              "backface-hidden"
            )}
            style={{
              backfaceVisibility: "hidden", // Ensure only one side is visible at a time
            }}
            onMouseOver={onHover}
          >
            <img src="/games/memory/boss.png" className="w-full rounded-md" />
            <div
              className={cn(
                "absolute inset-0 border-8 pointer-events-none outline-none rounded-md",
                borderColor,
                isActive && !isMatched && canFlip ? "opacity-100" : "opacity-0"
              )}
            />
          </div>

          {/* Back Side */}
          <div
            className={cn(
              "absolute flex items-center justify-center text-white",
              "backface-hidden"
            )}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)", // Rotate back face by 180 degrees initially
            }}
          >
            <img src={img} className="w-full rounded-md outline-none" />
          </div>
        </>
      )}
    </div>
  </div>
);
