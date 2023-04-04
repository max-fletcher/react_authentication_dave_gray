import { axiosPrivate } from "../api/axios"
import { useEffect } from "react"
import useRefreshToken from "./useRefreshToken"
import useAuth from "./useAuth"

// This will return the axiosPrivate instance but will attach the some interceptors with it. These interceptors
// will be there in the request as well as the response of every API call made using axiosPrivate.
const useAxiosPrivate = () => {
   const refresh = useRefreshToken() // assigning the "useRefreshToken" function to a variable
   const { auth } = useAuth()

   useEffect(()=>{
      const responseIntercept = axiosPrivate.interceptors.response.use(
         // if the response is good, return the response
         response => response,
         // else, run this async error handler
         async (error) => {
            const prevRequest = error?.config //get previous request
            if(error?.response?.status === 403 && !prevRequest?.sent){ //if error response code is 403 and a custom property called "sent" doesn't exist
               prevRequest.sent = true
               const newAccessToken = await refresh() // run refresh function defined above to get new accessToken
               prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
               return axiosPrivate(prevRequest) // return axiosPrivate with new request header(above line) that will re-run the request with this new access token
            }
         }
      )
   },[auth, refresh])

   return axiosPrivate;
}

export default useAxiosPrivate