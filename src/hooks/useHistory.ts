import { useState, useCallback } from "react";

export function useHistory<T>(initialState: T) {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Current value in the timeline
  const present = history[currentIndex];

  // 🔁 Add new state to the history
  const set = useCallback(
    (newState: T) => {
      const sliced = history.slice(0, currentIndex + 1);
      setHistory([...sliced, newState]);
      setCurrentIndex(sliced.length);
    },
    [history, currentIndex]
  );

  // ⬅️ Undo one step
  const undo = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  // ➡️ Redo one step
  const redo = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, history.length - 1));
  }, [history.length]);

  // 🧹 Reset to a new initial state
  const reset = useCallback((newInitial: T) => {
    setHistory([newInitial]);
    setCurrentIndex(0);
  }, []);

  return { present, set, undo, redo, reset, canUndo: currentIndex > 0, canRedo: currentIndex < history.length - 1 };
}
