import { ReactNode } from "react";
import { Button } from "../ui/button";

interface IStartButton {
  onStartGame: () => void;
  children: ReactNode;
}

export const StartButton = ({ onStartGame, children }: IStartButton) => (
  <Button
    className="p-20 my-auto text-white ocean-blue text-8xl"
    onClick={onStartGame}
  >
    {children}
  </Button>
);
