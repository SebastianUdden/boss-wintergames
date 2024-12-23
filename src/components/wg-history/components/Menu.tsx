interface IMenu {
  onTabChange: (tab: number) => void;
}

export const Menu = ({ onTabChange }: IMenu) => (
  <div className="bg-black text-white text-2xl p-[40px] flex justify-between items-center">
    <button
      className="p-0 m-0 text-4xl border-none shadow-none outline-none bg-none text-inherit"
      onClick={() => onTabChange(0)}
    >
      BOSS WinterGames
    </button>
  </div>
);
