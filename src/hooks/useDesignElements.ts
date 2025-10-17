import { useState } from "react";
import { DesignImage, DesignText, DesignViews } from "@/types";

/**
 * Custom hook for managing design elements (images + texts)
 * across product views (front/back).
 */
export const useDesignElements = () => {
  const [images, setImages] = useState<DesignViews<DesignImage>>({
    front: [],
    back: [],
  });

  const [texts, setTexts] = useState<DesignViews<DesignText>>({
    front: [],
    back: [],
  });

  /**
   * Add new uploaded images to the selected view
   */
  const handleAddImage = (view: "front" | "back", files: DesignImage[]) => {
    setImages((prev) => ({
      ...prev,
      [view]: [...prev[view], ...files],
    }));
  };

  /**
   * Add new text element to the selected view
   */
  const handleAddText = (view: "front" | "back", content: string) => {
    if (!content.trim()) return;

    const newText: DesignText = {
      id: crypto.randomUUID(),
      content,
      x: 0,
      y: 0,
      fontSize: 20,
      fontFamily: "Arial",
      color: "#000000",
    };

    setTexts((prev) => ({
      ...prev,
      [view]: [...prev[view], newText],
    }));
  };

  /**
   * Update an image (position, size, etc.) after drag/resize
   */
  const updateImage = (
    view: "front" | "back",
    id: string,
    updatedData: Partial<DesignImage>
  ) => {
    setImages((prev) => ({
      ...prev,
      [view]: prev[view].map((img) =>
        img.id === id ? { ...img, ...updatedData } : img
      ),
    }));
  };

  /**
   * Update a text element (position, style, etc.)
   */
  const updateText = (
    view: "front" | "back",
    id: string,
    updatedData: Partial<DesignText>
  ) => {
    setTexts((prev) => ({
      ...prev,
      [view]: prev[view].map((txt) =>
        txt.id === id ? { ...txt, ...updatedData } : txt
      ),
    }));
  };

  return {
    images,
    texts,
    handleAddImage,
    handleAddText,
    updateImage,
    updateText,
    setImages,
    setTexts,
  };
};
