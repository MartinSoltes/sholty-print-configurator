import { useHistory } from "@/hooks/useHistory";
import { DesignViews, DesignImage, DesignText } from "@/types";

/**
 * Custom hook to manage design elements (images & texts)
 * with built-in undo/redo history tracking.
 */
export function useDesignElements() {
  const { present, set, undo, redo, canUndo, canRedo, reset } = useHistory<{
    images: DesignViews<DesignImage>;
    texts: DesignViews<DesignText>;
  }>({
    images: { front: [], back: [] },
    texts: { front: [], back: [] },
  });

  const { images, texts } = present;

  // --- 🖼️ Add new images ---
  const handleAddImage = (view: "front" | "back", files: DesignImage[]) => {
    set({
      ...present,
      images: {
        ...images,
        [view]: [...images[view], ...files],
      },
    });
  };

  // --- 🔤 Add new text ---
  const handleAddText = (view: "front" | "back", content: string) => {
    const newText: DesignText = {
      id: crypto.randomUUID(),
      content,
      x: 0,
      y: 0,
      fontSize: 20,
      fontFamily: "Arial",
      color: "#000000",
      bold: false,
      italic: false,
      align: "left",
    };
    
    set({
      ...present,
      texts: {
        ...texts,
        [view]: [...texts[view], newText],
      },
    });
  };

  // --- 🔄 Update image properties (position, size, etc.) ---
  const updateImage = (
    view: "front" | "back",
    id: string,
    updates: Partial<DesignImage>
  ) => {
    set({
      ...present,
      images: {
        ...images,
        [view]: images[view].map((img) =>
          img.id === id ? { ...img, ...updates } : img
        ),
      },
    });
  };

  // --- ✏️ Update or remove text properties ---
  const updateText = (
    view: "front" | "back",
    id: string,
    updates: Partial<DesignText> & { remove?: boolean }
  ) => {
    set({
      ...present,
      texts: {
        ...texts,
        [view]: updates.remove
          ? texts[view].filter((txt) => txt.id !== id)
          : texts[view].map((txt) =>
              txt.id === id ? { ...txt, ...updates } : txt
            ),
      },
    });
  };

  // --- 🧹 Reset all elements ---
  const resetDesign = () => {
    reset({
      images: { front: [], back: [] },
      texts: { front: [], back: [] },
    });
  };

  return {
    images,
    texts,
    handleAddImage,
    handleAddText,
    updateImage,
    updateText,
    undo,
    redo,
    canUndo,
    canRedo,
    resetDesign,
  };
}
