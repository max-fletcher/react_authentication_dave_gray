import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"
import useLocalStorage from "../hooks/useLocalStorage"


// This protected route is used to re-run "useRefreshToken" hook if the user doesn't have an accessToken so the user is issued a new accessToken
// and is persistently logged in

const PersistLogin = () => {

   const [isLoading, setIsLoading] = useState(true)
   const refresh = useRefreshToken() // create an instance of "useRefreshToken()"
   // const { auth /* , persist */ } = useAuth() // importing from custom hook. We are only importing "auth" and not "setAuth" since we only wanna read the data not write over it
   // LINE ABOVE REPLACED WITH 2 LINE BELOW SINCE WE ARE USING "useToggle" HOOK AND NOT "persist" FROM authContext ANYMORE
   const { auth } = useAuth() // importing from custom hook. We are only importing "auth" and not "setAuth" since we only wanna read the data not write over it
   const [persist] = useLocalStorage('persist', false)

   // run "useEffect" on mounting this component.This is to make sure that "accessToken" exists. If not then the "verifyRefreshToken" function is ran below.
   useEffect(() => {
      let isMounted = true // may not be needed since new react version runs useEffect only after a component is mounted

      // this is just a declaration. This functon is ran below based on if accessToken exists in "auth" context
      const verifyRefreshToken = async() => {
         try {
            await refresh()
         } catch (error) {
            console.log(error)
         } finally{
            isMounted && setIsLoading(false) // this will run either way(regardless of whether try or catch was run). "isMounted" is to make sure setLoading is not run 
                                          // before the component is mounted. May not be needed since new react version runs useEffect only after a component is mounted
         }
      }

      // only run the "verifyRefreshToken()" function when there is no "accessToken". Else, just set the "isLoading state to false"
      !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

      return () => isMounted = false   // "isMounted" is to make sure setLoading is not run before the component is mounted.
                                       // May not be needed since new react version runs useEffect only after a component is mounted
   }, [])

   // this block is just for checking what is going on above
   useEffect(() => {
      console.log(`isLoading: ${isLoading}`);
      console.log(`authToken: ${JSON.stringify(auth?.accessToken)}`);
   }, [isLoading])

   return (
      <>
         {
            // if "persist" is false, go straight to <Outlet />. If its true, then check "isLoading". If its false, go to <Outlet /> else show "loading"
            !persist ? 
               <Outlet /> :
                  // use a "loader" or "spinner" instead of "<p>Loading...</p>"
                  isLoading ? <p>Loading...</p> : <Outlet />
         }
      </>
   )
}

export default PersistLogin