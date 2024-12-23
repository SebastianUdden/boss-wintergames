import { IPlayer } from "./players";

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
