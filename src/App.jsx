import React, { useState }from "react";
import { products, backgrounds, views } from "./config";
import { Sidebar } from "./components/Sidebar";
import { TopPanel } from "./components/TopPanel";
import { Rnd } from "react-rnd";

const App = () => {
    const [selectedProduct, setSelectedProduct] = useState('tshirt')
    const [selectedView, setSelectedView] = useState('front')
    const [frontImage, setFrontImage] = useState(null)
    const [backImage, setBackImage] = useState(null)

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
                    onFrontImageSelect={setFrontImage}
                    onBackImageSelect={setBackImage}
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

                    <div className="print-area border-dotted border-2 rounded-sm --front absolute z-10">
                        {frontImage && selectedView === 'front' && (
                            <Rnd
                                bounds="parent"
                                default={{
                                x: 0,
                                y: 0,
                                width: 150,
                                height: 150,
                                }}
                            >
                                {frontImage && <img
                                    src={frontImage}
                                    alt="image"
                                    style={{
                                        position: "absolute",
                                        width: 150,
                                        height: 150,
                                        cursor: "move",
                                    }}
                                />}
                            </Rnd>
                        )}
                        {backImage && selectedView === 'back' && (
                            <Rnd
                                bounds="parent"
                                default={{
                                x: 0,
                                y: 0,
                                width: 150,
                                height: 150,
                                }}
                            >
                                {backImage && <img
                                    src={backImage}
                                    alt="image"
                                    style={{
                                        position: "absolute",
                                        width: 150,
                                        height: 150,
                                        cursor: "move",
                                    }}
                                />}
                            </Rnd>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </main>
)
}

export default App