import { cn } from "@/lib/utils";
import { IPlayer } from "./players";

interface IAvatar extends IPlayer {
  size: number;
  highlighted: boolean;
}

export const Avatar = ({ name, image, size, highlighted }: IAvatar) => {
  return (
    <div
      style={{
        height: `${size}vh`,
        maxHeight: `20vh`, // Ensure it doesn’t exceed these dimensions
        maxWidth: "20vh",
      }}
      className={cn(
        highlighted ? "aged-scroll-border z-50" : "border-2 border-black z-20",
        "relative aspect-square text-[4vh] flex items-center justify-center",
        "!max-w-[10vh] 2xl:!max-w-full"
      )}
    >
      {image ? (
        <img
          className="object-cover aspect-square"
          src={image}
          alt={name}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <p>{name.slice(0, 2).toUpperCase()}</p>
      )}

      {/* Black overlay if not highlighted */}
      {!highlighted && (
        <div
          className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"
          style={{ borderRadius: "inherit" }} // Matches parent border-radius
        ></div>
      )}
    </div>
  );
};
