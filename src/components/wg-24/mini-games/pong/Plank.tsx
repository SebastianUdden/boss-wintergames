import { forwardRef } from "react";

interface IPlank {
  paddleHeight: number;
  position?: "left" | "right";
  top?: number;
  charges: number; // New prop
}

export const Plank = forwardRef<HTMLDivElement, IPlank>(
  ({ paddleHeight = 100, position = "left", top = 0, charges }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute"
        style={{
          height: `${paddleHeight}px`,
          width: "64px",
          [position]: "16px",
          top: `${top}px`,
          borderRadius: position === "left" ? "20px 0 0 20px" : "0 20px 20px 0",
          transition: "height 200ms ease-in-out",
          backgroundImage: "url('/games/cannons/plank.png')",
          backgroundSize: "150% 150%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute"
          style={{
            width: "40px",
            height: "60px",
            top: "50%",
            [position]: `${50 - charges * 8}%`, // Dynamic position starts forward
            transform: `translateY(-50%) ${
              position === "left" ? "rotate(90deg)" : "rotate(-90deg)"
            }`,
            transition: `${
              position === "left" ? "left" : "right"
            } 200ms ease-in-out`,
          }}
        >
          {/* Overlay Image */}
          <img
            src="/games/cannons/cannon.png"
            alt="Cannon Decoration"
            className="absolute"
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </div>
      </div>
    );
  }
);

Plank.displayName = "Plank";
