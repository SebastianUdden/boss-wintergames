import { cn } from "@/lib/utils";
import { IPlayer } from "../teams/players";

interface IPlayers {
  players: IPlayer[];
  onSelect: (player: IPlayer) => void;
}

export const Players = ({ players, disableSelection, onSelect }: IPlayers) => {
  return (
    <div className="flex flex-wrap gap-4">
      {players.map((p) => (
        <div
          key={p.name}
          className="relative overflow-hidden rounded-full aged-scroll-border w-[10vh] h-[10vh] select-none"
        >
          <img
            className="object-cover transition-transform origin-center aspect-square"
            src={p.image}
            style={{
              width: "10vh",
              height: "10vh",
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
