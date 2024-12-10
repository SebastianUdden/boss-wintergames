import { cn } from "@/lib/utils";
import { ICard } from "./Card";

interface IMatchedCards {
  cards: ICard[];
  isRight?: boolean;
}

export const MatchedCards = ({ cards, isRight }: IMatchedCards) => {
  const groupedCards = cards.reduce((acc, card) => {
    const group = acc.find((g) => g[0]?.img === card.img);
    if (group) {
      group.push(card);
    } else {
      acc.push([card]);
    }
    return acc;
  }, [] as Array<Array<(typeof cards)[0]>>);

  const maxHeight = 4; // Maximum cards in one column
  const columns: Array<Array<(typeof groupedCards)[0]>> = [];

  groupedCards.forEach((group, index) => {
    const columnIndex = Math.floor(index / maxHeight);
    if (!columns[columnIndex]) {
      columns[columnIndex] = [];
    }
    columns[columnIndex].push(group);
  });

  return (
    <div className="relative space-x-4">
      {columns.map((column, colIndex) => (
        <div
          key={colIndex}
          className={`top-0 absolute flex flex-col gap-6 space-y-2`}
        >
          {column.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={cn(
                "relative",
                colIndex === 0 && !isRight ? "-rotate-12" : "",
                colIndex === 1 && !isRight ? "rotate-12" : "",
                colIndex === 2 && !isRight ? "rotate-45" : "",
                colIndex === 0 && isRight ? "rotate-12" : "",
                colIndex === 1 && isRight ? "-rotate-12" : "",
                colIndex === 2 && isRight ? "-rotate-45" : ""
              )}
              style={{
                width: "min(15vh, 7vw)",
                height: "min(15vh, 7vw)",
              }}
            >
              {/* First card */}
              <img
                src={group[0]?.img}
                className={cn(
                  `w-full border-4 border-black rounded-md outline-none ${
                    isRight ? "rotate-12" : "-rotate-12"
                  }`
                )}
              />
              {/* Second card */}
              {group[1] && (
                <img
                  src={group[1]?.img}
                  className={cn(
                    `absolute w-full border-4 border-black rounded-md shadow-lg outline-none top-1 left-1`
                  )}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
