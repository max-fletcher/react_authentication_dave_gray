import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"


// This protected route is used to re-run "useRefreshToken" hook if the user doesn't have an accessToken so the user is issued a new accessToken
// and is persistently logged in

const PersistLogin = () => {

   const [isLoading, setIsLoading] = useState(true)
   const refresh = useRefreshToken() // create an instance of "useRefreshToken()"
   const { auth } = useAuth() // importing from custom hook. We are only importing "auth" and not "setAuth" since we only wanna read the data not write over it

   // run "useEffect" on mounting this component.This is to make sure that "accessToken" exists. If not then the "verifyRefreshToken" function is ran below.
   useEffect(() => {
      // this is just a declaration. This functon is ran below based on if accessToken exists in "auth" context
      const verifyRefreshToken = async() => {
         try {
            await refresh()
         } catch (error) {
            console.log(error)
         } finally{
            setIsLoading(false) // this will run either way(regardless of whether try or catch was run)
         }

         // only run the "verifyRefreshToken()" function when there is no "accessToken". Else, just set the "isLoading state to false"
         !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
      }
   }, [])

   // this block is just for checking what is going on above
   useEffect(() => {
      console.log(`isLoading: ${isLoading}`);
      console.log(`authToken: ${JSON.stringify(auth?.accessToken)}`);
   }, [isLoading])

   return (
      <>
         {
            // use a "loader" or "spinner" instead of "<p>Loading...</p>"
            isLoading ? <p>Loading...</p> : <Outlet />
         }
      </>
   )
}

export default PersistLogin