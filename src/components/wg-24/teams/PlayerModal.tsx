import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/wg-24/ui/dialog";
import { Badge } from "../ui/badge";
import { IPlayer } from "./players";

interface IModal {
  modal?: IPlayer;
  onClose?: () => void;
}

export const PlayerModal = ({ modal, onClose }: IModal) => {
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

  const { name, description, score } = modal;
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-left">{name}</DialogTitle>
          <DialogDescription className="flex flex-col gap-4 py-4 text-left">
            <div className="flex flex-wrap gap-2">
              Poäng{" "}
              <Badge className="text-black bg-white hover:bg-white">
                {score.toLocaleString("se-SE", {
                  useGrouping: true,
                })}
              </Badge>
            </div>
            {description && (
              <ul>
                {description?.map((d) => (
                  <li>{d}</li>
                ))}
              </ul>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
