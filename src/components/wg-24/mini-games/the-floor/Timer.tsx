interface ITimer {
  time: number;
}

export const Timer = ({ time }: ITimer) => {
  const formatTime = (time: number) => {
    const seconds = Math.floor(time);
    return `${String(seconds).padStart(2, "0")}`;
  };
  return (
    <div className="flex items-center justify-center">
      <h2 className="text-9xl">{formatTime(time)}</h2>
    </div>
  );
};
