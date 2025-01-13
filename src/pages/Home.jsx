import React from 'react'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { NavLink } from 'react-router-dom'

export const Home = () => {

  const { categories } = useContext(CategContext)

  return (
      <div className='h-screen overflow-hidden'>
        <div style={{ backgroundImage: `url(bagja.webp)` }} className={`
                w-full
                h-full
                flex
                flex-col
                justify-center
                items-center
                gap-4
                p-4
                absolute
                left-0
                overflow-hidden
                rounded-lg
                z-10
        
                bg-cover
                bg-no-repeat
                bg-[center_25%]
                before:content-['']
                before:absolute
                before:inset-0
                before:block
                before:bg-gradient-to-t
                before:from-35%
                before:overflow-hidden
                before:from-[#101010]
                before:to-[#101010]/50
                to-10%
                before:z-[-5]
                `}>
          {categories &&
          <>
            <p className='text-2xl font-bold'>Kategóriák</p>
            <div className='flex gap-4'>
              { categories.map(e =><NavLink key={e.name} to={'/posts?ctg=' + e.name} className={"underline decoration-2 underline-offset-4 decoration-transparent hover:decoration-white/75 transition-all"}>{e.name}</NavLink>) }
            </div>
          </>
          }
        </div>
      </div>
  )
}