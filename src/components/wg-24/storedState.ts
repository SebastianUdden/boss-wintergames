import { useState, useCallback } from "react";

// Define a prefix for all keys
const PREFIX = "bpg-";

// Utility function to get a value from localStorage
export const getStored = <T>(key: string): T | undefined => {
  const value = localStorage.getItem(PREFIX + key);
  if (value === null) return undefined; // Return undefined if the key doesn't exist
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`Error parsing localStorage key "${PREFIX + key}":`, error);
    return undefined;
  }
};
// Utility function to set a value in localStorage
export const setStored = <T>(key: string, value: T): void => {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
};

// Utility function to delete all localStorage keys starting with the prefix
export const clearPrefixedStored = (): void => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(PREFIX)) {
      localStorage.removeItem(key);
    }
  });
};

// Custom hook for state + localStorage sync with type safety
export const useStoredState = <T>(key: string, initialValue?: T) => {
  const [state, setState] = useState<T | undefined>(
    () => getStored<T>(key) ?? initialValue
  );

  const setStoredState = useCallback(
    (valueOrUpdater: T | ((prev: T | undefined) => T)) => {
      setState((prev) => {
        const valueToStore =
          typeof valueOrUpdater === "function"
            ? (valueOrUpdater as (prev: T | undefined) => T)(prev)
            : valueOrUpdater;
        setStored(key, valueToStore);
        return valueToStore;
      });
    },
    [key]
  );

  return [state, setStoredState] as const;
};
