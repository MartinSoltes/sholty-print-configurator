import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import html2canvas from "html2canvas";
import { products, backgrounds, views } from "./config";
import { Sidebar } from "./components/Sidebar";
import { TopPanel } from "./components/TopPanel";

// --- 🧱 Type Definitions ---
interface DesignImage {
  id: string;
  src: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DesignText {
  id: string;
  content: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
}

interface DesignViews<T> {
  front: T[];
  back: T[];
}

// --- 🧠 Main Component ---
const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("tshirt");
  const [selectedView, setSelectedView] = useState<"front" | "back">("front");

  const [images, setImages] = useState<DesignViews<DesignImage>>({
    front: [],
    back: [],
  });

  const [texts, setTexts] = useState<DesignViews<DesignText>>({
    front: [],
    back: [],
  });

  const [newText, setNewText] = useState<string>("");
  const [showTextInput, setShowTextInput] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // --- 🧠 Future AI integration placeholder ---
  const generateAISlogans = async (topic: string) => {
    console.log("Generate AI slogans for:", topic);
    // Example later:
    // const response = await fetch("/api/generate-slogan", { method: "POST", body: JSON.stringify({ topic }) });
  };

  // --- 🖼️ Add Image ---
  const addImage = (
    view: "front" | "back",
    fileObjOrArray: { src: string; name: string } | { src: string; name: string }[]
  ) => {
    const files = Array.isArray(fileObjOrArray)
      ? fileObjOrArray
      : [fileObjOrArray];

    setImages((prev) => ({
      ...prev,
      [view]: [
        ...prev[view],
        ...files.map((file) => ({
          id: crypto.randomUUID(),
          src: file.src,
          name: file.name,
          x: 0,
          y: 0,
          width: 150,
          height: 150,
        })),
      ],
    }));
  };

  // --- ✏️ Add Text ---
  const addText = (view: "front" | "back", content: string) => {
    if (!content.trim()) return;

    setTexts((prev) => ({
      ...prev,
      [view]: [
        ...prev[view],
        {
          id: crypto.randomUUID(),
          content,
          x: 0,
          y: 0,
          fontSize: 20,
          fontFamily: "Arial",
          color: "#000000",
        },
      ],
    }));

    setNewText("");
    setShowTextInput(false);
  };

  // --- 💾 Export Functionality ---
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

  // --- 🌆 Background selection ---
  const selectedBg =
    backgrounds.find(
      (bg) => bg.type === selectedProduct && bg.view === selectedView
    )?.image ?? "";

  // --- 🧩 Render ---
  return (
    <main className="h-screen">
      <div className="grid grid-cols-12 h-full">
        {/* --- Sidebar --- */}
        <div className="col-span-3">
          <Sidebar
            products={products}
            selectedProduct={selectedProduct}
            selectedView={selectedView}
            onProductSelect={setSelectedProduct}
            images={images}
            onAddImage={addImage}
            texts={texts}
            newText={newText}
            showTextInput={showTextInput}
            setShowTextInput={setShowTextInput}
            setNewText={setNewText}
            onAddText={addText}
            onGenerateAI={generateAISlogans}
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
            <h2 className="text-3xl font-bold">Náhľad produktu</h2>
            <button
              onClick={handleExport}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Exportovať dizajn
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
                    setImages((prev) => ({
                      ...prev,
                      [selectedView]: prev[selectedView].map((i) =>
                        i.id === img.id ? { ...i, x: d.x, y: d.y } : i
                      ),
                    }))
                  }
                  onResizeStop={(_, __, ref, ___, position) =>
                    setImages((prev) => ({
                      ...prev,
                      [selectedView]: prev[selectedView].map((i) =>
                        i.id === img.id
                          ? {
                              ...i,
                              width: parseInt(ref.style.width),
                              height: parseInt(ref.style.height),
                              ...position,
                            }
                          : i
                      ),
                    }))
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
      </div>
    </main>
  );
};

export default App;
