import { Activities, IActivity } from "./Activities";
import { Images } from "./Images";
import { ITeam, Teams } from "./Teams";

interface Props {
  title: string;
  occurred: string;
  coordinators: string[];
  teams: ITeam[];
  activities: IActivity[];
  images: string[];
}

export const WinterGame = ({
  title,
  occurred,
  coordinators,
  teams,
  activities,
  images,
}: Props) => {
  const t = title || "BOSS WinterGames";
  return (
    <div className="flex flex-col gap-4 p-2 text-white bg-gray-800 shadow-md rounded-xl">
      <div>
        <h2 className="mb-0 text-3xl">{`${t} ${occurred}`}</h2>
        <p className="ml-1 italic opacity-50">by {coordinators.join(", ")}</p>
      </div>
      <Teams teams={teams} />
      <Activities activities={activities} />
      {images.length !== 0 && <Images images={images} />}
    </div>
  );
};
