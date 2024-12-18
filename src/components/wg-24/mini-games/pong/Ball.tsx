import { forwardRef, Ref } from "react";
import { cn } from "@/lib/utils";

interface BallProps {
  showScore?: boolean;
  gameState: "ready" | "active" | "finished";
  overlayImage?: string; // Optional overlay image URL
}

export const Ball = forwardRef<HTMLDivElement, BallProps>(
  (
    { showScore = false, gameState, overlayImage },
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute w-4 h-4 bg-red-500 rounded-full",
          showScore ? "hidden" : "block"
        )}
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {overlayImage && (
          <div
            style={{
              position: "absolute",
              width: "90px",
              height: "90px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              backgroundImage: `url('${overlayImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              pointerEvents: "none",
              animation:
                gameState === "active" ? "rotate 6s linear infinite" : "",
            }}
          />
        )}
      </div>
    );
  }
);

Ball.displayName = "Ball";
