import React from 'react'

interface OptionButtonProps {
  name: string;
  option: {
    label: string;
    value: string;
  };
  type: "radio" | "checkbox";
  checked: boolean;
  onChange: (value: string) => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  name,
  option,
  type,
  checked,
  onChange,
}) => {
    return (
        <label className={`flex justify-center items-center w-full p-2 rounded-md border-2 border-neutral-500 shadow-sm
             hover:bg-indigo-500 hover:text-white hover:border-indigo-500  
             focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-neutral-700
             transition-all duration-200 cursor-pointer + ${checked ? "bg-indigo-600 active:border-indigo-600" : "bg-neutral-100 text-neutral-900 font-medium" }`}>
            {option.label}
            <input className='opacity-0 w-0 h-0'
                type={type} 
                name={option.label} 
                value={option.value} 
                id={option.value} 
                checked={checked}
                onChange={(e) => onChange(e.target.value)}
            />
        </label>
    )
}

export default OptionButton