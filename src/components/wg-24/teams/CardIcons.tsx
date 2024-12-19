import { cn } from "@/lib/utils";

export const BallChainIcon = ({
  size,
  rightAligned,
}: {
  size: number;
  rightAligned: boolean;
}) => (
  <img
    className={cn("absolute z-40", rightAligned ? "scale-x-[-1]" : "")}
    style={{
      height: `${size}vh`,
      maxHeight: `${size / 8}vh`,
      maxWidth: `${size / 8}vh`,
      minWidth: "50px",
      minHeight: "50px",
      top: "25%",
    }}
    src="/leaderboard/ball-chain.png"
  />
);

export const CaptainIcon = ({
  size,
  rightAligned,
}: {
  size: number;
  rightAligned: boolean;
}) => (
  <img
    className={cn("absolute z-10", rightAligned ? "scale-x-[-1]" : "")}
    style={{
      height: `${size}vh`,
      maxHeight: `${size / 8}vh`,
      maxWidth: `${size / 8}vh`,
      minWidth: "50px",
      minHeight: "50px",
      top: "20%",
      right: rightAligned ? "25%" : "15%",
    }}
    src="/leaderboard/captain.png"
  />
);

export const CutlassIcon = ({
  size,
  rightAligned,
}: {
  size: number;
  rightAligned: boolean;
}) => (
  <img
    className={cn(
      "absolute -rotate-90 z-10",
      rightAligned ? "scale-y-[-1]" : ""
    )}
    style={{
      height: `${size}vh`,
      maxHeight: `${size / 4}vh`,
      maxWidth: `${size / 4}vh`,
      minWidth: "90px",
      minHeight: "90px",
      top: "-14%",
      left: rightAligned ? "-12%" : "7%",
    }}
    src="/leaderboard/cutlass.png"
  />
);
