import React from "react";

interface ICardFooter {
  power?: number;
  toughness?: number;
  flavorText?: string;
}

export const CardFooter: React.FC<ICardFooter> = ({
  flavorText,
  power,
  toughness,
}) => {
  return (
    <div className="py-2 mx-2 mt-auto text-xs border-t border-gray-400">
      <span className="italic opacity-50">{flavorText}</span>
      {power && toughness && (
        <span className="float-right">
          <div className="p-1 text-center text-black bg-gray-200 rounded-full shadow-md">
            <span className="font-bold">
              {power}/{toughness}
            </span>
          </div>
        </span>
      )}
    </div>
  );
};
