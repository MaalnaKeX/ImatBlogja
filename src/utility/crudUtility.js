import { collection, orderBy, query, onSnapshot, serverTimestamp, addDoc, where, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "./firebaseApp"

export const readCategories = (setCategories) => {
  const collectionRef = collection(db, "categories")
  const q = query(collectionRef, orderBy("name", "asc"))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setCategories(snapshot.docs.map(doc => ({...doc.data(), id:doc.id})))
  })
  return unsubscribe
}

export const readPosts = (setPosts, selCateg) => {
  const collectionRef = collection(db, "posts")
  const q = selCateg.length == 0 ? 
    query(collectionRef, orderBy("timestamp", "asc")) 
    : 
    query(collectionRef, orderBy("timestamp", "asc"), where("category", "in", selCateg))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setPosts(snapshot.docs.map(doc => ({...doc.data(), id:doc.id})))
    snapshot.docs.map(doc => console.log({...doc.data(), id:doc.id}))
  })
  return unsubscribe
}

export const readPost = async (setPost, id) => {
  const docRef = doc(db, "posts", id)
  // const docSnap = await getDoc(docRef)
  const unsubscribe = onSnapshot(docRef, (snapshot) => {
    setPost({...snapshot.data(), id:snapshot.id})
  })
  // setPost({...docSnap.data(), id: docRef.id})
  // console.log("data: ", docSnap.data())
  return unsubscribe
}

export const addPost = async (formData) => {
  const collectionRef = collection(db, "posts")
  const newItem = {...formData, timestamp:serverTimestamp()}
  await addDoc(collectionRef, newItem)
}

export const deletePost = async (id) => {
  const docRef = doc(db, "posts", id)
  await deleteDoc(docRef)
}

export const toggleLikes = async (id, uid) => {
  const docRef = doc(db, "posts", id)
  const docSnap = await getDoc(docRef)
  const likesArr = docSnap.data().likes || []
  if (likesArr.includes(uid)) await updateDoc(docRef, {likes: likesArr.filter(id => id != uid)})
  else await updateDoc(docRef, {likes:[...likesArr, uid]})
}

export const updatepost = async (id, {title, category, story}) => {
  console.log(title, category, story)
  const docRef = doc(db, "posts", id)
  await updateDoc(docRef, {title, category, story})
}
