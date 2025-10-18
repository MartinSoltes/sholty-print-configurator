import { useState, useCallback } from "react";

/**
 * Generic undo/redo history manager.
 * Deep-clones state on each update to prevent mutation issues.
 */
export function useHistory<T>(initialState: T) {
  const [history, setHistory] = useState<T[]>([structuredClone(initialState)]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const present = history[currentIndex];

  /** 🔁 Push a new state snapshot */
  const set = useCallback(
    (newState: T) => {
      const cloned = structuredClone(newState); // ✅ prevent reference mutation
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(cloned);
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    },
    [history, currentIndex]
  );

  /** ⬅️ Undo last change */
  const undo = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  /** ➡️ Redo change */
  const redo = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, history.length - 1));
  }, [history.length]);

  /** 🧹 Reset history */
  const reset = useCallback((newInitial: T) => {
    const cloned = structuredClone(newInitial);
    setHistory([cloned]);
    setCurrentIndex(0);
  }, []);

  return {
    present,
    set,
    undo,
    redo,
    reset,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
  };
}
