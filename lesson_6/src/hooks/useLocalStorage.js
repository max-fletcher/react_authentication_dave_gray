import { useState, useEffect } from "react"

const useLocalStorage = (key, initValue) => {
   const [value, setValue] = useState(JSON.stringify(localStorage.getItem('key')) || initValue); // set "initValue" as "value"(state) if "key" is not found in localStorage

   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value))
   }
   ,[key, value]) // if "key" or "value" changes, run useEffect and store key=>value in localStorage

   return [value, setValue]
}

export default useLocalStorage