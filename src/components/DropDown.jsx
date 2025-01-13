import React from 'react'
import { useState } from 'react'

export const DropDown = ({title, children, selected, color = "bg-[#2a2a30]", canRotate = false}) => {

  const [open, setOpen] = useState(false)

  return (
    <div className='relative'>
      <input type="button" value={selected ? selected : title} className={`${!open && canRotate && "rotate-90"} transition-all cursor-pointer`} onClick={() => setOpen(!open)} onBlur={() => setTimeout(() => setOpen(false), 100)} />
      <div className={`absolute top-16 ${color} p-4 rounded-lg flex select-none ${open ? "opacity-100 z-50 translate-y-0" : "opacity-0 -z-50 -translate-y-10"} transition-all flex-col`}>
        { children }
      </div>
    </div>
  )
}