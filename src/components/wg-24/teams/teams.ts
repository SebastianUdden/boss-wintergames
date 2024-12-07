import { IPlayer, players } from "./players";

const skewTeamSize = 9;

export interface ITeam {
  id: number;
  name: string;
  minimized: boolean;
  rightAligned: boolean;
  color: "blue" | "red";
  players: IPlayer[];
}

export const initialTeams: ITeam[] = [
  {
    id: 0,
    name: "Blue",
    color: "blue",
    minimized: true,
    rightAligned: false,
    players: players.slice(0, skewTeamSize),
  },
  {
    id: 1,
    name: "Red",
    color: "red",
    minimized: true,
    rightAligned: true,
    players: players.slice(skewTeamSize, players.length),
  },
];
