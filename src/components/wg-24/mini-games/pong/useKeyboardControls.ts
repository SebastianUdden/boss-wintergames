import { useState, useEffect } from "react";

type KeyMap = { [key: string]: boolean };

export const useKeyboardControls = (debounceKeys: string[] = []) => {
  const [keys, setKeys] = useState<KeyMap>({});
  const [debounce, setDebounce] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      setKeys((prev) => ({ ...prev, [key]: true }));

      // Debounce logic for specific keys
      if (debounceKeys.includes(key) && !debounce.has(key)) {
        setDebounce((prev) => new Set(prev).add(key));
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key;

      setKeys((prev) => ({ ...prev, [key]: false }));
      setDebounce((prev) => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [debounceKeys, debounce]);

  return { keys, debounce };
};
