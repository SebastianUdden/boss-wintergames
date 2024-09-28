import React from "react";

interface CardPowerToughnessProps {
  power?: number;
  toughness?: number;
}

export const CardPowerToughness: React.FC<CardPowerToughnessProps> = ({
  power,
  toughness,
}) => {
  if (power === undefined || toughness === undefined) return null;

  return (
    <div className="absolute p-1 text-xs text-center text-black bg-gray-200 rounded-full bottom-1.5 right-1.5">
      <span className="font-bold">
        {power}/{toughness}
      </span>
    </div>
  );
};
