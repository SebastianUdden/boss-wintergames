interface IControls {
  controls: (string | React.ReactNode)[];
}

export const Controls = ({ controls }: IControls) => {
  return (
    <div className="grid items-center grid-cols-3 gap-2 text-center">
      <div />
      <div className="items-center p-3 text-center border border-white rounded-lg">
        {controls[0]}
      </div>
      {controls[4] ? (
        <>
          <div className="p-3 border border-white rounded-lg">
            {controls[4]}
          </div>
        </>
      ) : (
        <div />
      )}

      <div className="p-3 border border-white rounded-lg">{controls[1]}</div>
      <div className="p-3 border border-white rounded-lg">{controls[2]}</div>
      <div className="p-3 border border-white rounded-lg">{controls[3]}</div>
    </div>
  );
};
