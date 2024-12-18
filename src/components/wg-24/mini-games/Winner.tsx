import { IMiniGameBase } from "./MiniGame";

interface IWinner {
  children: React.ReactNode;
}

export const Winner = ({ children }: IWinner) => (
  <div className="flex justify-center h-[60vh] m-auto justify-items-center">
    <p className="m-auto text-2xl text-center">{children}</p>
  </div>
);

interface IProvideScoresOnWinner extends IMiniGameBase {
  winner?: string;
}

export const provideScoresOnWinner = ({
  onGameComplete,
  winner,
  players,
}: IProvideScoresOnWinner) => {
  if (winner) {
    setTimeout(() => {
      if (winner === players[0][0].name) {
        onGameComplete(
          [
            { player: players[0][0], score: 1 },
            { player: players[1][0], score: -1 },
          ],
          1
        );
      } else {
        onGameComplete(
          [
            { player: players[0][0], score: -1 },
            { player: players[1][0], score: 1 },
          ],
          0
        );
      }
    }, 5000);
  }
};
