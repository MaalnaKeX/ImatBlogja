import React from 'react'
import { NavLink } from 'react-router-dom'
import { clearHTML } from '../utility/utils'

export const PostCard = ({postId, title, auth, timestamp, desc, image, categ}) => {
  // const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)

  return (
    <NavLink to={"/post/"+postId} className='flex flex-col gap-3 bg-[#101010] shadow-2xl shadow-black w-96 p-4 rounded-lg cursor-pointer hover:scale-[1.025] transition-all'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <div className='h-64 w-full relative'>
        <div style={{backgroundImage: `url(${image})`}} className={`
              w-full
              h-64
              max-h-[32rem]
              flex
              justify-center
              items-end
              p-4
              absolute
              overflow-hidden
              rounded-lg
              z-10
              
              bg-cover
              bg-no-repeat
              bg-center

              before:content-['']
              before:absolute
              before:inset-0
              before:block
              before:bg-gradient-to-t
              before:from-35%
              before:from-[#101010]
              before:to-[#101010]/50
              to-10%
              before:z-[-5]`}>
          <div className='flex flex-col gap-2 w-full'>
            <p className='h-12 overflow-y-clip text-ellipsis'>{clearHTML(desc)}</p>
            <div className='relative'>
              <p className='opacity-50 absolute left-0 bottom-0'>{auth}</p>
              <p className='opacity-50 bg-[#2a2a30] p-2 rounded-lg w-max mx-auto'>{categ}</p>
              <p className='opacity-50 absolute right-0 bottom-0'>{new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000).toISOString().split("T")[0].replaceAll("-", ".")}</p>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  )
}