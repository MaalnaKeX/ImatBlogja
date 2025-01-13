import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

const PwReset = () => {

  const {message, resetPassword} = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    console.log(data.get("email"))
    resetPassword(data.get("email"))
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4 w-96 bg-zinc-900 p-6 rounded-lg'>
        <h1 className="text-3xl">Reset Password</h1>
        <input type="text" placeholder='your.email@example.com' name='email' className='bg-[#2a2a30] rounded-lg outline-none px-3 p-2 w-full' />
        <div className='w-full flex gap-2'>
          <NavLink to="/auth/in" className="bg-[#2a2a30] rounded-lg p-2 px-4 font-bold">&lt;</NavLink>
          <button className='bg-blue-600 rounded-lg px-5 p-2 w-full'>Request new Password</button>
        </div>
      </form>
    </div>
  )
}

export default PwReset
