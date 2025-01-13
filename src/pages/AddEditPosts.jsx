import React, { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Home } from './Home'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Story } from '../components/Story'
import { uploadFile } from '../utility/uploadFile'
import { addPost, readPost, updatepost } from '../utility/crudUtility'
import { CategContext } from '../context/CategContext'
import { useParams } from 'react-router-dom'

export const AddEditPosts = () => {

  const { user } = useContext(UserContext)
  const { categories } = useContext(CategContext)
  const [loading, setLoading] = useState(false)
  const { uploaded, setUploaded } = useState(false)
  const [photo, setPhoto] = useState(null)
  const [story, setStory] = useState(null)
  const [selCateg, setSelCateg] = useState(null)
  const [post, setPost] = useState(null)
  const params = useParams()

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    // defaultValues: {
    //   displayName: user?.displayName || ""
    // }
  })

  useEffect(() => {
    if (params?.id) readPost(setPost, params.id)
  }, [params?.id])

  useEffect(() => {
    if (post) {
      setValue("title", post.title)
      setSelCateg(post.category)
      setStory(post.story)
    }
  }, [post])

  console.log("Post: ", post)

  const onSubmit = async (data) => {
    setLoading(true)
    if (params.id) {
      try {
        updatepost(params.id, {...data, story, category:selCateg})
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }
    let newPostdata = {
      ...data,
      story,
      author: user.displayName,
      userId: user.uid,
      category: selCateg || categories[0].name,
      likes: []
    }

    try {
      const file = data?.file ? data?.file[0] : null
      const { url, id } = file ? await uploadFile(file) : {}
      delete newPostdata.file
      newPostdata = { ...newPostdata, photo: { url, id } }
      console.log(newPostdata);
      addPost(newPostdata)
      setStory(null)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  if (!user) return <Home />

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-4 w-fit bg-zinc-900 p-6 rounded-lg'>
        <h1 className="text-3xl">Új bejegyzés</h1>
        <div className='w-full'>
          <label className='float-left w-full opacity-70'>Cím</label>
          <input type="text" {...register("title", { required: true })} placeholder='Cím' name='title' className='bg-[#2a2a30] rounded-lg outline-none px-3 p-2 w-full' />
          <p className='text-red-500'>{errors.title && "*Cím megadása kötelező"}</p>
        </div>
        <div className='w-full'>
          <label className='float-left w-full opacity-70'>Kategória</label>
          {/* <input type="text" {...register("category", {required: true})} placeholder='Kategória' name='category' className='bg-[#2a2a30] rounded-lg outline-none px-3 p-2 w-full' />
          <p className='text-red-500'>{errors.category && "*Kategória megadása kötelező"}</p> */}
          {/* <DropDown title={"Kategória"} selected={selCateg}>
            {categories && categories.map(e => <input value={e.name} type='button' key={e.id} onClick={(e) => setSelCateg(e.target.value)} /> )}
            </DropDown> */}
          <select className='bg-[#2a2a30] p-2 rounded-md'>
            {categories && categories.map(e => <option key={e.id} onClick={(e) => setSelCateg(e.target.value)} className='bg-[#1b1b1f]'>{e.name}</option>)}
          </select>
        </div>

        <Story setStory={setStory} uploaded={uploaded} story={story}/>

        <div className='w-full'>
          <label className='float-left w-full opacity-70'>Kép</label>
          <input disabled={params.id} type="file" {...register("file", params.id ? {} : {
            validate: (value) => {
              console.log(value);
              if (!value[0]) return true
              const accFormat = ["jpg", "png", "webp"]
              const fileExt = value[0].name.split(".").pop().toLowerCase()
              if (!accFormat.includes(fileExt)) return "invalid File Extension"
              if (value[0].size > 1000 * 1024) return "Max File Size is 1 MB"
              return true
            }
          })} onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))} placeholder='image' name='file' className='bg-[#2a2a30] rounded-lg outline-none px-3 p-2 w-full' />
          <p className='text-red-500'>{errors?.file?.message}</p>
        </div>
        <input className='bg-blue-600 rounded-lg px-5 p-2 w-full' type='submit' />
      </form>
      {loading &&
        <div className='h-16 w-16 bg-blue-600 animate-spin'></div>
      }
      {photo &&
        <img src={photo} className='h-72 rounded-lg' />
      }
    </div>
  )
}