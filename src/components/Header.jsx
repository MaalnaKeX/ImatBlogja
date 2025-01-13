import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { extractUrlAndId } from '../utility/utils'
import { useEffect } from 'react'

export const Header = () => {

  const [open, setOpen] = useState(false)
  const { user, logoutUser } = useContext(UserContext)
  const [avatar, setAvatar] = useState(null)
  console.log(user?.photoURL)

  useEffect(() => {
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
    !user && setAvatar(null)
  }, [user, user?.photoURL])

  return (
    <>
      <div className='flex flex-col min-h-screen bg-[#101010]'>
        <div className='w-full flex gap-4'>
          <div className='bg-[#1b1b1f]/75 w-full flex gap-4 p-4 z-20 text-xl justify-between'>
            <div className='flex gap-4'>
              <Link to={'/'}>Home</Link>
              <Link to={'/posts'}>Posztok</Link>
              { user &&
                <Link to={'/create'}>Új Poszt</Link>
              }
            </div>
            <div>
              <input type="button" value="|||" className={`${!open && "rotate-90" } transition-all cursor-pointer`} onClick={() => setOpen(!open)} />
              <div className={`absolute right-2 top-16 bg-[#2a2a30] p-4 rounded-lg flex select-none ${open ? "opacity-100 z-50 translate-y-0" : "opacity-0 -z-50 -translate-y-10"} transition-all flex-col`}>
                { !user ?
                  <>
                    <Link to={'/auth/in'}>Bejelentkezés</Link>
                    <Link to={'/auth/up'}>Regisztráció</Link>
                  </> 
                  :
                  <>
                    <Link to={'/profile'} className='flex gap-2 items-center justify-between mb-2'>
                      <p>Profil</p>
                      {/* <img src={user.photoURL} /> */}
                      { avatar ?
                        <img src={avatar} className='size-8 object-cover object-center rounded-full' />
                        :
                        <p>P</p>
                      }

                    </Link>
                    <hr />
                    <Link to={'/'} onClick={logoutUser}>Kijelentkezés</Link>
                    <Link to={'/deleteUser'} >Fiók Törlése</Link>
                  </>
                }
              </div>
            </div>
          </div>
          {/* <div class="w-full
            h-screen
            max-h-[32rem]
            p-24
            absolute
            overflow-hidden
            block
            z-10
						
            bg-[url('https://maalnakex.github.io/portfolio/assets/images/wallpaper4_405x228.png')]
            bg-cover
            bg-no-repeat
            bg-center

            before:content-['']
            before:absolute
            before:inset-0
            before:block
            before:bg-gradient-to-t
            before:from-[#101010]
            before:to-transparent
            to-10%
            before:z-[-5]
			"></div> */}
        </div>
        <div className='flex flex-col p-4 flex-1'>
          <Outlet />
        </div>
      </div>
    </>
  )
}