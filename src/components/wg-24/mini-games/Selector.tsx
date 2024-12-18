import { miniGames } from "./miniGames";

const getFirstSentences = (descriptions?: string[]) => {
  if (!descriptions || descriptions.length === 0) return "";

  const firstEntry = descriptions[0];
  const sentences = firstEntry.split(/(?<=[.!?])\s+/);

  let result = "";
  for (const sentence of sentences) {
    if ((result + " " + sentence).trim().length <= 150) {
      result += (result ? " " : "") + sentence;
    } else {
      break;
    }
  }

  return result.trim();
};

interface ISelector {
  onSelectGame: (index: number) => void;
}

export const Selector = ({ onSelectGame }: ISelector) => {
  return (
    <div className="px-10 max-h-[74vh]">
      <h1>Choose your game</h1>
      <div className="grid max-h-full grid-cols-2 gap-4 overflow-scroll">
        {miniGames.map((miniGame, index) => (
          <button
            key={miniGame.id}
            className="flex flex-col gap-2 text-left border-none hover:opacity-80"
            onClick={() => onSelectGame(index)}
          >
            <h3>{miniGame.name}</h3>
            <p>{getFirstSentences(miniGame.description)}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
