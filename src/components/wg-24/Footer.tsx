import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { Phase } from "./Layout";

interface IFooter {
  phase: string;
  highlightedPlayer: string;
  handleSelectNextPlayer: () => void;
  setPhase: Dispatch<SetStateAction<Phase>>;
}
export const Footer = ({
  phase,
  highlightedPlayer,
  handleSelectNextPlayer,
  setPhase,
}: IFooter) => (
  <div
    className={cn(
      "fixed bottom-0 left-1/2 -translate-x-1/2 z-20 transition-transform duration-1000", // Fixed positioning relative to the viewport
      phase === "ready" || phase === "waiting-for-spin"
        ? "translate-y-0"
        : "translate-y-full" // Move footer out of view when not in the correct phase
    )}
  >
    <button
      onClick={() => {
        if (phase === "ready") {
          handleSelectNextPlayer();
        }
        if (phase === "waiting-for-spin") {
          setPhase("spinning-wheel");
        }
      }}
      disabled={phase === "selecting-player"}
      className="!text-lg 2xl:!text-4xl treasure bottom-button"
    >
      {(phase === "ready" || phase === "selecting-player") &&
        "Who's the brave soul?"}
      {(phase === "waiting-for-spin" || phase === "spinning-wheel") &&
        `Spin it ${highlightedPlayer}!`}
    </button>
  </div>
);
