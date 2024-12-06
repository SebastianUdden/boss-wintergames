// @ts-nocheck
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/wg-24/ui/dialog";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { MiniGameProps } from "./mini-games/MiniGame";

interface IModal {
  modal?: MiniGameProps;
  isSelected?: boolean;
  onClose?: () => void;
  onGameCompleted?: () => void;
  onOpenGame?: (name: string) => void;
}

export const Modal = ({
  modal,
  onClose,
  onGameCompleted,
  onOpenGame,
}: IModal) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!modal);
  }, [modal]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen && onClose) {
      onClose();
    }
  };

  if (!modal) return null;

  const { name, gametype, song, description, criteria, isSelected, isAnalog } =
    modal;
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-fit min-w-[700px] min-h-[400px] p-10 flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="text-4xl text-left">{name}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-6 text-xl text-left">
          <div className="flex flex-wrap gap-2">
            <Badge className="text-xl text-black bg-white hover:bg-white">
              {gametype}
            </Badge>
            <Badge className="text-xl text-white bg-pink-700 hover:bg-pink-700">
              {song}
            </Badge>
          </div>
          <ul>
            {description.map((d) => (
              <li>{d}</li>
            ))}
          </ul>
          {criteria && (
            <div>
              <Label className="font-bold">Kriterier</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {criteria.map((c) => (
                  <Badge className="text-white bg-pink-700 hover:bg-pink-800">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {isSelected && !isAnalog && (
            <Button className="bg-pink-600" onClick={() => onOpenGame(name)}>
              Open game
            </Button>
          )}
          {isSelected && isAnalog && (
            <Button className="bg-green-600" onClick={onGameCompleted}>
              Completed
            </Button>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
