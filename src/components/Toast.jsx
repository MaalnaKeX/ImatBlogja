import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { UserContext } from '../context/UserContext'



export const Toast = (title) => {
  const {setMessage} = useContext(UserContext)
  const toast = useRef()
  const [isShown, setIsShown] = useState(false)

  return (
    <div className='absolute top-0 left-0 h-screen w-screen flex justify-center items-center pointer-events-none'>
      <div ref={toast} className={`h-max w-max ${isShown ? "block" : "hidden"}`}>
        <p>asd</p>
      </div>
    </div>
  )
}