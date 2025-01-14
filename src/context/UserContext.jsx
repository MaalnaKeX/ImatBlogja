import { createContext } from "react";
import { auth } from "../utility/firebaseApp";
import { useState } from "react";
import { useEffect } from "react";
import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'

export const UserContext = createContext()


export const UserProvider = ({children}) => {
  
  const [user, setUser] = useState()
  const [message, setMessage] = useState({})

  console.log(message)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])
  
  const signInUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setMessage({})
      setMessage({signIn:"Sikeres Belépés"})
    } catch (error) {
      console.log(error)
      setMessage({signIn:error.message})
    }
  }

  const logoutUser = async () => {
    await signOut(auth)
    setMessage({})
  }

  const updateUser = async (displayName, photoURL) => {
    try {
      if (displayName && photoURL) await updateProfile(auth.currentUser, {displayName, photoURL})
      else if (displayName) await updateProfile(auth.currentUser, {displayName})
      else if (photoURL) await updateProfile(auth.currentUser, {photoURL})
      setMessage({update:"Updated"})
    } catch (err) {
      setMessage({error:err})
    }
  }

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      setMessage({resetPW:"Email Sent"})
    } catch (error) {
      setMessage({error:error})
    }
    await signOut(auth)
  }

  const signUpUser = async (email, password, displayName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, {displayName})
      setMessage({})
      setMessage({signUp:"User Created"})
      console.log("User Created")
    } catch (error) {
      console.log(error)
      setMessage({signIn:error.message})
    }
  }

  const deleteAccount = async () => {
    try {
      await deleteUser(user)
      setMessage({})
      setMessage({deleteUser:"User Deleted"})
      console.log("User Deleted")
    } catch (error) {
      console.log(error)
      setMessage({deleteUser:error.message})
    }
  }

  return (
    <UserContext.Provider value={{user, signInUser, logoutUser, message, setMessage, signUpUser, resetPassword, updateUser, deleteAccount}}>
      { children }
    </UserContext.Provider>
  )
}