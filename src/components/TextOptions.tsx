// TextOptions.tsx
import React from 'react'

interface TextOptionsProps {
  textId: string
  fontSize: number
  fontColor: string
  fontFamily: string
  onChange: (id: string, changes: Partial<TextOptionsProps>) => void
}

export default function TextOptions({ textId, fontSize, fontColor, fontFamily, onChange }: TextOptionsProps) {
  return (
    <div className="bg-slate-700 mt-2 p-2 rounded text-sm flex flex-col gap-2">
      <label className="flex justify-between">
        <span>Font size</span>
        <input
          type="number"
          value={fontSize}
          onChange={(e) => onChange(textId, { fontSize: +e.target.value })}
          className="w-16 bg-slate-800 rounded px-2"
        />
      </label>

      <label className="flex justify-between">
        <span>Color</span>
        <input
          type="color"
          value={fontColor}
          onChange={(e) => onChange(textId, { fontColor: e.target.value })}
        />
      </label>

      <label className="flex justify-between">
        <span>Font family</span>
        <select
          value={fontFamily}
          onChange={(e) => onChange(textId, { fontFamily: e.target.value })}
          className="bg-slate-800 rounded px-2"
        >
          <option value="Arial">Arial</option>
          <option value="Roboto">Roboto</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Montserrat">Montserrat</option>
        </select>
      </label>
    </div>
  )
}
