import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const DeleteUser = () => {

  const {user, deleteAccount, logoutUser} = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    !user  && navigate("/")
  }, [user])

  const handleDelete = async (e) => {
    e.preventDefault()
    if (confirm("Biztosan Törlöd a Profilod?")) {
      await deleteAccount()
      logoutUser()
    }
  }

  if (!user) navigate("/")

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}