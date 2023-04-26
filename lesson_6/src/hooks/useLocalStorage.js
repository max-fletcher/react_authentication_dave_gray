import { useState, useEffect } from "react"

// "useLocalStorage" is a controlled input hook that takes 2 params "key" & "initValue". It can be used as a replacement for useState
// since on doing so will create a new instance of this hook and causes the "value" and "setValue" to be bound to the state it is
// assigned to due to spread operator being used (i.e if const [user, setUser] = useLocalStorage('user', '') then "value" is bound
// to "user" and "setValue" is bound to "SetUser"). On changing the value of "key" or "value", this hook will store the value into
// localStorage as "key" => "value" if it doesn't already exists OR will set a new value to the already existing "key" in localStorage and 
// assign a new value to the state(i.e "user").
// It returns the "value" and "setValue" so that when the state which is using this hook is called(i.e [user, setUser]), then "user"
// & "setUser" will be bound to these state functions(due to the use of spread operator) when declaring states. The convention seems
// to be that when you want to bind a hook to a controlled input hook, the hook should return an initial value(i.e "value") and
// a function(i.e "setValue" which causes this entire function to be ran.)

// P.S We can put one hook inside another hook. We will be using this inside "useInput" hook and use that to bind states(see Login.js and useInput.js)

// gonna use this as the callback for setting states below(i.e const [value, setValue] = useState..... )
const getLocalValue = (key, initValue) => {
   // SSR NEXT.JS // if we are using NEXT.JS, then window object doesn't exist so localStorage doesn't exist. Hence, return the initial value
   if(typeof window === 'undefined') return initValue

   // if a value is already stored
   const localValue = JSON.parse(localStorage.getItem(key))
   if (localValue) return localValue

   // return result of a stored function in local storage. It simply runs the function and returns the value and nothing more
   if(initValue instanceof Function) return initValue()

   // if all "if" conditions fail, return initValue(i.e if localStorage has no "key" => "value" stored)
   return initValue
}

const useLocalStorage = (key, initValue) => {
   // set "initValue" as "value"(state) if "key" is not found in localStorage
   // const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) || initValue);

   // commented out above 2 lines to be replaced with the block below that uses "getLocalValue" function.
   const [value, setValue] = useState(() => {
      return getLocalValue(key, initValue)
   })

   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value))
   }
   ,[key, value]) // if "key" or "value" changes, run useEffect and store key=>value in localStorage

   return [value, setValue]
}

export default useLocalStorage