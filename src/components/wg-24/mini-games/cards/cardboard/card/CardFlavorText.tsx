import React from "react";

interface ICardFlavorText {
  text?: string;
}

export const CardFlavorText: React.FC<ICardFlavorText> = ({ text }) => {
  return (
    <div className="p-1 ml-1 mr-4 text-xs italic border-t">
      <span>{text}</span>
    </div>
  );
};
