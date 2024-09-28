import React from "react";
import { CardFooter } from "./CardFooter";

const getImage = (symbol: string) => {
  return `/cards/${symbol}.svg`;
};

const getDescription = (description: string) => {
  if (description === "symbol-red")
    return <img className="m-auto mt-3 w-[55px]" src={getImage(description)} />;
  if (description === "symbol-blue")
    return <img className="m-auto mt-3 w-[35px]" src={getImage(description)} />;
  if (description === "symbol-white")
    return <img className="m-auto mt-2 w-[60px]" src={getImage(description)} />;
  if (description.startsWith("symbol-")) {
    return <img className="m-auto my-2 w-[60px]" src={getImage(description)} />;
  }
  return description;
};

interface CardTextBoxProps {
  description: string;
  flavorText?: string;
  power?: number;
  toughness?: number;
}

export const CardTextBox: React.FC<CardTextBoxProps> = ({
  description,
  flavorText,
  power,
  toughness,
}) => {
  return (
    <div className="flex flex-col flex-grow mx-1 text-black border bg-white/95 border-gray-950 -mt-0.5">
      <p className="p-2 text-xs">{getDescription(description)}</p>
      <CardFooter flavorText={flavorText} power={power} toughness={toughness} />
    </div>
  );
};
