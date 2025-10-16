import React, { useState }from "react";
import { products, backgrounds, views } from "./config";
import { Sidebar } from "./components/Sidebar";
import { TopPanel } from "./components/TopPanel";
import { Rnd } from "react-rnd";

const App = () => {
    const [selectedProduct, setSelectedProduct] = useState('tshirt')
    const [selectedView, setSelectedView] = useState('front')

    const [images, setImages] = useState({
        front: [],
        back: []
    })

    const [texts, setTexts] = useState({
        front: [],
        back: []
    })
    const [newText, setNewText] = useState("")
    const [showTextInput, setShowTextInput] = useState(false)

    const addImage = (view, fileObjOrArray) => {
        const files = Array.isArray(fileObjOrArray) ? fileObjOrArray : [fileObjOrArray];

        setImages(prev => ({
            ...prev,
            [view]: [
                ...files.map(file => ({
                    id: crypto.randomUUID(),
                    src: file.src,
                    name: file.name,
                    x: 0,
                    y: 0,
                    width: 150,
                    height: 150
                }))
            ]
        }))
    }

    const addText = (view, content) => {
        if (!content.trim()) return;

        setTexts(prev => ({
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
                    color: '#000000'
                }
            ]
        }))

        setNewText("")
        setShowTextInput(false)
    }

    const selectedBg = backgrounds.find((bg) => bg.type === selectedProduct && bg.view === selectedView)?.image

return (
    <main className="h-screen">
        <div className="grid grid-cols-12 h-full">
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
                />
            </div>
            <div className="col-span-9">
                <TopPanel 
                    selectedView={selectedView}
                    views={views}
                    onViewSelect={setSelectedView}
                />
                <h2 className="text-3xl font-bold p-4">Náhľad produktu</h2>
                <div className={`preview w-full relative rounded-xl overflow-hidden shadow-lg p-4 mx-auto --${selectedProduct} --${selectedView}`}>
                    {selectedBg && (
                        <img
                            src={selectedBg}
                            alt={selectedProduct}
                            className="w-full h-full object-cover -z-10"
                        />
                    )}

                    <div className="print-area --front absolute z-10 overflow-hidden">
                        {images[selectedView].map((img) => (
                            <Rnd
                                key={img.id}
                                default={{
                                    x: img.x,
                                    y: img.y,
                                    width: img.width,
                                    height: img.height
                                }}
                                bounds="parent"
                                minWidth={50}
                                minHeight={50}
                                resizeHandleComponent={{
                                    topRight: <div className="resize-handle top-right-handle" />,
                                    bottomRight: <div className="resize-handle bottom-right-handle" />,
                                    bottomLeft: <div className="resize-handle bottom-left-handle" />,
                                    topLeft: <div className="resize-handle top-left-handle" />
                                }}
                                className="print-element"
                                onDragStop={(e, d) => {
                                    // aktualizujeme pozíciu obrázku
                                    setImages(prev => ({
                                        ...prev,
                                        [selectedView]: prev[selectedView].map(i => i.id === img.id ? {...i, x: d.x, y: d.y} : i)
                                    }))
                                }}
                                onResizeStop={(e, direction, ref, delta, position) => {
                                    // aktualizujeme veľkosť a pozíciu obrázku
                                    setImages(prev => ({
                                        ...prev,
                                        [selectedView]: prev[selectedView].map(i => i.id === img.id ? {
                                            ...i, 
                                            width: parseInt(ref.style.width), 
                                            height: parseInt(ref.style.height),
                                            ...position
                                        } : i)
                                    }))
                                }}
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

                        {texts[selectedView].map((text) => (
                            <Rnd
                                key={text.id}
                                default={{
                                    x: text.x,
                                    y: text.y,
                                    width: 200,
                                    height: text.fontSize + 10
                                }}
                                resizeHandleComponent={{
                                    topRight: <div className="resize-handle top-right-handle" />,
                                    bottomRight: <div className="resize-handle bottom-right-handle" />,
                                    bottomLeft: <div className="resize-handle bottom-left-handle" />,
                                    topLeft: <div className="resize-handle top-left-handle" />
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
)
}

export default App