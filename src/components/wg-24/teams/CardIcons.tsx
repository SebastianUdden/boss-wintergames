import { cn } from "@/lib/utils";

export const BallChainIcon = ({
  rightAligned,
}: {
  size: number;
  rightAligned: boolean;
}) => (
  <img
    className={cn("absolute z-40", rightAligned ? "scale-x-[-1]" : "")}
    style={{
      width: "50px",
      height: "50px",
      top: "25%",
    }}
    src="/leaderboard/ball-chain.png"
  />
);

export const CaptainIcon = ({
  rightAligned,
}: {
  size: number;
  rightAligned: boolean;
}) => (
  <img
    className={cn("absolute z-20", rightAligned ? "scale-x-[-1]" : "")}
    style={{
      width: "50px",
      height: "50px",
      top: "15%",
      right: rightAligned ? "19%" : "7%",
    }}
    src="/leaderboard/captain.png"
  />
);

export const HelmsmanIcon = ({
  rightAligned,
}: {
  size: number;
  rightAligned: boolean;
}) => (
  <img
    className={cn("absolute z-50", rightAligned ? "scale-x-[-1]" : "")}
    style={{
      width: "50px",
      height: "50px",
      top: "13%",
      right: rightAligned ? "15%" : "12%",
    }}
    src="/leaderboard/rudder.png"
  />
);

export const CutlassIcon = ({
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
      width: "90px",
      height: "90px",
      top: "-14%",
      left: rightAligned ? "-12%" : "7%",
    }}
    src="/leaderboard/cutlass.png"
  />
);
