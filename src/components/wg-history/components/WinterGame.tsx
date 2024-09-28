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
    <div className="bg-gray-800 text-white rounded-xl p-[30px] bp-[50px] m-[10px] shadow-md">
      <h2 className="mb-0 text-[30px]">{`${t} ${occurred}`}</h2>
      <p className="mb-[10px] ml-1 italic opacity-50">
        by {coordinators.join(", ")}
      </p>
      <Teams teams={teams} />
      <Activities activities={activities} />
      <Images images={images} />
    </div>
  );
};
