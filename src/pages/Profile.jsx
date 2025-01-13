import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NotFound } from './NotFound'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { uploadFile } from '../utility/uploadFile'
import { useEffect } from 'react'
import { extractUrlAndId } from '../utility/utils'

export const Profile = () => {

  const {user, updateUser, message, deleteAccount} = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
  }, [user])

  // useEffect(() => {
  //   if (!user) return <NotFound />
  // }, [])

  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      displayName: user?.displayName || ""
    }
  })

  const onSubmit = async (data) => {
    console.log(data)
    setLoading(true)
    try {
      
      const file = data?.file ? data?.file[0] : null
      const {url, id} = file ? await uploadFile(file) : {}
      updateUser(data.displayName, url+"/"+id)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-4 w-96 bg-zinc-900 p-6 rounded-lg'>
        <h1 className="text-3xl">User Profile</h1>
        <div className='w-full'>
          <label className='float-left w-full opacity-70'>Display Name</label>
          <input type="text" {...register("displayName")} placeholder='Display Name' name='displayName' className='bg-[#2a2a30] rounded-lg outline-none px-3 p-2 w-full' />
        </div>
        <div className='w-full'>
          <label className='float-left w-full opacity-70'>Avatar</label>
          <input type="file" {...register("file", {
            validate:(value) => {
              if (!value[0]) return true
              const accFormat = ["jpg", "png", "webp"]
              const fileExt = value[0].name.split(".").pop().toLowerCase()
              if(!accFormat.includes(fileExt)) return "invalid File Extension"
              if (value[0].size > 1000*1024) return "Max File Size is 1 MB"
              return true
            }
          })} onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))} placeholder='image' name='file' className='bg-[#2a2a30] rounded-lg outline-none px-3 p-2 w-full' />
          <p className='text-red-500'>{errors?.file?.message}</p>
        </div>
        <input className='bg-blue-600 rounded-lg px-5 p-2 w-full' type='submit' />
        { message && 
          <p>{message}</p>
        }
      </form>
      { loading &&
        <div className='h-16 w-16 bg-blue-600 animate-spin'></div>
      }
      { avatar &&
        <img src={avatar} className='h-72 rounded-lg' />
      }
    </div>
  )
}