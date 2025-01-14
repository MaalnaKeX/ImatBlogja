import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deletePost, readPost, toggleLikes } from '../utility/crudUtility'
import { UserContext } from '../context/UserContext'
import { DropDown } from '../components/DropDown'
import { clearHTML } from '../utility/utils'
import parse from 'html-react-parser';
import { delPhoto } from '../utility/uploadFile'
import { ThumbsUp } from 'lucide-react'
import { Pen } from 'lucide-react'
import { Trash } from 'lucide-react'
import { Trash2 } from 'lucide-react'

export const Post = () => {
  const { user } = useContext(UserContext)

  const params = useParams()
  const [post, setPost] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    readPost(setPost, params.id)
  }, [])
  console.log("story: ", post.story)
  
  const handleLikes = () => {
    if (!user) return "No User"
    toggleLikes(post.id, user.uid)
  }
  
  const handleDelete = () => {
    if (!confirm("Biztos törölni szeretnéd ezt a posztot?")) return
    deletePost(params.id)
    delPhoto(post.photo.id)
    navigate("/posts")
  }
  
  const handleEdit = () => {
    if (!user) return "No User"
    toggleLikes(post.id, user.uid)
  }

  return (
    <div className='flex justify-center'>
      { post &&
      <div className='flex justify-center w-[90rem] gap-4 h-full'>
        <div className='flex items-center flex-col'>
        {/* <div style={{backgroundImage: `url(${post.photo?.url})`}} className={`
              w-[40rem]
              max-w-[40rem]
              h-64
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
              before:z-[-5]`}></div> */}
          <img src={post.photo?.url} />
          <div className='relative w-full'>
            <div className='flex absolute top-0 left-0 w-full'>
              { user && post && (user.uid == post.userId) && 
                <div className='flex gap-2'>
                  <button className='border w-full border-red-500 rounded-md p-1 mt-4 hover:bg-red-500 active:bg-red-500 transition-all' onClick={handleDelete}><Trash2 /></button>
                  <button className='border w-full border-blue-500 rounded-md p-1 mt-4 hover:bg-blue-500 active:bg-blue-500 transition-all' onClick={() => navigate("/update/"+post.id)}><Pen /></button>
                </div>
              }   
              <button onClick={handleLikes} className='border ml-auto border-white/50 rounded-md p-1 w-max mt-4 hover:bg-white/10 active:bg-white/15 transition-all flex gap-2'><ThumbsUp /> {post.likes?.length || 0}</button>
            </div>
          </div>
        </div>
        {post.story && <div className='border border-white/10'></div>}
        <div>
          <p>{parse(post.story != undefined ? post.story: "")}</p>
        </div>
      </div>
      }
      <Link to={"/posts"} className='border border-white rounded-md p-1 absolute top-20 left-5'>Vissza</Link>
    </div>
  )
}