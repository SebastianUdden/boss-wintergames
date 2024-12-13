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
        "aspect-square text-[4vh] flex items-center justify-center",
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
        // className="object-cover w-full h-auto border border-black shadow-lg aspect-square"
        <p>{name.slice(0, 2).toUpperCase()}</p>
      )}
    </div>
  );
};
