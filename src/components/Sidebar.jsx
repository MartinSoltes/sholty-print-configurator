import React from 'react'
import OptionButton from './OptionButton'
import FileButton from './FileButton'
import LogoGenerator from './LogoGenerator'

export const Sidebar = ({products, selectedProduct, onProductSelect, onFrontImageSelect, onBackImageSelect, selectedView}) => {
  const handleFrontFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onFrontImageSelect(URL.createObjectURL(file));
  }

  const handleBacktFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onBackImageSelect(URL.createObjectURL(file));
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

        {selectedView === 'front' && (
          <div className='flex flex-col gap-2 mb-4'>
            <h2 className="text-2xl font-semibold mb-2">Potlač vpredu</h2>
            <FileButton callback={handleFrontFileChange}/>
          </div>
        )}

        {selectedView === 'back' && ( 
          <div className='flex flex-col gap-2 mb-4'>
            <h2 className="text-2xl font-semibold mb-2">Potlač vzadu</h2>
            <FileButton callback={handleBacktFileChange}/>
          </div>
        )}

        {/* <div className='flex flex-col gap-2 mb-4'>
          <h2 className="text-2xl font-semibold mb-2">Generovať logo</h2>
          <LogoGenerator/>
        </div> */}
    </div>
  )
}
