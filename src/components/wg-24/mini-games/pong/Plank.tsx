import { forwardRef, useMemo } from "react";

interface IPlank {
  paddleHeight: number; // Initial height of the paddle
  position?: "left" | "right";
  top?: number;
  charges: number; // Tracks cannon charges
  hits: number; // Tracks hits to reduce visible sections
}

export const Plank = forwardRef<HTMLDivElement, IPlank>(
  ({ paddleHeight = 100, position = "left", top = 0, charges, hits }, ref) => {
    const maxSections = 10; // Total number of sections
    const visibleSections = maxSections - hits; // Remaining visible sections
    const adjustedHeight = (paddleHeight / maxSections) * visibleSections; // Updated paddle height

    // Precompute styles for visible sections
    const sectionStyles = useMemo(
      () =>
        Array.from({ length: visibleSections }, (_, index) => ({
          backgroundImage: "url('/games/cannons/plank.png')",
          height: `${100 / visibleSections}%`,
        })),
      [visibleSections]
    );

    return (
      <div
        ref={ref}
        className="absolute"
        style={{
          height: `${adjustedHeight}px`,
          width: "64px",
          [position]: "16px",
          top: `${top + (hits * paddleHeight) / maxSections / 2}px`, // Adjust position
          borderRadius: position === "left" ? "20px 0 0 20px" : "0 20px 20px 0",
          transition: "transform 200ms ease-in-out",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Render Visible Sections */}
        {sectionStyles.map((style, index) => (
          <div
            key={index}
            className="flex-1 bg-center bg-cover border border-black"
            style={style}
          ></div>
        ))}

        {/* Cannon Visual */}
        <div
          className="absolute"
          style={{
            width: "40px",
            height: "60px",
            top: "50%",
            [position]: `${50 - charges * 8}%`,
            transform: `translateY(-50%) ${
              position === "left" ? "rotate(90deg)" : "rotate(-90deg)"
            }`,
            transition: "transform 200ms ease-in-out",
          }}
        >
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
