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
          <FileButton 
            multiple={true}
            useDataUrl={false}
            files={images[selectedView]} 
            callback={handleFileChange}/>
        </div>
    </div>
  )
}
