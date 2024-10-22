import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";
import { IPlayer } from "./players";
import { useEffect, useState } from "react";

interface IPlayerCard extends IPlayer {
  highlighted: boolean;
  rightAligned: boolean;
  minimized: boolean;
  playerCount: number;
  justifyStartApplied: boolean;
}

export const PlayerCard = ({
  name,
  image,
  rightAligned,
  minimized = true,
  highlighted,
  playerCount,
  wins,
  losses,
  showScore,
  justifyStartApplied,
}: IPlayerCard) => {
  const size = 75 / playerCount;

  const [showScoreIsPositive, setShowScoreIsPositive] = useState(false);
  const [showScoreIsNegative, setShowScoreIsNegative] = useState(false);

  useEffect(() => {
    if (!showScore) {
      setShowScoreIsNegative(false);
      setShowScoreIsPositive(false);
      return;
    }
    setTimeout(() => {
      setShowScoreIsNegative(showScore < 0);
      setShowScoreIsPositive(showScore > 0);
    }, 2000);
  }, [showScore]);

  return (
    <div
      className={cn(
        "flex black-sails p-0 transition-all",
        minimized && justifyStartApplied
          ? "justify-start items-center"
          : "justify-between items-center",
        rightAligned ? "flex-row-reverse" : "",
        minimized && justifyStartApplied && highlighted && rightAligned
          ? "-translate-x-[0.7vh]"
          : "",
        minimized && justifyStartApplied && highlighted && !rightAligned
          ? "translate-x-[0.7vh]"
          : "",
        !minimized && rightAligned ? "pl-[1vh]" : "",
        !minimized && !rightAligned ? "pr-[1vh]" : "",
        "!max-w-[10vh] 2xl:!max-w-full"
      )}
      style={{
        backgroundColor: highlighted ? "#1e1e1eff" : "#1e1e1ebb",
        height: `${size}vh`,
        maxHeight: "20vh",
      }}
    >
      <div
        className={cn(
          "relative flex items-center justify-center gap-6",
          highlighted ? "scale-110 z-10" : "z-0",
          rightAligned ? "flex-row-reverse" : ""
        )}
      >
        <Avatar
          name={name}
          image={image}
          size={size}
          score={0}
          highlighted={highlighted}
        />
        <p
          className={cn(
            "absolute top-0 text-white bg-black/70 p-2 2xl:bg-inherit 2xl:static text-sm 2xl:text-[4vh] font-bold transition-all duration-500",
            minimized ? "opacity-0" : "opacity-100",
            minimized && justifyStartApplied ? "hidden" : "",
            rightAligned ? "left-0" : "right-0"
          )}
        >
          {name}
        </p>
        <span
          className={cn(
            "absolute inline p-2 italic text-white bg-black/70 text-sm bottom-0 2xl:hidden",
            rightAligned ? "right-0" : "left-0"
          )}
        >
          {wins} / {losses}
        </span>
      </div>
      <p
        className={cn(
          "hidden 2xl:flex  items-center gap-6 text-md 2xl:text-[4vh] italic text-orange-400 transition-all duration-500",
          minimized ? "opacity-0" : "opacity-100",
          minimized && justifyStartApplied ? "hidden" : "",
          rightAligned ? "" : "flex-row-reverse"
        )}
      >
        {wins} / {losses}
        <span
          className={cn(
            "text-md 2xl:text-[3vh] opacity-0 font-pirata transition-all duration-300",
            rightAligned ? "translate-x-40" : "-translate-x-40",
            showScoreIsPositive ? "text-green-700" : "",
            showScoreIsNegative ? "text-red-700" : "",
            showScoreIsPositive || showScoreIsNegative
              ? "opacity-100 translate-x-0"
              : ""
          )}
        >
          {showScoreIsPositive && "+"}
          {showScore?.toLocaleString("se-SE", {
            useGrouping: true,
          })}
        </span>
      </p>
    </div>
  );
};
