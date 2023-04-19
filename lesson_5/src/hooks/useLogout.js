import axios from "../api/axios";
import useAuth from "./useAuth";

// this custom hook is to return a function that will logout a user from the app

const useLogout = () => {

   const { setAuth } = useAuth()

   const logout = async () => {
      setAuth({}) // empty out the "auth" context

      try {
         const response = await axios('/logout', {
            withCredentials: true //"withCredentials" is true so that the cookie stored is sent with the request
         })
      } catch (error) {
         console.log(error);
      }
   }

   return logout
}

export default useLogout