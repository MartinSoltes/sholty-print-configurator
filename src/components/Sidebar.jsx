import React from 'react'
import OptionButton from './OptionButton'
import FileButton from './FileButton'
import LogoGenerator from './LogoGenerator'

export const Sidebar = ({products, selectedProduct, onProductSelect, onAddImage, selectedView, images}) => {
  
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
        </div>
    </div>
  )
}
