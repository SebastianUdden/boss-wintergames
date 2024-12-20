import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { Phase } from "./Layout";

interface IFooter {
  phase: string;
  setPhase: Dispatch<SetStateAction<Phase>>;
  showEndGame?: boolean;
}
export const Footer = ({ phase, setPhase, showEndGame }: IFooter) => (
  <div
    className={cn(
      "fixed bottom-0 left-1/2 -translate-x-1/2 z-20 transition-transform duration-1000", // Fixed positioning relative to the viewport
      phase === "ready" ||
        phase === "waiting-for-spin" ||
        phase === "explaining-game"
        ? "translate-y-0"
        : "translate-y-full" // Move footer out of view when not in the correct phase
    )}
  >
    <button
      onClick={() => {
        if (phase === "ready") {
          setPhase("waiting-for-spin");
        }
        if (phase === "waiting-for-spin") {
          setPhase("spinning-wheel");
        }
        if (phase === "explaining-game") {
          setPhase("selecting-players");
        }
      }}
      disabled={phase === "selecting-players"}
      className="!text-lg 2xl:!text-4xl treasure bottom-button"
    >
      {phase === "ready" && showEndGame && "I deserve another chance ye hear!"}
      {phase === "ready" && !showEndGame && "Hoist the sails, adventure calls!"}
      {(phase === "waiting-for-spin" || phase === "spinning-wheel") &&
        "Dare ye spin for a game?"}
      {phase === "selecting-players" && "Who's the brave soul?"}
      {phase === "explaining-game" && "Find the brave souls!"}
    </button>
  </div>
);
