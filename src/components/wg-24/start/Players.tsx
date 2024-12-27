import { cn } from "@/lib/utils";
import { IPlayer } from "../teams/players";

const size = "16vh";

interface IPlayers {
  players: IPlayer[];
  onSelect: (player: IPlayer) => void;
  disableSelection: boolean;
}

export const Players = ({ players, disableSelection, onSelect }: IPlayers) => {
  return (
    <div className="flex flex-wrap gap-4">
      {players.map((p) => (
        <div
          key={p.name}
          className={cn(
            `relative overflow-hidden rounded-full aged-scroll-border select-none`,
            size ? `w-[${size}] h-[${size}]` : "w-[10vh] h-[10vh]"
          )}
        >
          <img
            className="object-cover transition-transform origin-center aspect-square"
            src={p.image}
            style={{
              width: size ?? "10vh",
              height: size ?? "10vh",
              transformOrigin: "center",
            }}
          />
          <div
            className={cn(
              "absolute inset-0 bg-black bg-opacity-50 transition-all duration-300",
              disableSelection
                ? "bg-opacity-70"
                : "hover:bg-opacity-0 cursor-pointer"
            )}
            style={{ borderRadius: "inherit" }}
            onClick={() => !disableSelection && onSelect(p)}
          ></div>
        </div>
      ))}
    </div>
  );
};
