export interface IActivity {
  title: string;
  description: string;
}

interface IActivities {
  activities: IActivity[];
}

export const Activities = ({ activities }: IActivities) => (
  <div>
    <h2 className="mb-2 text-2xl">Aktiviteter</h2>
    <div className="grid grid-cols-2 gap-2">
      {activities.map((a: IActivity) => (
        <div key={a.title} className="p-4 bg-gray-700 rounded-md shadow-lg">
          <h3 className="text-xl text-pink-500">{a.title}</h3>
          {a.description && <p className="m-0">{a.description}</p>}
        </div>
      ))}
    </div>
  </div>
);
