import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { readPosts } from '../utility/crudUtility'
import { PostCard } from '../components/PostCard'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { useSearchParams } from 'react-router-dom'
import { SearcBox } from '../components/SearcBox'
import { UserContext } from '../context/UserContext'
import { ArrowUpDown } from 'lucide-react'

export const Posts = () => {
  const { user } = useContext(UserContext)
  const { categories } = useContext(CategContext)
  const [posts, setPosts] = useState([])
  const [searchParams] = useSearchParams()
  const [selectedCategs, setSelectedCategs] = useState(searchParams.get("ctg") ? [searchParams.get("ctg")] : [])
  const [filteredPosts, setFilteredPosts] = useState(posts)
  const [filters, setFilters] = useState({order:"asc", by:"timestamp"})

  // console.log(searchParams.get("ctg"))
  console.log(selectedCategs)

  useEffect(() => {
    readPosts(setPosts, selectedCategs, filters)
  },[selectedCategs, filters])

  useEffect(() => {
    setFilteredPosts(posts)
  },[posts])

  console.log(filteredPosts)
  console.log(filters)

  const handleChange = (event) => {
    const {value, checked} = event.target
    setSelectedCategs(prev => checked ? [...prev, value] : prev.filter(categ => categ != value))
  }

  return (
    <div>
      <div className='relative mb-4'>
        <SearcBox items={posts.map(e => ({id:e.id, name:e.title}))} />
        <div className='flex gap-2 justify-center flex-wrap absolute top-1/2'>
          {
            categories.map(a => <label key={a.id} className={`select-none h-full pr-3 py-1 rounded-full ${selectedCategs.includes(a.name) && "bg-[#2a2a30]"}`}><input type="checkbox" value={a.name} className='bg-[#2a2a30] p-2 rounded-full opacity-0' onChange={handleChange} checked={selectedCategs.includes(a.name)} />{a.name}</label>)
            // categories.map(e => <p className='bg-[#2a2a30] p-2 rounded-full' onClick={() => setSelectedCategs(p => {})}>{e.name}</p>)
          }
        </div>
        <div className='flex justify-center gap-4'>
          { user &&
          <>
            <button className={`underline underline-offset-4 decoration-2 ${filteredPosts == posts ? "decoration-blue-500" : "decoration-transparent"}`} onClick={() => setFilteredPosts(posts)}>Minden</button>
            <button className={`underline underline-offset-4 decoration-2 ${filteredPosts != posts ? "decoration-blue-500" : "decoration-transparent"}`} onClick={() => setFilteredPosts(posts.filter(e =>e.userId == user.uid))}>Saját</button>
          </>
          }
        </div>
        <div className='flex gap-2 justify-center flex-wrap absolute top-1/2 right-0'>
          <button className={`${filters.order == "asc" && "scale-y-[-1]"} transition-all`} onClick={() => setFilters(p => ({...p, order:p.order === "asc" ? "desc" : "asc"}))}><ArrowUpDown /></button>
          <select className='bg-[#2a2a30] p-1' onChange={(e) => setFilters(p => ({...p, by:e.target.value}))}>
            <option value="timestamp">Idő</option>
            <option value="title">Cím</option>
            <option value="timestamp">Készítő</option>
            <option value="likes">Likeok</option>
          </select>
        </div>
      </div>
      
      <div className='flex gap-4 justify-center flex-wrap'>
        {filteredPosts.map(e => <PostCard key={e.id} postId={e.id} image={e.photo.url} title={e.title} desc={e.story} timestamp={e.timestamp} auth={e.author} categ={e.category} />)}
      </div>

      {/* <div className='relative'>
        { posts &&
          <SearcBox items={posts.map(e => ({id:e.id, name:e.title}))} />
        }
        <div className='flex gap-4 justify-center flex-wrap absolute top-1/2'>
          {
            categories.map(a => <label key={a.id} className={`select-none h-full pr-3 py-1 rounded-full ${selectedCategs.includes(a.name) && "bg-[#2a2a30]"}`}><input type="checkbox" value={a.name} className='bg-[#2a2a30] p-2 rounded-full opacity-0' onChange={handleChange} checked={selectedCategs.includes(a.name)} />{a.name}</label>)
            // categories.map(e => <p className='bg-[#2a2a30] p-2 rounded-full' onClick={() => setSelectedCategs(p => {})}>{e.name}</p>)
          }
        </div>
      </div>
      <div className='flex gap-4 justify-center flex-wrap'>
        {posts.map(e => <PostCard key={e.id} postId={e.id} image={e.photo.url} title={e.title} desc={e.story} timestamp={e.timestamp.nanoseconds} auth={e.author} categ={e.category} />)}
      </div> */}
    </div>
  )
}