import { miniGameIdeas } from "@/components/mini-game-ideas/miniGameIdeas";
import { useState } from "react";

export const MiniGameIdeas = () => {
  const [query, setQuery] = useState("");
  const filteredMiniGames = miniGameIdeas.filter(
    (miniGame) =>
      JSON.stringify(miniGame).toLowerCase().includes(query.toLowerCase()) ||
      (miniGame.isAnalog === false && query.includes("dig")) ||
      (miniGame.isAnalog === true && query.includes("ana"))
  );

  return (
    <>
      <div className="fixed bg-[#222] right-0 left-0 top-0 p-4 z-50">
        <input
          placeholder="Search"
          className="w-full px-6 py-4 rounded-xl"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
        />
      </div>
      <div className="p-4 py-20">
        {filteredMiniGames.map((miniGame) => (
          <div
            className="flex flex-col gap-2 p-4 my-4 bg-black rounded-xl"
            key={miniGame.id}
          >
            <h1>{miniGame.name}</h1>
            <p>{miniGame.concept}</p>
            <hr />
            <p>
              {miniGame.category}:{" "}
              <span className="opacity-50">
                {miniGame.isAnalog ? "Analog" : "Digital"}
              </span>
            </p>
            <ul className="ml-4 text-orange-400 list-disc opacity-90">
              {miniGame.description?.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <hr />
            <ul className="ml-4 list-disc">
              {miniGame.instructions?.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p>{miniGame.criteria}</p>
            <p className="opacity-50">Song: {miniGame.song}</p>
          </div>
        ))}
      </div>
    </>
  );
};
