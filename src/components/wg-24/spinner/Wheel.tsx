// @ts-nocheck
import { useCallback, useState, useEffect, useRef } from "react";
import "./wheel.css";
import { cn } from "@/lib/utils";
import { IMiniGame } from "../mini-games/MiniGame";

const sliceTranslations = {
  0: { x: 0, y: -10, rotate: -25 }, // Memory
  1: { x: -1, y: -8, rotate: -8 }, // The floor
  2: { x: 0, y: -8, rotate: -7 }, // Dance off
  3: { x: 2, y: -8, rotate: -5 }, // Boss, Bad, Ugly / Duel
  4: { x: 1, y: -6, rotate: 4 }, // Maze
  5: { x: 0, y: -4, rotate: 4 }, // The clicker
  6: { x: 0, y: -5, rotate: -14 }, // Hangman
  7: { x: -2, y: -4, rotate: 1 }, // Sea shanty
  8: { x: -3, y: -7, rotate: -9 }, // Monuments
  9: { x: 2, y: -6, rotate: 4 }, // Rope
  10: { x: -2, y: -2, rotate: 4 }, // Mending Bridges / Shipwreck
  11: { x: -3, y: 4, rotate: 14 }, // Killerball
  12: { x: 0, y: -0, rotate: -10 }, // Shot in the dark / Darkshot
  13: { x: -2, y: -1, rotate: 4 }, // Cards
  14: { x: -2, y: -6, rotate: 1 }, // Little stereo
};
const easeOutQuad = (t: number) => t * (2 - t); // Easing function

interface IGetSliceClasses {
  selectedIndex?: number;
  isSpinning: boolean;
  isSelected: boolean;
  activeSliceIndex: number | null;
  index: number;
}

const getSliceClasses = ({
  selectedIndex,
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

      // Define rotation amounts and tick duration dynamically based on wheel speed
      const minRotation = Math.max(-5, -20 * wheelSpeed); // Set the minimum rotation based on speed
      const maxRotation = Math.min(-10, -40 * wheelSpeed); // Set the maximum rotation based on speed
      const randomRotation = Math.random() < 0.5 ? minRotation : maxRotation;

      setRotationAmount(randomRotation); // Update the rotation of the arrow

      // Dynamically adjust tickDuration based on the wheel speed to simulate slower jumps as the wheel slows down
      const calculatedTickDuration = Math.max(50, 200 * (1 - wheelSpeed));
      setTickDuration(calculatedTickDuration);

      // Trigger arrowTick for the jump effect, lasting for tickDuration
      setArrowTick(true);
      setTimeout(() => {
        setArrowTick(false);
      }, calculatedTickDuration); // Time between jumps based on wheel speed
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

        // Trigger arrow for every slice change
        if (currentSliceIndex !== lastSliceIndexRef.current) {
          lastSliceIndexRef.current = currentSliceIndex;
          triggerArrow(currentSliceIndex, wheelSpeed); // Pass wheel speed to adjust jumpiness
        }

        if (progress < 1) {
          forwardAnimationRef.current = requestAnimationFrame(forwardSpin);
        } else {
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
    const targetSliceAngle = (selectedIndex + 1.8) * sliceAngle;

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
        <div
          className="w-full p-10 rounded-full shadow-inner wheel-frame"
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 200 200"
            className="flex-grow rounded-full shadow-inner wheel-background font-pirata"
            style={{
              transform: "rotate(-80deg)",
              transition: "none", // We handle animation manually
            }}
            preserveAspectRatio="xMidYMid meet" // Ensures SVG scales correctly
          >
            <defs>
              <filter
                id="carved-in-shadow"
                x="0"
                y="0"
                width="100%"
                height="100%"
              >
                {/* <!-- Blur the text's alpha channel to soften the shadow --> */}
                <feGaussianBlur
                  in="SourceAlpha"
                  stdDeviation="1"
                  result="blur"
                />
                {/* <!-- Offset the shadow slightly inward by using negative values --> */}
                <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
                {/* <!-- Darken the shadow --> */}
                <feFlood floodColor="rgba(0, 0, 0, 1)" result="shadowColor" />
                {/* <!-- Apply the shadow only inside the text --> */}
                <feComposite in="shadowColor" in2="offsetBlur" operator="in" />
                {/* <!-- Merge the shadow with the original text --> */}
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g transform={`rotate(-10 ${100} ${100})`}>
              {slices.map((slice, index) => {
                const totalSlices = slices.length;
                const sliceGap = 0.01; // Create a gap between slices (reduce angle slightly for each slice)
                const startAngle =
                  (Math.PI * 2 * index) / totalSlices + sliceGap;
                const endAngle =
                  (Math.PI * 2 * (index + 1)) / totalSlices - sliceGap;
                const labelAngle = (startAngle + endAngle) / 2;

                const sliceRadius = 85; // Maintain the same radius for the slices
                const x1 = 100 + sliceRadius * Math.cos(startAngle);
                const y1 = 100 + sliceRadius * Math.sin(startAngle);
                const x2 = 100 + sliceRadius * Math.cos(endAngle);
                const y2 = 100 + sliceRadius * Math.sin(endAngle);

                const textRadius = sliceRadius * 0.6; // Adjust text position similarly
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
                    {/* Transparent Path to create the gap */}

                    {/* Slice Path with color */}
                    <path
                      d={`M 100 100 L ${x1} ${y1} A ${sliceRadius} ${sliceRadius} 0 0 1 ${x2} ${y2} Z`}
                      fill="#3b2f2f"
                      fillOpacity="0"
                      stroke="none" // Remove the default stroke since the gap will handle it
                      className={cn("slice-indentation")}
                    />
                    <path
                      d={`M 100 100 L ${x1} ${y1} A ${sliceRadius} ${sliceRadius} 0 0 1 ${x2} ${y2} Z`}
                      fill={slice.color}
                      fillOpacity="0"
                      stroke="none" // Remove the default stroke since the gap will handle it
                      className={cn("slice-indentation")}
                    />
                    <path
                      d={`M 100 100 L ${x1} ${y1} A ${sliceRadius} ${sliceRadius} 0 0 1 ${x2} ${y2} Z`}
                      fill="none"
                      stroke="#000"
                      strokeOpacity="0"
                      strokeWidth="1.5" // Make the gap visible by setting a transparent stroke between slices
                    />

                    {/* Main Text (Unmodified text) */}
                    <text
                      x={textX + (sliceTranslations[index]?.x || 0)}
                      y={textY + (sliceTranslations[index]?.y || 0)}
                      fill="#fff" // Main text color
                      fontSize={sliceRadius * 0.08}
                      fontWeight="bold"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      transform={`rotate(${
                        (labelAngle * 180) / Math.PI +
                        (sliceTranslations[index].rotate || 0)
                      } ${textX} ${textY})`}
                      filter="url(#carved-in-shadow)"
                    >
                      {slice.name}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Indicator */}
        <div
          style={{
            position: "absolute",
            top: "-40px", // Adjust to position the tip overlapping the wheel
            left: "49.5%",
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
              transform: `rotate(${arrowTick ? rotationAmount : 0}deg)`, // Rotate to "jerky" effect, reset to 0
              transition: `transform ${
                arrowTick ? tickDuration : tickDuration * 2
              }ms ease-${arrowTick ? "in-out" : "out"}`, // Slow return to original position
              filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
            }}
          />
        </div>
      </div>
    </div>
  );
};

{
  /* Indicator */
}
{
  /* <div
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
      transform: `rotate(-${rotationAmount}deg)`, // Use dynamic rotation based on speed
      transition: `transform ${Math.max(100, tickDuration)}ms ease-in-out`, // Smooth transition based on tickDuration
      filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
    }}
  />
</div> */
}
