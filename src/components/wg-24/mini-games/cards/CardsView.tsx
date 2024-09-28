import { useState } from "react";
import { CardView } from "./cardboard/card/CardView";
import { cards } from "./cards";

export const CardsView = () => {
  const [searchValue, setSearchValue] = useState("");
  const filteredCards = cards.filter((c) =>
    JSON.stringify(c).toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <>
      <input
        className="w-full p-2 px-5 text-lg bg-gray-800 rounded-full"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <div className="flex flex-wrap min-h-96">
        {filteredCards.length > 0 ? (
          filteredCards.map((cardType) => <CardView {...cardType} />)
        ) : (
          <p className="px-6 py-10 text-lg">No cards found.</p>
        )}
      </div>
    </>
  );
};
