import { useState } from "react";
import { IPlayer, PlayerCard } from "./PlayerCard";
import { PlayerModal } from "./PlayerModal";
import { cn } from "@/lib/utils";

export interface ITeam {
  id: number;
  name: string;
  color: "blue" | "red";
  players: IPlayer[];
}

const initialTeams: ITeam[] = [
  {
    id: 0,
    name: "Blue",
    color: "blue",
    players: [
      {
        name: "Mattis",
        score: 1230,
        description: ["AKA Mr MoD.", "Fader till två.", "Nybliven stugägare."],
      },
      { name: "Dennan", score: 500 },
      { name: "Kling", score: 3400 },
      { name: "Ivar", score: 10000 },
      { name: "Fredde", score: 450 },
    ],
  },
  {
    id: 1,
    name: "Red",
    color: "red",
    players: [
      {
        name: "Sebbe",
        score: 2700,
        description: [
          "AKA Sebulbasaur.",
          "Fader till två.",
          "Nybliven husägare.",
        ],
      },
      { name: "Robin", score: 12000 },
      { name: "Schäran", score: 3200 },
      { name: "Nemer", score: 5205 },
    ],
  },
];

const sortByScore = (a, b) => {
  if (a.score > b.score) return -1;
  if (a.score < b.score) return 1;
  return 0;
};

export const Team = ({ name, color, players }: ITeam) => {
  const [showPlayer, setShowPlayer] = useState<IPlayer | undefined>();
  const sortedPlayers = players.sort(sortByScore);
  return (
    <div className="flex flex-col justify-around text-white shadow-md rounded-xl bg-gray-950">
      <PlayerModal
        modal={showPlayer}
        onClose={() => setShowPlayer(undefined)}
      />
      <div
        className={cn(
          "flex justify-between px-2 py-4 mb-3 text-black rounded-t-xl",
          color && `bg-${color}-500`
        )}
      >
        <strong>{name}</strong>
        <strong className="">Poäng</strong>
      </div>
      {sortedPlayers.map((player, index) => (
        <PlayerCard
          key={index}
          name={player.name}
          score={player.score}
          onClick={() => setShowPlayer(sortedPlayers[index])}
        />
      ))}
    </div>
  );
};
