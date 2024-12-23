import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/wg-24/ui/dialog";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface IModal {
  isOpen?: boolean;
  onClose?: () => void;
}

export const ConfirmModal = ({ isOpen, onClose }: IModal) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!isOpen);
  }, [isOpen]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    setTimeout(() => {
      if (!isOpen && onClose) {
        onClose();
      }
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-fit min-w-[700px] min-h-[400px] p-10 flex flex-col gap-4 text-2xl">
        <DialogHeader>
          <DialogTitle className="text-4xl text-left">
            Are you sure you want to leave?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col flex-grow gap-6 text-xl text-left">
          <p>
            Unsaved data <strong>will be lost</strong> if you do.
          </p>
          <div className="flex items-center justify-between mt-auto text-2xl">
            <Link to="/">Confirm, go to home page!</Link>
            <Button
              className="text-2xl p-[3vh]"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
