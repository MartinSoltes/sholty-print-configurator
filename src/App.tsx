import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import html2canvas from "html2canvas";
import { getProducts, backgrounds, getViews } from "./config";
import { Sidebar } from "./components/Sidebar";
import { TopPanel } from "./components/TopPanel";
import { useDesignElements } from "@/hooks/useDesignElements";
import { fetchSlogans } from "@/api/ai";
import { useTranslation } from "@/context/TranslationContext";

// --- 🧠 Main Component ---
const App: React.FC = () => {
  const { t } = useTranslation();
  const views = getViews(t);
  const products = getProducts(t);
  const [selectedProduct, setSelectedProduct] = useState<string>("tshirt");
  const [selectedView, setSelectedView] = useState<"front" | "back">("front");
  const [newText, setNewText] = useState<string>("");
  const [showTextInput, setShowTextInput] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const {
    images,
    texts,
    handleAddImage,
    handleAddText,
    updateImage,
    updateText,
  } = useDesignElements();
  const [aiResults, setAiResults] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  // --- 🤖 AI slogan generation ---
  const handleGenerateAI = async (topic: string) => {
    if (!topic.trim()) return;
    setAiLoading(true);
    const results = await fetchSlogans(topic.trim());
    setAiResults(results);
    setAiLoading(false);
  };

  // --- 💾 Export design as PNG ---
  const handleExport = async (): Promise<void> => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      backgroundColor: null,
      scale: 2,
    });
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${selectedProduct}-${selectedView}.png`;
    link.click();
  };

  // --- 🌆 Select background ---
  const selectedBg =
    backgrounds.find(
      (bg) => bg.type === selectedProduct && bg.view === selectedView
    )?.image ?? "";

  // --- 🧩 Render ---
  return (
    <main className="h-screen grid grid-cols-12 h-full">
      {/* --- Sidebar --- */}
      <div className="col-span-3">
        <Sidebar
          products={products}
          selectedProduct={selectedProduct}
          selectedView={selectedView}
          onProductSelect={setSelectedProduct}
          images={images}
          onAddImage={handleAddImage}
          texts={texts}
          newText={newText}
          showTextInput={showTextInput}
          setShowTextInput={setShowTextInput}
          setNewText={setNewText}
          onAddText={handleAddText}
          onGenerateAI={handleGenerateAI}
          aiResults={aiResults}
          aiLoading={aiLoading}
        />
      </div>

      {/* --- Main Preview Area --- */}
      <div className="col-span-9">
        <TopPanel
          selectedView={selectedView}
          views={views}
          onViewSelect={setSelectedView}
        />

        <div className="flex items-center justify-between p-4">
          <h2 className="text-3xl font-bold">{t("productPreview")}</h2>
          <button
            onClick={handleExport}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {t("exportDesign")}
          </button>
        </div>

        <div
          id="tshirt-canvas"
          ref={previewRef}
          className={`preview relative w-full rounded-xl overflow-hidden shadow-lg p-4 mx-auto --${selectedProduct} --${selectedView}`}
          style={{
            backgroundImage: `url(${selectedBg})`,
          }}
        >
          <div className="print-area absolute inset-0 z-10 overflow-hidden">
            {/* --- Images --- */}
            {images[selectedView].map((img) => (
              <Rnd
                key={img.id}
                default={{
                  x: img.x,
                  y: img.y,
                  width: img.width,
                  height: img.height,
                }}
                bounds="parent"
                minWidth={50}
                minHeight={50}
                className="print-element"
                onDragStop={(_, d) =>
                  updateImage(selectedView, img.id, { x: d.x, y: d.y })
                }
                onResizeStop={(_, __, ref, ___, position) =>
                  updateImage(selectedView, img.id, {
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                    ...position,
                  })
                }
              >
                <img
                  src={img.src}
                  alt={img.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    cursor: "move",
                  }}
                />
              </Rnd>
            ))}

            {/* --- Texts --- */}
            {texts[selectedView].map((text) => (
              <Rnd
                key={text.id}
                default={{
                  x: text.x,
                  y: text.y,
                  width: 200,
                  height: text.fontSize + 10,
                }}
                bounds="parent"
                className="print-element"
              >
                <div
                  style={{
                    fontSize: text.fontSize,
                    fontFamily: text.fontFamily,
                    color: text.color,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {text.content}
                </div>
              </Rnd>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
