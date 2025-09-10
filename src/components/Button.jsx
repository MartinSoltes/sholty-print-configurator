export const Button = ({children, onClick, disabled = false}) => {
  return (
    <button
      className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 
      focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-neutral-700
      transition-all duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}