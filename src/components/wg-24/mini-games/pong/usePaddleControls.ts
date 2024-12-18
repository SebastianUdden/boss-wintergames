import { useEffect, useState, RefObject } from "react";

type UsePaddleControlsProps = {
  gameState: "ready" | "active" | "finished";
  gameBoxRef: RefObject<HTMLDivElement>;
  initialPaddleHeight: number;
};

type UsePaddleControlsReturn = {
  keys: { [key: string]: boolean };
  player1PaddleHeight: number;
  player2PaddleHeight: number;
  resetPaddleHeights: () => void;
};

export const usePaddleControls = ({
  gameState,
  gameBoxRef,
  initialPaddleHeight,
}: UsePaddleControlsProps): UsePaddleControlsReturn => {
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});
  const [keyDebounce, setKeyDebounce] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [player1PaddleHeight, setPlayer1PaddleHeight] =
    useState(initialPaddleHeight);
  const [player2PaddleHeight, setPlayer2PaddleHeight] =
    useState(initialPaddleHeight);

  const resetPaddleHeights = () => {
    setPlayer1PaddleHeight(initialPaddleHeight);
    setPlayer2PaddleHeight(initialPaddleHeight);
  };

  useEffect(() => {
    if (gameState !== "active") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      setKeys((prev) => ({ ...prev, [key]: true }));

      const gameBox = gameBoxRef.current?.getBoundingClientRect();
      if (!gameBox) return;

      const step = gameBox.height / 10;

      if (!keyDebounce[key]) {
        setKeyDebounce((prev) => ({ ...prev, [key]: true }));

        // Player 1 Paddle Height Control
        if (key === "a" && player1PaddleHeight > step) {
          setPlayer1PaddleHeight((prev) => Math.max(prev - step, step));
        }
        if (key === "d" && player1PaddleHeight < gameBox.height) {
          setPlayer1PaddleHeight((prev) =>
            Math.min(prev + step, gameBox.height)
          );
        }

        // Player 2 Paddle Height Control
        if (key === "ArrowLeft" && player2PaddleHeight > step) {
          setPlayer2PaddleHeight((prev) => Math.max(prev - step, step));
        }
        if (key === "ArrowRight" && player2PaddleHeight < gameBox.height) {
          setPlayer2PaddleHeight((prev) =>
            Math.min(prev + step, gameBox.height)
          );
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key;
      setKeys((prev) => ({ ...prev, [key]: false }));
      setKeyDebounce((prev) => ({ ...prev, [key]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    gameState,
    player1PaddleHeight,
    player2PaddleHeight,
    keyDebounce,
    gameBoxRef,
  ]);

  return {
    keys,
    player1PaddleHeight,
    player2PaddleHeight,
    resetPaddleHeights,
  };
};
