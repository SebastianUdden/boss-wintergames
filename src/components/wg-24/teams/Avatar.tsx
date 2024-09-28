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
        maxWidth: "2+vh",
      }}
      className={cn(
        highlighted ? "aged-scroll-border" : "border-2 border-black",
        "aspect-square text-[4vh] flex items-center justify-center"
      )}
    >
      {image ? (
        <img src={image} alt={name} style={{ width: "100%", height: "100%" }} />
      ) : (
        <p>{name.slice(0, 2).toUpperCase()}</p>
      )}
    </div>
  );
};
