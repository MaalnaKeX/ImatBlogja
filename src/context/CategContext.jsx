import { readCategories, readPosts } from "../utility/crudUtility";
import React from 'react'

import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const CategContext = createContext()

export const CategProvider = ({children}) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    readCategories(setCategories)
  }, [])

  return (
    <CategContext.Provider value={{categories}}>
      {children}
    </CategContext.Provider>
  )
}