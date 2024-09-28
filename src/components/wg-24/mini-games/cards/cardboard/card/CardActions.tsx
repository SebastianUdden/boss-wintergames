import React from "react";

interface CardActionsProps {
  canPlayCard: boolean;
  canDiscardCard: boolean;
  onPlayCard: () => void;
  onDiscardCard: () => void;
}

export const CardActions: React.FC<CardActionsProps> = ({
  canPlayCard,
  canDiscardCard,
  onPlayCard,
  onDiscardCard,
}) => {
  return (
    <div className="">
      {canPlayCard && (
        <button
          className="px-3 py-1 text-white rounded bg-gray-950 hover:bg-gray-900"
          onClick={onPlayCard}
        >
          Play
        </button>
      )}
      {canDiscardCard && (
        <button
          className="px-3 py-1 mt-2 text-white bg-red-500 rounded hover:bg-red-600"
          onClick={onDiscardCard}
        >
          Discard
        </button>
      )}
    </div>
  );
};
