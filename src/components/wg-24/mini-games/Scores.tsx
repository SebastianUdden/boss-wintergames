import { IPlayer } from "../teams/players";
import { Score } from "./Score";

interface IScores {
  players: IPlayer[][];
  scores: number[];
  turn?: 0 | 1;
  winner: string | undefined;
  player1IsRed?: boolean;
  controls?: (string | React.ReactNode)[][];
}

export const Scores = ({
  players,
  scores,
  turn,
  winner,
  player1IsRed,
  controls = [],
}: IScores) => {
  if (!players || players.length === 0) return;
  return (
    <div className="flex items-end justify-between w-full gap-2">
      {players[0].length !== 0 &&
        (!winner || players[0][0].name === winner) && (
          <Score
            teamName={player1IsRed ? "Red" : "Blue"}
            players={players[0]}
            score={scores[0]}
            isActive={
              turn === undefined || turn === 0 || players[0][0].name === winner
            }
            player1IsRed={player1IsRed}
            controls={controls[0]}
          />
        )}
      {players[1].length !== 0 &&
        (!winner || players[1][0].name === winner) && (
          <Score
            teamName={player1IsRed ? "Red" : "Blue"}
            players={players[1]}
            score={scores[1]}
            isActive={
              turn === undefined || turn === 1 || players[1][0].name === winner
            }
            isRight={true}
            player1IsRed={player1IsRed}
            controls={controls[1]}
          />
        )}
    </div>
  );
};
