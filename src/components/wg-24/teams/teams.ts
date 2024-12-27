import { IPlayer, players } from "./players";

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
    players: [],
  },
  {
    id: 1,
    name: "Red",
    color: "red",
    minimized: true,
    rightAligned: true,
    players: [],
  },
];

export const prefilledTeams: ITeam[] = [
  {
    id: 0,
    name: "Blue",
    color: "blue",
    minimized: true,
    rightAligned: false,
    players: [{ ...players[0], isCaptain: true }, ...players.slice(1, 6)],
  },
  {
    id: 1,
    name: "Red",
    color: "red",
    minimized: true,
    rightAligned: true,
    players: [{ ...players[6], isCaptain: true }, ...players.slice(7)],
  },
];
