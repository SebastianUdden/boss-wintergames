export interface IActivity {
  title: string;
  description: string;
}

interface IActivities {
  activities: IActivity[];
}

export const Activities = ({ activities }: IActivities) => (
  <div>
    <h2 className="mt-[15px] mb-[10px] text-[30px]">Aktiviteter</h2>
    <div className="flex flex-wrap">
      {activities.map((a: IActivity) => (
        <div
          key={a.title}
          className="mt-[5px] mr-[5px] rounded-md bg-gray-700 p-[20px] w-[49%] box-border shadow-lg"
        >
          <h3 className="mb-[5px] text-pink-500">{a.title}</h3>
          {a.description && <p className="m-0">{a.description}</p>}
        </div>
      ))}
    </div>
  </div>
);
