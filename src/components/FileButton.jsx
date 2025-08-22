import React, { useState } from 'react'

const FileButton = ({callback}) => {
    const [fileName, setFileName] = useState("");



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setFileName(file.name);
    };

  return (
    <label className={`flex justify-center items-center w-full p-2 rounded-md border-2 border-neutral-500 shadow-sm
             hover:bg-indigo-500 hover:text-white hover:border-indigo-500  
             focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-neutral-700
             transition-all duration-200 cursor-pointer + ${fileName ? "bg-indigo-600 active:border-indigo-600" : "bg-neutral-100 text-neutral-900 font-medium" }`}>
        <input type="file" className='hidden' onChange={(e) => {
            handleFileChange(e);
            callback(e);
        }} />
        {fileName ? fileName : 'Vyberte obrázok'}
    </label>
  )
}

export default FileButton