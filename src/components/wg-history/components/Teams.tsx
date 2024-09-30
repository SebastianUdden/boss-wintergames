export interface ITeam {
  title: string;
  members: string[];
}

interface ITeams {
  teams: ITeam[];
}

export const Teams = ({ teams }: ITeams) => (
  <div className="grid grid-cols-2 gap-2">
    {teams.map((t) => (
      <div
        key={t.title}
        className="box-border p-4 bg-gray-700 rounded-lg shadow-md"
      >
        <h3 className="mb-1 text-2xl text-yellow-500">{t.title}</h3>
        <ul className="p-0 m-0 list-none">
          {t.members.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);
