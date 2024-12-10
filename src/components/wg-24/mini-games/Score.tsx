import { Label } from "../ui/label";
import { IPlayer } from "../teams/players";
import { cn } from "@/lib/utils";

export interface IScore {
  player: IPlayer;
  score: number;
}

interface IScoreProps extends IScore {
  isActive?: boolean;
  isRight?: boolean;
}

export const Score = ({ player, score, isActive, isRight }: IScoreProps) => (
  <div className="relative w-full ">
    {/* Content container */}
    <div
      className={cn(
        "flex justify-between p-6 rounded-md relative z-10",
        !isRight ? "flex-row-reverse" : "flex-row"
      )}
    >
      <img src={player.image} className="w-[10vh]" />
      <div className={cn("flex flex-col-reverse", isRight ? "text-right" : "")}>
        <Label className="text-2xl">{player.name}</Label>
        <h2 className="text-8xl">
          {score.toLocaleString("se-SE", {
            useGrouping: true,
          })}
        </h2>
      </div>
    </div>
    {/* Border overlay */}
    {isActive && (
      <div
        className={cn(
          "absolute inset-0 border-8 pointer-events-none rounded-md",
          isRight ? "rusty-red-border" : "ocean-blue-border"
        )}
      />
    )}
  </div>
);
