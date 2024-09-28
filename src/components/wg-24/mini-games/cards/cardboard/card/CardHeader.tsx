import React from "react";
import { cn } from "@/lib/utils";

const getImage = (symbol: string) => {
  if (symbol === "blue")
    return {
      src: `/cards/symbol-${symbol}.svg`,
      width: "9px",
      height: "9px",
    };
  return {
    src: `/cards/symbol-${symbol}.svg`,
    width: "13px",
    height: "13px",
  };
};

const getManaCost = (manaCost?: string) => {
  if (!manaCost) return "";
  return manaCost.split("").map((m) => {
    if (Number(m))
      return (
        <span className="px-1.5 bg-white/70 rounded-full shadow-md">{m}</span>
      );
    if (m === "G")
      return (
        <img
          className="rounded-full shadow-md px-0.5 w-[20px] bg-green-500/30"
          {...getImage("green")}
        />
      );
    if (m === "R")
      return (
        <img
          className="rounded-full shadow-md px-0.5 py-0.5 w-[19px] bg-red-500/30"
          {...getImage("red")}
        />
      );
    if (m === "B")
      return (
        <img
          className="rounded-full shadow-md px-1 py-0.5 w-[18px] bg-blue-500/30"
          {...getImage("blue")}
        />
      );
    if (m === "b")
      return (
        <img
          className="rounded-full shadow-md px-0.5 w-[20px] bg-gray-500/30"
          {...getImage("black")}
        />
      );
    if (m === "W")
      return (
        <img
          className="rounded-full shadow-md px-0.5 w-[23px] bg-yellow-200/30"
          {...getImage("white")}
        />
      );
  });
};

interface CardHeaderProps {
  name?: string;
  manaCost?: string;
  cardType?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  name,
  manaCost,
  cardType,
}) => {
  const cost = getManaCost(manaCost);
  return (
    <div
      className={cn(
        "text-sm font-bold px-2 py-1 bg-white/80 text-black rounded-lg border border-gray-950 shadow-md z-10",
        {
          "bg-red-950": cardType === "Attack",
          "bg-green-950": cardType === "Heal",
        }
      )}
    >
      <span>{name}</span>
      {cost && <span className="flex float-right gap-1">{cost}</span>}
    </div>
  );
};
