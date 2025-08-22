import React, { useState }from "react";
import { Sidebar } from "./components/Sidebar";
import { Rnd } from "react-rnd";

const App = () => {
    const [selectedProduct, setSelectedProduct] = useState('tshirt')
    const [frontImage, setFrontImage] = useState(null)
    const [backImage, setBackImage] = useState(null)

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
            image: './assets/bg-tshirt.jpg'
        },
        {
            type: 'polo',
            image: './assets/bg-polo.jpg'
        },
        {
            type: 'hoodie',
            image: './assets/bg-hoodie.jpg'
        }
    ]

    const selectedBg = backgrounds.find((bg) => bg.type === selectedProduct)?.image

return (
    <main className="h-screen">
        <div className="grid grid-cols-12 h-full">
            <div className="col-span-3">
                <Sidebar 
                    products={products} 
                    selectedProduct={selectedProduct}
                    onProductSelect={setSelectedProduct}
                    onFrontImageSelect={setFrontImage}
                    onBackImageSelect={setBackImage}
                />
            </div>
            <div className="col-span-9 p-2">
                <h2 className="text-3xl font-bold mb-3">Náhľad produktu</h2>
                <div className={`preview w-full relative rounded-xl overflow-hidden shadow-lg --${selectedProduct}`}>
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