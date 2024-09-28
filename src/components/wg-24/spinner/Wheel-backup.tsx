import { useCallback, useState, useEffect, useRef } from "react";
import "./wheel.css";
import { cn } from "@/lib/utils";
import { IMiniGame } from "../mini-games/MiniGame";

const brownFrame = "#3A1200";

const easeOutQuad = (t: number) => t * (2 - t); // Easing function

interface IGetSliceClasses {
  selectedIndex?: number;
  othersAfter: boolean;
  isSpinning: boolean;
  isSelected: boolean;
  activeSliceIndex: number | null;
  index: number;
}

const getSliceClasses = ({
  selectedIndex,
  othersAfter,
  isSpinning,
  isSelected,
  activeSliceIndex,
  index,
}: IGetSliceClasses) => {
  if (selectedIndex === undefined) return "[&>path]:opacity-100";
  if (
    activeSliceIndex !== null &&
    15 - activeSliceIndex === index &&
    !isSpinning &&
    isSelected
  )
    return "cursor-pointer [&>path]:opacity-100";
  if (activeSliceIndex !== null && 15 - activeSliceIndex === index)
    return "[&>path]:opacity-100";
};

interface IWheel {
  phase: string;
  wheelSize: string;
  slices: IMiniGame[];
  selectedIndex?: number; // Index of the slice to be at the top when spinning ends
  spins: number;
  multiplier: number;
  onSpinComplete: (game: string) => void;
  onSliceClick: (slice: IMiniGame) => void;
}

export const Wheel = ({
  phase,
  wheelSize,
  slices,
  selectedIndex,
  spins,
  multiplier,
  onSpinComplete,
  onSliceClick,
}: IWheel) => {
  const [activeSliceIndex, setActiveSliceIndex] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showSelected, setShowSelected] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAmount, setRotationAmount] = useState(0);
  const [tickDuration, setTickDuration] = useState(70);
  const [arrowTick, setArrowTick] = useState(false);
  // const animationRef = useRef<number | null>(null);
  // Separate animation references for reverse and forward
  const reverseAnimationRef = useRef<number | null>(null);
  const forwardAnimationRef = useRef<number | null>(null);

  const startTimeRef = useRef<number | null>(null);
  const startRotationRef = useRef<number>(0);
  const lastSliceIndexRef = useRef<number>(-1);

  const totalSpinDuration = 1000 * spins * multiplier; // in milliseconds

  const triggerArrow = useCallback(
    (currentSliceIndex: number, wheelSpeed: number) => {
      setActiveSliceIndex(currentSliceIndex); // Highlight the current slice

      // Randomly jump between two values based on wheel speed
      const minRotation = Math.max(-5, -15 * wheelSpeed); // Set the minimum rotation based on wheel speed
      const maxRotation = Math.min(-10, -30 * wheelSpeed); // Set the maximum rotation based on wheel speed

      // Randomly choose between two values to create the jerky effect
      const randomRotation = Math.random() < 0.5 ? minRotation : maxRotation;

      // Apply the random "jerky" effect
      setRotationAmount(randomRotation);

      // Keep the arrow in the rotated state for a short period before switching back
      setArrowTick(true);
      setTimeout(() => {
        setArrowTick(false);
      }, 100); // Keep tick duration relatively short for the jump effect
    },
    []
  );

  const animateRotation = useCallback(
    (totalRotation: number) => {
      const reverseSpinDuration = 2000; // Duration for reverse spin (in milliseconds)
      const anglePerSlice = 360 / slices.length;
      const reverseAngle = -anglePerSlice * 1; // Reverse by three slices

      const forwardDuration = totalSpinDuration;
      const startRotation = startRotationRef.current;

      const reverseSpin = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / reverseSpinDuration, 1);
        const easedProgress = easeOutQuad(progress);

        const reverseRotation = startRotation + reverseAngle * easedProgress;
        setRotationAngle(reverseRotation);

        if (progress < 1) {
          reverseAnimationRef.current = requestAnimationFrame(reverseSpin);
        } else {
          // Proceed to forward spin only when reverse spin completes
          setRotationAngle(startRotation + reverseAngle);
          startRotationRef.current = startRotation + reverseAngle;
          startTimeRef.current = null;
          forwardAnimationRef.current = requestAnimationFrame(forwardSpin);
        }
      };

      const forwardSpin = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / forwardDuration, 1);
        const easedProgress = easeOutQuad(progress);

        const currentRotation =
          startRotationRef.current + totalRotation * easedProgress;
        setRotationAngle(currentRotation);

        // Calculate the current wheel speed (1 = fastest, 0 = slowest)
        const wheelSpeed = 1 - progress;

        // Check if a new slice has come to the top
        const sliceAngle = 360 / slices.length;
        const currentSliceIndex = Math.floor(
          (((currentRotation % 360) + 360) % 360) / sliceAngle
        );

        if (currentSliceIndex !== lastSliceIndexRef.current) {
          lastSliceIndexRef.current = currentSliceIndex;
          triggerArrow(currentSliceIndex, wheelSpeed); // Pass wheel speed to triggerArrow
        }

        // Continue forward spin or finish
        if (progress < 1) {
          forwardAnimationRef.current = requestAnimationFrame(forwardSpin);
        } else {
          // Finalize the spin after the wheel comes to a stop
          setTimeout(() => {
            const finalSliceIndex = Math.floor(
              (((currentRotation % 360) + 360) % 360) / sliceAngle
            );
            onSpinComplete(slices[finalSliceIndex].name);
          }, 2000);

          setIsSpinning(false);
          setShowSelected(true);
        }
      };

      // Start reverse spin first
      reverseAnimationRef.current = requestAnimationFrame(reverseSpin);

      // Clean up function to cancel any ongoing animation frames
      return () => {
        if (reverseAnimationRef.current) {
          cancelAnimationFrame(reverseAnimationRef.current);
        }
        if (forwardAnimationRef.current) {
          cancelAnimationFrame(forwardAnimationRef.current);
        }
      };
    },
    [totalSpinDuration, easeOutQuad, triggerArrow, onSpinComplete, slices]
  );

  const handleSpin = useCallback(() => {
    if (selectedIndex === undefined || selectedIndex === null || isSpinning) {
      return; // Prevent spin if already spinning or no selectedIndex
    }

    setShowSelected(false);
    setIsSpinning(true); // Ensure spinning state is set only when the spin starts

    const sliceAngle = 360 / slices.length;
    const targetSliceAngle = (selectedIndex + 0.5) * sliceAngle;

    const currentRotation = rotationAngle % 360;
    const deltaAngle = (targetSliceAngle - currentRotation + 360) % 360;
    const totalRotation = 360 * spins + deltaAngle;

    startRotationRef.current = rotationAngle;
    startTimeRef.current = null;

    // Ensure that animationRefs are cleared before starting a new spin
    if (reverseAnimationRef.current) {
      cancelAnimationFrame(reverseAnimationRef.current);
      reverseAnimationRef.current = null;
    }
    if (forwardAnimationRef.current) {
      cancelAnimationFrame(forwardAnimationRef.current);
      forwardAnimationRef.current = null;
    }

    animateRotation(totalRotation);
  }, [
    slices.length,
    selectedIndex,
    spins,
    isSpinning,
    rotationAngle,
    animateRotation,
  ]);

  useEffect(() => {
    // Only call handleSpin when needed (like on a specific event or phase change)
    if (phase === "spinning-wheel") {
      handleSpin();
    }

    // Cleanup only when the component is unmounting
    return () => {
      if (reverseAnimationRef.current) {
        cancelAnimationFrame(reverseAnimationRef.current);
        reverseAnimationRef.current = null;
      }
      if (forwardAnimationRef.current) {
        cancelAnimationFrame(forwardAnimationRef.current);
        forwardAnimationRef.current = null;
      }
    };
  }, [phase, selectedIndex]); // Trigger effect only when phase changes

  return (
    <div className="flex flex-col after:items-center">
      {/* Outer container */}
      <div
        className="rounded-full wheel-container"
        style={{
          width: wheelSize, // Dynamic width based on prop
          height: wheelSize, // Maintain height equal to width for 1:1 aspect ratio
          aspectRatio: "1", // Ensures the wheel remains a perfect circle
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative", // Add relative positioning
          transform: "rotate(90deg)",
        }}
      >
        {/* Inner spinning wheel */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className="flex-grow rounded-full wheel-frame"
          style={{
            transform: `rotate(${rotationAngle}deg)`,
            transition: "none", // We handle animation manually
          }}
          preserveAspectRatio="xMidYMid meet" // Ensures SVG scales correctly
        >
          <g transform={`rotate(-90 ${100} ${100})`}>
            {slices.map((slice, index) => {
              const totalSlices = slices.length;
              const startAngle = (Math.PI * 2 * index) / totalSlices;
              const endAngle = (Math.PI * 2 * (index + 1)) / totalSlices;
              const labelAngle = (startAngle + endAngle) / 2;

              // Reduce the radius to create padding (subtract 15px for example)
              const paddingRadius = 85; // 100 - 15 = 85
              const x1 = 100 + paddingRadius * Math.cos(startAngle);
              const y1 = 100 + paddingRadius * Math.sin(startAngle);
              const x2 = 100 + paddingRadius * Math.cos(endAngle);
              const y2 = 100 + paddingRadius * Math.sin(endAngle);

              const textRadius = paddingRadius * 0.6; // Adjust text position similarly
              const textX = 100 + textRadius * Math.cos(labelAngle);
              const textY = 100 + textRadius * Math.sin(labelAngle);

              const isSelected =
                selectedIndex !== undefined
                  ? index === 15 - selectedIndex
                  : false;
              const showPulse = isSelected && showSelected;
              const othersAfter = !isSelected && showSelected && !isSpinning;

              return (
                <g
                  key={index}
                  className={cn(
                    getSliceClasses({
                      selectedIndex,
                      othersAfter,
                      isSpinning,
                      isSelected,
                      activeSliceIndex,
                      index,
                    })
                  )}
                  onClick={() => {
                    if (!isSpinning && selectedIndex !== undefined) {
                      onSliceClick({
                        ...slices[index],
                        isSelected,
                      });
                    }
                  }}
                >
                  {/* Slice Path */}
                  <path
                    d={`M 100 100 L ${x1} ${y1} A ${paddingRadius} ${paddingRadius} 0 0 1 ${x2} ${y2} Z`}
                    fill={slice.color}
                    stroke="#000"
                    strokeWidth="0.5"
                    className={cn(showPulse ? "pulse-border" : "")}
                  />

                  {/* Slice Label */}
                  <text
                    x={textX}
                    y={textY}
                    className={`select-none text-gray-50 ${
                      showPulse ? "pulse-text" : ""
                    }`}
                    fill="#fff"
                    fontSize={paddingRadius * 0.08} // Adjust font size relative to radius
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    transform={`rotate(${
                      (labelAngle * 180) / Math.PI
                    } ${textX} ${textY})`} // Rotate text to match slice direction
                  >
                    {slice.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Indicator */}
        <div
          style={{
            position: "absolute",
            top: "-65px", // Adjust to position the tip overlapping the wheel
            left: "49%",
            transform: "translateX(-50%)",
            overflow: "visible",
            zIndex: 1, // Ensure the indicator appears above the wheel
          }}
        >
          <img
            src="/backgrounds/wheel/wheel-indicator-6.png"
            style={{
              width: "9vh",
              height: "9vh",
              transformOrigin: "50% 0%",
              transform: `rotate(${rotationAmount}deg)`, // Use dynamically updated rotation amount
              transition: "transform 0.1s ease-in-out", // Keep transitions short for a "jerky" effect
              filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
            }}
          />
        </div>
      </div>
    </div>
  );
};
