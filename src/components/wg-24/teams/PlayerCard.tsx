import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";
import { IPlayer } from "./players";
import { useEffect, useState } from "react";
import { Phase } from "../Layout";
import { BallChainIcon, CaptainIcon, CutlassIcon } from "./CardIcons";

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

  const isHighlightPhase =
    phase === "selecting-players" ||
    phase === "showing-combatants" ||
    phase === "playing-game" ||
    phase === "calculating-score" ||
    phase === "selecting-captive" ||
    phase === "transitioning-captive";
  const highlight = isHighlightPhase && highlighted;
  const shouldShowBallChain =
    isCaptive && (!highlighted || phase !== "playing-game");
  const shouldShowCaptainIcon =
    isCaptain && (!highlighted || phase !== "playing-game");
  const shouldShowCutlassIcon = highlighted && phase === "showing-combatants";

  return (
    <div
      data-id={name}
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
        minimized && justifyStartApplied && highlight && rightAligned
          ? "-translate-x-[0.7vh]"
          : "",
        minimized && justifyStartApplied && highlight && !rightAligned
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
        backgroundColor: highlight ? "#1e1e1eff" : "#1e1e1ebb",
        height: `${size}vh`,
        maxHeight: "20vh",
      }}
    >
      <div
        className={cn(
          "relative flex items-center justify-center gap-6",
          rightAligned ? "flex-row-reverse" : ""
        )}
      >
        <Avatar
          name={name}
          image={image}
          size={size}
          score={0}
          highlighted={highlighted || !isHighlightPhase}
          phase={phase}
        />
        {!minimized && (
          <>
            <div
              className={cn(
                "absolute flex items-center gap-6 top-0 text-white bg-black/70 p-2 2xl:bg-inherit 2xl:static text-sm 2xl:text-[4vh] font-bold transition-all duration-500",
                minimized ? "opacity-0" : "opacity-100",
                minimized && justifyStartApplied ? "hidden" : "",
                rightAligned ? "left-0 flex-row-reverse" : "right-0"
              )}
            >
              {name}
              {(isCaptain ||
                isCaptive ||
                (highlighted && phase === "showing-combatants")) && (
                <div className="relative z-40 bg-black aged-scroll-border rounded-full w-[7vh] h-[7vh] flex justify-center items-center">
                  {highlighted && isHighlightPhase && (
                    <>
                      {isCaptive && (
                        <BallChainIcon
                          size={size}
                          rightAligned={rightAligned}
                        />
                      )}
                      {isCaptain && (
                        <CaptainIcon size={size} rightAligned={rightAligned} />
                      )}
                      {shouldShowCutlassIcon && (
                        <CutlassIcon size={size} rightAligned={rightAligned} />
                      )}
                    </>
                  )}
                  {shouldShowBallChain && (
                    <BallChainIcon size={size} rightAligned={rightAligned} />
                  )}
                  {shouldShowCaptainIcon && (
                    <CaptainIcon size={size} rightAligned={rightAligned} />
                  )}
                </div>
              )}
            </div>
          </>
        )}
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
