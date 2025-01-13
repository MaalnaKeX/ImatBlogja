import React from 'react'
import { useContext } from 'react'
import { Form, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useState } from 'react'
import { Toast } from '../components/Toast'
import { useRef } from 'react'

export const Auth = () => {

  const {user, signInUser, message, signUpUser} = useContext(UserContext)
  const errMessage = useRef()
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const IsSignIn = location.pathname == "/auth/in"

  console.log(location.pathname);
  

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (IsSignIn) signInUser(data.get('email'), data.get('password'))
    else signUpUser(data.get('email'), data.get('password'), data.get("displayName"))
    errMessage.current.innerText = message.signIn
    if (message.uid) navigate("/")
  }
  
  return (
    <div className="flex flex-1 justify-center items-center">
      <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4 w-96 bg-zinc-900 p-6 rounded-lg'>
        <h1 className="text-3xl">{IsSignIn ? "Sign In" : "Sign Up"}</h1>
        <input type="text" placeholder='john.doe@example.com' name='email' className='bg-[#2a2a30] rounded-lg outline-none px-3 p-2 w-full' />
        <div className='bg-[#2a2a30] rounded-lg outline-none flex p-2 w-full'>
          <input type={passwordVisible ? "text" : "password"} placeholder='123456' name='password' className="flex-1 bg-transparent outline-none border-nones" />
          <input type="button" value={passwordVisible ? "🔒" :"👁"} onClick={()=>setPasswordVisible((v)=>!v)} />
        </div>
        { !IsSignIn &&
          <input type="text" placeholder='Petőfi Sándor' name='displayName' className='bg-[#2a2a30] rounded-lg outline-none px-3 p-2 w-full' />
        }
        <div className='w-full flex gap-2'>
          <NavLink to="/" className="bg-[#2a2a30] rounded-lg p-2 px-4 font-bold">&lt;</NavLink>
          <button className='bg-blue-600 rounded-lg px-5 p-2 w-full'>Submit</button>
        </div>
        { IsSignIn &&
          <a href="#" onClick={() => navigate("/pwreset")}>Forgor password 💀</a>
        }
        <p ref={errMessage}>Error</p>
      </form>
    </div>
  )
}