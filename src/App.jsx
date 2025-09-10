import React, { useState }from "react";
import { Sidebar } from "./components/Sidebar";
import { TopPanel } from "./components/TopPanel";
import { Rnd } from "react-rnd";

const App = () => {
    const [selectedProduct, setSelectedProduct] = useState('tshirt')
    const [selectedView, setSelectedView] = useState('front')
    const [frontImage, setFrontImage] = useState(null)
    const [backImage, setBackImage] = useState(null)

    const views = [
        {
            title: 'Vpredu',
            value: 'front'
        },
        {
            title: 'Vzadu',
            value: 'back'
        }
    ]

    const products = [
        {
            title: 'Tricko',
            value: 'tshirt'
        },
        {
            title: 'Polo',
            value: 'polo'
        },
        {
            title: 'Mikina',
            value: 'hoodie'
        }
    ]

    const backgrounds = [
        {
            type: 'tshirt',
            view: 'front',
            image: './assets/bg-tshirt-front.jpg'
        },
        {
            type: 'tshirt',
            view: 'back',
            image: './assets/bg-tshirt-back.jpg'
        },
        {
            type: 'polo',
            view: 'front',
            image: './assets/bg-polo.jpg'
        },
        {
            type: 'polo',
            view: 'back',
            image: './assets/bg-polo.jpg'
        },
        {
            type: 'hoodie',
            view: 'front',
            image: './assets/bg-hoodie.jpg'
        },
        {
            type: 'hoodie',
            view: 'back',
            image: './assets/bg-hoodie.jpg'
        }
    ]

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
                        {frontImage && (
                            <Rnd
                                bounds="parent"
                                default={{
                                x: 0,
                                y: 0,
                                width: 150,
                                height: 150,
                                }}
                            >
                                <img
                                    src={frontImage}
                                    alt="Front image"
                                    style={{
                                        position: "absolute",
                                        width: 150,
                                        height: 150,
                                        cursor: "move",
                                    }}
                                />
                            </Rnd>
                        )}
                    </div>

                    <div className="print-area border-dotted border-2 rounded-sm --back absolute z-10">
                        {backImage && (
                            <Rnd
                                bounds="parent"
                                default={{
                                x: 0,
                                y: 0,
                                width: 150,
                                height: 150,
                                }}
                            >
                                <img
                                    src={backImage}
                                    alt="Back image"
                                    style={{
                                        position: "absolute",
                                        width: 150,
                                        height: 150,
                                        cursor: "move",
                                    }}
                                />
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