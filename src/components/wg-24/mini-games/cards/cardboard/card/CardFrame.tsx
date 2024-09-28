import React from "react";
import { cn } from "@/lib/utils";

const getBackgroundImage = (land: string) => {
  if (land) return `/cards/background-${land}.webp`;
  return "";
};

interface CardFrameProps {
  children: React.ReactNode;
  land: string;
}

export const CardFrame: React.FC<CardFrameProps> = ({ children, land }) => {
  const backgroundImage = getBackgroundImage(land);
  return (
    <div
      className={cn(
        "flex flex-col border border-gray-950 rounded-lg shadow-lg w-[250px] h-[400px] p-1",
        {
          "bg-green-500": !backgroundImage, // Default background color if no image is provided
        }
      )}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover", // Ensure the image covers the entire frame
        backgroundPosition: "center", // Center the image in the frame
      }}
    >
      {children}
    </div>
  );
};
