import React from "react";
import { cn } from "@/lib/utils";

interface CardTypeLineProps {
  type?: string;
  subtype?: string;
}

export const CardTypeLine: React.FC<CardTypeLineProps> = ({
  type,
  subtype,
}) => {
  return (
    <div
      className={cn(
        "text-xs py-1 px-2 font-bold bg-white/80 text-black rounded-lg border border-gray-950 shadow-md z-10",
        {
          "bg-red-950": type === "Attack",
          "bg-green-950": type === "Heal",
        }
      )}
    >
      <span>
        {type}
        {subtype && ` - ${subtype}`}
      </span>
    </div>
  );
};
