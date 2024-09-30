import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const links = [
  {
    to: "/history",
    label: "History",
    image: "meat-club",
  },
  {
    to: "/boss-pirate-games",
    label: "Pirate games",
    image: "pirate-village",
  },
];

export const Home = () => (
  <div className="p-10">
    <h1>BOSS WinterGames</h1>
    <div className="flex flex-wrap gap-6 mt-10">
      {links.map(({ label, to, image }) => (
        <Link
          key={label}
          to={to}
          className={cn(
            "relative text-4xl text-white bg-black rounded-xl hover:text-white aspect-square flex items-center justify-center group w-full max-w-[50vh]",
            `bg-${image} bg-cover`
          )}
        >
          <div className="w-full text-center">{label}</div>
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black opacity-70 group-hover:opacity-0 group-active:opacity-0 max-w-[50vh]">
            {label}
          </div>
        </Link>
      ))}
    </div>
  </div>
);
