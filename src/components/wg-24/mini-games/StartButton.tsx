import { ReactNode } from "react";
import { Button } from "../ui/button";

interface IStartButton {
  onStartGame: () => void;
  children: ReactNode;
}

export const StartButton = ({ onStartGame, children }: IStartButton) => (
  <Button
    className="p-20 m-auto text-6xl text-white ocean-blue "
    onClick={onStartGame}
  >
    {children}
  </Button>
);
