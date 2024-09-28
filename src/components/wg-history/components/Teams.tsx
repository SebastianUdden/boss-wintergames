export interface ITeam {
  title: string;
  members: string[];
}

interface ITeams {
  teams: ITeam[];
}

export const Teams = ({ teams }: ITeams) => (
  <div className="flex flex-wrap gap-2">
    {teams.map((t) => (
      <div
        key={t.title}
        className="rounded-lg bg-gray-700 p-[20px] w-[48%] box-border shadow-md"
      >
        <h3 className="mb-[5px] text-yellow-500 text-[22px]">{t.title}</h3>
        <ul className="p-0 m-0 list-none">
          {t.members.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);
