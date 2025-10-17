import React from 'react'

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  className = "",
}) => {
  return (
    <button 
        type={type}
        className={`flex justify-center items-center w-full p-2 rounded-md border-2 border-neutral-500 shadow-sm
             hover:bg-indigo-500 hover:text-white hover:border-indigo-500  
             focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-neutral-700
             transition-all duration-200 cursor-pointer bg-neutral-100 text-neutral-900 font-medium ${className}`}
        onClick={onClick}
    >{children}
    </button>
  )
}
