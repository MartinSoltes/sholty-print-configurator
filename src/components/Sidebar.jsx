import React from 'react'
import OptionButton from './OptionButton'
import FileButton from './FileButton'
import { Button } from './Button'
import LogoGenerator from './LogoGenerator'

export const Sidebar = ({products, selectedProduct, onProductSelect, onAddImage, selectedView, images, texts, newText, setNewText, showTextInput, setShowTextInput, onAddText}) => {
  
  const handleFileChange = (files) => {
    onAddImage(selectedView, files);
  }

  return (
    <div className='bg-slate-950 h-full text-white p-4'>
        {products && (
            <div className='flex flex-col gap-2 mb-6'>
                <h2 className="text-2xl font-semibold mb-2">Produkt</h2>

                {products.map((product, index) => (
                    <OptionButton 
                      key={index}
                      name="product"  
                      option={product} 
                      type="radio" 
                      checked={selectedProduct === product.value}
                      onChange={(value) => onProductSelect(value)} />
                ))}
            </div>
        )}

        <div className='flex flex-col gap-2 mb-4'>
          <h2 className="text-2xl font-semibold mb-2">{selectedView === 'front' ? "Potlač vpredu" : "Potlač vzadu"}</h2>
          <h3 className='text-lg font-semibold mb-1'>Logo / Obrázok</h3>

          {images[selectedView].length > 0 && (
            <div className='flex flex-col gap-2 overflow-y-auto mb-2'>
              {images[selectedView].map((img) => (
                <div key={img.id} className='bg-slate-800 p-2 rounded flex items-center gap-2'>
                  <img src={img.src} alt={img.name} className='w-10 h-10 object-cover rounded' />
                  <span className='text-sm'>{img.name}</span>
                </div>
              ))}
            </div>
          )}

          <FileButton 
            multiple={true}
            useDataUrl={false}
            files={images[selectedView]}
            accept=".png, .jpg, .jpeg, .svg" 
            callback={handleFileChange}/>
            {!images[selectedView].length && 
              <p className='text-sm text-center italic'>Vyberte jeden alebo viac obrázkov vo formáte .png, .jpg, .jpeg, .svg</p>
            } 

            <h3 className='text-lg font-semibold mt-4'>Text</h3>

            {texts[selectedView].length > 0 && (
              <div className='flex flex-col gap-2 mt-2 overflow-y-auto'>
                {texts[selectedView].map((text) => (
                  <div key={text.id} className='bg-slate-800 p-2 rounded flex items-center gap-2'>
                    <span className='text-sm'>{text.content}</span>
                  </div>
                ))}
              </div>
            )}

            {!showTextInput && (
              <Button onClick={() => setShowTextInput(true)}>Pridať text</Button>
            )}

            {showTextInput && (
              <div className='mt-2 flex flex-col gap-2'>
                <input 
                  type="text" 
                  value={newText || ""}
                  onChange={(e) => setNewText(e.target.value)} 
                  className='w-full p-2 rounded border border-neutral-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400'
                  placeholder='Zadajte text' 
                />
                <Button onClick={() => {
                  if (newText && newText.trim()) {
                    onAddText(selectedView, newText.trim());
                  }
                }}>Uložiť</Button>
              </div>
            )}
        </div>
    </div>
  )
}
