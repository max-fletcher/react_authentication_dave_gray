import React from 'react'
import useLocalStorage from './useLocalStorage'

const useToggle = (key, initValue) => {

   const [value, setValue] = useLocalStorage(key, initValue)

   const toggle = (value) => {
      setValue(prev => {
         // if value type is boolean, return value. If not, return the opposite of what is in state(should still return a boolean if it was, say a string)
         return typeof value === "boolean" ? value : !prev
      })
   }

   return [value, toggle]
}

export default useToggle