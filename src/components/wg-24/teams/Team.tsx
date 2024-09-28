import { PlayerCard } from "./PlayerCard";
import { cn } from "@/lib/utils";
import { ITeam } from "./teams";
import { useEffect, useState } from "react";

const sortByScore = (a, b) => {
  if (a.wins > b.wins) return -1;
  if (a.wins < b.wins) return 1;
  return 0;
};

interface TeamProps extends ITeam {
  isUnOpposed: boolean;
  highlightedPlayer: string;
}

export const Team = ({
  name,
  color,
  players,
  minimized,
  rightAligned,
  highlightedPlayer,
  isUnOpposed,
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

  return (
    <div
      className={cn(
        "flex flex-col h-[94vh] shadow-md z-20 transition-all duration-500"
      )}
      style={{
        maxWidth: minimized ? "20vh" : "100%",
        minWidth: "9.5vh",
        width: minimized
          ? `calc(${cardSize}vh + 1px)` // Adjusting width dynamically
          : isUnOpposed
          ? "98vw"
          : "calc(50vw - 2rem)", // Slight padding adjustment
      }}
    >
      <h3
        className={cn(
          "flex px-4 py-4 text-black text-[4vh] border-2 border-black",
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
            "transition-opacity duration-500",
            minimized ? "opacity-0" : "opacity-100"
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
          highlighted={player.name === highlightedPlayer}
          playerCount={players.length}
          justifyStartApplied={justifyStartApplied}
        />
      ))}
    </div>
  );
};
