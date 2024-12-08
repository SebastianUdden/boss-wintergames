import { Label } from "../ui/label";
import { IPlayer } from "../teams/players";
import { cn } from "@/lib/utils";

export interface IScore {
  player: IPlayer;
  score: number;
  isActive: boolean;
  isRight?: boolean;
}

export const Score = ({ player, score, isActive, isRight }: IScore) => (
  <div
    className={cn(
      "flex w-full justify-between p-4 rounded-xl ",
      !isRight ? "flex-row-reverse" : "flew-row",
      isActive ? "border-2 border-white" : ""
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
    {/* <Badge
      className={cn(
        "flex items-center justify-center p-2  min-w-20",
        isActive ? "bg-pink-700 hover:bg-pink-700" : ""
      )}
    >
     
    </Badge> */}
  </div>
);
