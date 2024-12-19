import { cn } from "@/lib/utils";
import { IPlayer } from "./players";
import { Phase } from "../Layout";

interface IAvatar extends IPlayer {
  size: number;
  highlighted: boolean;
  phase: Phase;
}

export const Avatar = ({ name, image, size, highlighted, phase }: IAvatar) => {
  return (
    <div
      style={{
        height: `${size}vh`,
        maxHeight: `20vh`, // Ensure it doesn’t exceed these dimensions
        maxWidth: "20vh",
        overflow: "hidden", // Prevent the image from spilling outside the box
      }}
      className={cn(
        highlighted ? "aged-scroll-border z-50" : "border-2 border-black z-20",
        "relative aspect-square text-[4vh] flex items-center justify-center",
        "!max-w-[10vh] 2xl:!max-w-full"
      )}
    >
      {image ? (
        <img
          className={cn(
            "object-cover aspect-square transition-transform origin-center",
            (phase === "showing-combatants" || phase === "captains-choice") &&
              highlighted
              ? "scale-[1.8]"
              : "scale-100" // Scale on highlight
          )}
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            transformOrigin: "center", // Ensure zoom happens from the center
            transitionDuration: "3000ms",
          }}
        />
      ) : (
        <p>{name.slice(0, 2).toUpperCase()}</p>
      )}

      {/* Black overlay if not highlighted */}
      {!highlighted && phase !== "ready" && phase !== "waiting-for-spin" && (
        <div
          className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"
          style={{ borderRadius: "inherit" }} // Matches parent border-radius
        ></div>
      )}
    </div>
  );
};
