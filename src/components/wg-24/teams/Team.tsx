import { PlayerCard } from "./PlayerCard";
import { cn } from "@/lib/utils";
import { ITeam } from "./teams";
import { useEffect, useState } from "react";
import { IPlayer } from "./players";
import { Phase } from "../Layout";

const sortByScore = (a: IPlayer, b: IPlayer) => {
  if (!a.wins || !b.wins) return 0;
  if (a.wins > b.wins) return -1;
  if (a.wins < b.wins) return 1;
  return 0;
};

interface TeamProps extends ITeam {
  isUnOpposed: boolean;
  highlightedPlayers: IPlayer[];
  phase: Phase;
  onMovePlayer: (name: string) => void;
}

export const Team = ({
  name,
  color,
  players,
  minimized,
  rightAligned,
  highlightedPlayers,
  phase,
  isUnOpposed,
  onMovePlayer,
}: TeamProps) => {
  const [justifyStartApplied, setJustifyStartApplied] = useState(false);
  const sortedPlayers = players.sort(sortByScore);
  const cardSize = 100 / players.length - 6;

  // Delay the application of justify-start until after fade out
  useEffect(() => {
    if (minimized) {
      const timer = setTimeout(() => {
        setJustifyStartApplied(true);
      }, 500); // Delay for the same duration as your opacity transition (500ms)
      return () => clearTimeout(timer); // Clean up the timeout
    } else {
      setJustifyStartApplied(false); // Reset when not minimized
    }
  }, [minimized]);

  const calculateWidth = () => {
    if (minimized) return `calc(${cardSize}vh + 1px)`;
    if (isUnOpposed) return "98vw";
    return "calc(50vw - 2rem)";
  };

  return (
    <div
      data-testid={name}
      className={cn(
        "mt-2 !w-fit 2xl:!w-full flex flex-col h-[94vh] shadow-md z-20 transition-all duration-500",
        minimized ? "hidden 2xl:block" : "block",
        rightAligned ? "mr-2" : "ml-2"
      )}
      style={{
        maxWidth: minimized ? "20vh" : "100%",
        minWidth: "9.5vh",
        width: calculateWidth(),
      }}
    >
      <h3
        className={cn(
          "flex p-2 2xl:py-8 2xl:px-4 text-black text-lg 2xl:text-[4vh] border-2 border-black",
          color === "red" ? "rusty-red" : "stormy-seas-accent",
          minimized && justifyStartApplied
            ? "justify-start"
            : "justify-between", // Apply justify-start after fade
          rightAligned && "flex-row-reverse"
        )}
      >
        <strong>{name}</strong>
        <strong
          className={cn(
            "hidden 2xl:inline transition-opacity duration-500",
            minimized ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          Vinster/Förluster
        </strong>
      </h3>
      {sortedPlayers.map((player, index) => (
        <PlayerCard
          key={index}
          {...player}
          minimized={minimized}
          rightAligned={rightAligned}
          highlighted={highlightedPlayers.some((hp) => hp.name === player.name)}
          phase={phase}
          playerCount={players.length}
          justifyStartApplied={justifyStartApplied}
          onMovePlayer={onMovePlayer}
        />
      ))}
    </div>
  );
};
