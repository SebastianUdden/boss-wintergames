import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";
import { IPlayer } from "./players";
import { useEffect, useState } from "react";
import { Phase } from "../Layout";

interface IPlayerCard extends IPlayer {
  highlighted: boolean;
  phase: Phase;
  rightAligned: boolean;
  minimized: boolean;
  playerCount: number;
  justifyStartApplied: boolean;
  onMovePlayer: (name: string) => void;
}

export const PlayerCard = ({
  name,
  image,
  rightAligned,
  minimized = true,
  highlighted,
  isCaptive,
  isCaptain,
  phase,
  playerCount,
  wins,
  losses,
  showScore,
  justifyStartApplied,
  onMovePlayer,
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
      data-testId={name}
      onClick={() => {
        if (phase === "captains-choice" && !isCaptain) {
          onMovePlayer(name);
        }
      }}
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
        phase === "captains-choice" &&
          !isCaptain &&
          rightAligned &&
          "cursor-pointer hover:border-r-white hover:border-r-8",
        phase === "captains-choice" &&
          !isCaptain &&
          !rightAligned &&
          "cursor-pointer hover:border-l-white hover:border-l-8",
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
        {highlighted &&
          (phase === "selecting-players" || phase === "playing-game") && (
            <div className="relative w-[10vh] h-[10vh]">
              {isCaptive && (
                <img
                  className={cn(
                    "absolute top-10 left-5",
                    rightAligned ? "scale-y-[-1]" : ""
                  )}
                  style={{
                    height: `${size}vh`,
                    maxHeight: "6vh",
                    maxWidth: "6vh",
                  }}
                  src="/leaderboard/ball-chain.png"
                />
              )}
              {isCaptain && (
                <img
                  className={cn(
                    "absolute top-10 left-5",
                    rightAligned ? "scale-x-[-1]" : ""
                  )}
                  style={{
                    height: `${size}vh`,
                    maxHeight: "6vh",
                    maxWidth: "6vh",
                  }}
                  src="/leaderboard/captain.png"
                />
              )}
              <img
                className={cn(
                  "absolute top-0 left-0 object-cover -rotate-90 aspect-square",
                  rightAligned ? "scale-y-[-1]" : ""
                )}
                style={{
                  height: `${size}vh`,
                  maxHeight: "10vh",
                  maxWidth: "10vh",
                }}
                src="/leaderboard/cutlass.png"
              />
            </div>
          )}
        {isCaptive && !highlighted && phase !== "playing-game" && (
          <img
            className={cn(
              "w-[10vh] h-[10vh]",
              rightAligned ? "scale-x-[-1]" : ""
            )}
            style={{
              height: `${size}vh`,
              maxHeight: "6vh",
              maxWidth: "6vh",
            }}
            src="/leaderboard/ball-chain.png"
          />
        )}
        {isCaptain && !highlighted && phase !== "playing-game" && (
          <img
            className={cn(
              "w-[10vh] h-[10vh]",
              rightAligned ? "scale-x-[-1]" : ""
            )}
            style={{
              height: `${size}vh`,
              maxHeight: "6vh",
              maxWidth: "6vh",
            }}
            src="/leaderboard/captain.png"
          />
        )}
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
