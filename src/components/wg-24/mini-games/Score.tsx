import { Label } from "../ui/label";
import { IPlayer } from "../teams/players";
import { cn } from "@/lib/utils";

export interface IScore {
  players: IPlayer[];
  score: number;
}

interface IScoreProps extends IScore {
  isActive?: boolean;
  isRight?: boolean;
  player1IsRed?: boolean;
}

export const Score = ({
  players,
  score,
  isActive,
  isRight,
  player1IsRed,
}: IScoreProps) => (
  <div className="relative w-full select-none">
    {/* Content container */}
    <div
      className={cn(
        "flex justify-between p-6 rounded-md relative z-10",
        !isRight ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div className="flex max-w-1/2">
        {players.length > 2 ? (
          <p className="flex items-center p-8 text-4xl border-2 border-black ocean-blue">
            Blue
          </p>
        ) : (
          players.map((p) => (
            <img
              key={p.image}
              src={p.image}
              className="max-w-[10vh] border-2 border-black"
            />
          ))
        )}
      </div>
      <div className={cn("flex flex-col-reverse", isRight ? "text-right" : "")}>
        <Label className="text-2xl">{players[0].name}</Label>
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
          player1IsRed
            ? isRight
              ? "ocean-blue-border" // Right player, but Player 1 is Red
              : "rusty-red-border" // Left player, and Player 1 is Red
            : isRight
            ? "rusty-red-border" // Right player, and Player 1 is Blue
            : "ocean-blue-border" // Left player, but Player 1 is Blue
        )}
      />
    )}
  </div>
);
