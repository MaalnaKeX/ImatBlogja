import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { readPosts } from '../utility/crudUtility'
import { PostCard } from '../components/PostCard'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { useSearchParams } from 'react-router-dom'
import { SearcBox } from '../components/SearcBox'

export const Posts = () => {
  const { categories } = useContext(CategContext)
  const [posts, setPosts] = useState([])
  const [searchParams] = useSearchParams()
  const [selectedCategs, setSelectedCategs] = useState(searchParams.get("ctg") ? [searchParams.get("ctg")] : [])

  // console.log(searchParams.get("ctg"))
  console.log(selectedCategs)

  useEffect(() => {
    readPosts(setPosts, selectedCategs)
  },[selectedCategs])

  console.log(selectedCategs)

  const handleChange = (event) => {
    const {value, checked} = event.target
    setSelectedCategs(prev => checked ? [...prev, value] : prev.filter(categ => categ != value))
  }

  return (
    <div>
      <div className='flex gap-4 justify-center flex-wrap'>
        {
          categories.map(a => <label key={a.id} className={`select-none h-full pr-3 py-1 rounded-full ${selectedCategs.includes(a.name) && "bg-[#2a2a30]"}`}><input type="checkbox" value={a.name} className='bg-[#2a2a30] p-2 rounded-full opacity-0' onChange={handleChange} checked={selectedCategs.includes(a.name)} />{a.name}</label>)
          // categories.map(e => <p className='bg-[#2a2a30] p-2 rounded-full' onClick={() => setSelectedCategs(p => {})}>{e.name}</p>)
        }
      </div>
      { posts &&
        <SearcBox items={posts.map(e => ({id:e.id, name:e.title}))} />
      }
      <div className='flex gap-4 justify-center flex-wrap'>
        {posts.map(e => <PostCard key={e.id} postId={e.id} image={e.photo.url} title={e.title} desc={e.story} timestamp={e.timestamp.nanoseconds} auth={e.author} categ={e.category} />)}
      </div>
    </div>
  )
}