import OptionButton from "./OptionButton"

export const TopPanel = ({views, selectedView, onViewSelect}) => {
  return (
    <div className="w-full bg-slate-900 text-white p-4 flex justify-center items-center">
        {views && (
            <div className='flex flex-col gap-2 w-full max-w-md'>
                <h2 className="text-xl font-semibold mb-2">Strana produktu</h2>

                <div className='grid grid-cols-2 gap-2'>
                    {views.map((view, index) => (
                        <OptionButton
                        key={index}
                        name='view'
                        option={view}
                        type='radio'
                        checked={selectedView === view.value}
                        onChange={(value) => onViewSelect(value)}
                        />
                    ))}
                </div>
            </div>      
        )}
    </div>
  )
}