export interface IPlayer {
  name: string;
  image?: string;
  wins: number;
  losses: number;
  score?: number;
  showScore?: number;
}

export const players = [
  {
    name: "Ante",
    image: "/games/cards/hero-sales-slammer.webp",
    wins: 4,
    losses: 1,
  },
  {
    name: "Dennan",
    image: "/games/cards/hero-red-beard-raider.webp",
    wins: 3,
    losses: 2,
  },
  {
    name: "Fredde",
    image: "/games/cards/hero-the-salmon-dancer.webp",
    wins: 0,
    losses: 10,
  },
  {
    name: "Ivar",
    image: "/games/cards/awesome-possum.webp",
    wins: 0,
    losses: 0,
  },
  {
    name: "Kling",
    image: "/games/cards/hero-alpine-analyst.webp",
    wins: 0,
    losses: 0,
  },
  {
    name: "Mattis",
    image: "/games/cards/hero-brush-runner.webp",
    wins: 0,
    losses: 0,
  },
  {
    name: "Nemer",
    image: "/games/cards/hero-tattooed-titan.webp",
    wins: 0,
    losses: 0,
  },
  {
    name: "Palmen",
    image: "/games/cards/hero-excel-erator.webp",
    wins: 0,
    losses: 0,
  },
  {
    name: "Schäran",
    image: "/games/cards/hero-blizzard-biathlete.webp",
    wins: 0,
    losses: 0,
  },
  {
    name: "Sebbe",
    image: "/games/cards/hero-tall-coder.webp",
    wins: 0,
    losses: 0,
  },
];
