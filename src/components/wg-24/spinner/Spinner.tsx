import { Wheel } from "./Wheel";
import { useEffect, useState } from "react";
import { miniGames } from "../mini-games/miniGames";
import { Phase } from "../Layout";

interface ISpinner {
  turn: string;
  phase?: Phase;
  wheelSize: string;
  onGameSelected: (game: string) => void;
  onPhaseChange: (phase: Phase) => void;
}

export const Spinner = ({
  turn,
  phase,
  wheelSize,
  onGameSelected,
  onPhaseChange,
}: ISpinner) => {
  const [slices, setSlices] = useState(miniGames);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(
    null
  );
  const spins = 1;
  const multiplier = 1;

  // Function to get a random slice based on weights, excluding the last selected index
  const getRandomSliceIndex = () => {
    let availableSlices = slices.map((slice, index) => ({
      ...slice,
      index,
    }));

    // Filter out the last selected slice to avoid consecutive selection
    if (lastSelectedIndex !== null) {
      availableSlices = availableSlices.filter(
        (slice) => slice.index !== lastSelectedIndex
      );
    }

    const totalWeight = availableSlices.reduce(
      (acc, slice) => acc + 1 / slice.weight,
      0
    );
    let randomNum = Math.random() * totalWeight;

    for (const availableSlice of availableSlices) {
      randomNum -= 1 / availableSlice.weight;
      if (randomNum <= 0) return availableSlice.index;
    }

    return availableSlices[0].index; // Fallback to the first available slice if something goes wrong
  };

  // Spin function to select a slice and update its weight
  const handleSpin = () => {
    const index = getRandomSliceIndex();
    setSelectedIndex(index);
    setLastSelectedIndex(index);

    // Increase the weight of the selected slice to make it less likely to be chosen again
    const updatedSlices = slices.map((slice, i) =>
      i === index ? { ...slice, weight: slice.weight + 1 } : slice
    );

    setSlices(updatedSlices);
  };

  useEffect(() => {
    setSelectedIndex(undefined);
  }, [turn]);

  useEffect(() => {
    if (phase === "spinning-wheel") {
      setTimeout(() => {
        handleSpin();
      }, 1000);
    }
  }, [phase]);

  const selectedSlice =
    selectedIndex !== undefined ? slices.reverse()[selectedIndex] : undefined;
  const game = selectedSlice?.name ?? "";

  return (
    <div className="flex flex-col items-center justify-center flex-grow ml-[2.5vh]">
      <Wheel
        phase={phase}
        wheelSize={wheelSize}
        slices={slices.reverse()}
        selectedIndex={selectedIndex}
        spins={spins}
        multiplier={multiplier}
        onSliceClick={(slice) => {
          onGameSelected(slice.name);
        }}
        onSpinComplete={() => {
          onPhaseChange("transition-from-spinning");
          onGameSelected(game);
        }}
      />
    </div>
  );
};
