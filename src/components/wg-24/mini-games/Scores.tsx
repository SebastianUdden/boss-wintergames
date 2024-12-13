import { IPlayer } from "../teams/players";
import { Score } from "./Score";

interface IScores {
  players: IPlayer[][];
  scores: number[];
  turn: 0 | 1;
  winner: string | undefined;
}

export const Scores = ({ players, scores, turn, winner }: IScores) => {
  if (!players || players.length === 0) return;
  console.log({ winner });
  return (
    <div className="flex items-end justify-between w-full gap-2">
      {players[0].length !== 0 &&
        (!winner || players[0][0].name === winner) && (
          <Score
            player={players[0][0]}
            score={scores[0]}
            isActive={turn === 0 || players[0][0].name === winner}
          />
        )}
      {players[1].length !== 0 &&
        (!winner || players[1][0].name === winner) && (
          <Score
            player={players[1][0]}
            score={scores[1]}
            isActive={turn === 1 || players[1][0].name === winner}
            isRight={true}
          />
        )}
    </div>
  );
};
