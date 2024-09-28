import { Badge } from "../ui/badge";
import { Label } from "../ui/label";

export interface IScore {
  player: string;
  score: number;
}

export const Score = ({ player, score }: IScore) => (
  <div>
    <Label>{player}</Label>
    <Badge className="flex items-center justify-center p-2 bg-pink-700 hover:bg-pink-700 min-w-20">
      {score.toLocaleString("se-SE", {
        useGrouping: true,
      })}
    </Badge>
  </div>
);
