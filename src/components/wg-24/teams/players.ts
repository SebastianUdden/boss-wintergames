export interface IPlayer {
  name: string;
  image?: string;
  wins?: number;
  losses?: number;
  score?: number;
  showScore?: number;
  isCaptive?: boolean;
  isCaptain?: boolean;
  isHelmsman?: boolean;
}

export const players = [
  {
    name: "Amanda",
    image: "/profiles/zoomed-amanda.jpeg",
    wins: 0,
    losses: 0,
  },
  {
    name: "Ante",
    image: "/profiles/zoomed-ante.jpeg",
    wins: 0,
    losses: 0,
  },
  {
    name: "Dennan",
    image: "/profiles/zoomed-dennis.jpeg",
    wins: 0,
    losses: 0,
  },
  {
    name: "Joel",
    image: "/profiles/zoomed-joel.jpeg",
    wins: 0,
    losses: 0,
  },
  {
    name: "Kling",
    image: "/profiles/zoomed-kling.jpeg",
    wins: 0,
    losses: 0,
  },
  {
    name: "Mattis",
    image: "/profiles/zoomed-mattis.jpeg",
    wins: 0,
    losses: 0,
    isHelmsman: true,
  },
  {
    name: "Palmen",
    image: "/profiles/zoomed-palm.jpeg",
    wins: 0,
    losses: 0,
  },
  {
    name: "Robban",
    image: "/profiles/zoomed-robban.jpeg",
    wins: 0,
    losses: 0,
  },
  {
    name: "Schäran",
    image: "/profiles/zoomed-schaeran.jpeg",
    wins: 0,
    losses: 0,
  },
  {
    name: "Sebbe",
    image: "/profiles/zoomed-sebbe.jpeg",
    wins: 0,
    losses: 0,
    isHelmsman: true,
  },
  {
    name: "Virre",
    image: "/profiles/zoomed-virre.jpeg",
    wins: 0,
    losses: 0,
  },
];
