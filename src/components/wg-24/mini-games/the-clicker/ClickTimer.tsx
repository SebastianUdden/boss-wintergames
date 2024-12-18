interface IClickTimer {
  timeLeft: number;
}

export const ClickTimer = ({ timeLeft }: IClickTimer) => {
  return (
    <p
      className="absolute px-16 py-5 m-auto text-white transition-transform duration-100 ease-out transform bg-black border border-white rounded-full select-none w-25 text-8xl top-36 position"
      style={{
        transform:
          timeLeft < 2000
            ? `scale(${1 + Math.sin(timeLeft / 100) * 0.05})`
            : "",
        color: timeLeft < 1000 ? "red" : "white",
      }}
    >
      {`${String(Math.floor(timeLeft / 6000)).padStart(2, "0")}:${String(
        Math.floor((timeLeft % 6000) / 100)
      ).padStart(2, "0")}:${String(timeLeft % 100).padStart(2, "0")}`}
    </p>
  );
};
