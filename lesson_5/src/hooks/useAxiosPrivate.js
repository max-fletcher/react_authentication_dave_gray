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

      // The objective is to set "Authorization" header with a "Bearer Token" after a request was made to fetch an access token using 
      // a normal axios instance(comes from "api/axios.js"). The rest can be 
      const requestIntercept = axiosPrivate.interceptors.request.use(
         config => {
            // if "config.headers['Authorization']" doesn't exist, this means this is a first time, meaning that we need to 
            // set "Authorization" with "Bearer Token".
            if(!config.headers['Authorization']){
               // "auth.accessToken" could be the the initial access token when we signed in, or could be the access token we got after a refresh
               config.headers['Authorization'] = `Bearer ${auth.accessToken}`
            }

            return config
         },
         // returns error if the request fails
         (error) => Promise.reject(error)
      )

      const responseIntercept = axiosPrivate.interceptors.response.use(
         // if the response is good, return the response
         response => response,
         // else, run this async error handler
         async (error) => {
            const prevRequest = error?.config //get previous request
            //if error response code is 403 and a custom property called "sent" doesn't exist. "sent" is used to stop an infinite loop from occuring.
            if(error?.response?.status === 403 && !prevRequest?.sent){
               prevRequest.sent = true // Set "sent" to true to stop an infinite loop from occuring
               const newAccessToken = await refresh() // run refresh function defined above to get new accessToken
               prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
               return axiosPrivate(prevRequest) // return axiosPrivate with new request header(above line) that will re-run the request with this new access token
            }

            // return error that wasn't caught by the if-block above
            return Promise.reject(error)
         }
      )
      return () => { // call cleanup function so the interceptor doesn't stay in axiosPrivate and keep stacking on memory heap
         axiosPrivate.interceptors.request.eject(requestIntercept)
         axiosPrivate.interceptors.response.eject(responseIntercept)
      }
   },[auth, refresh]) // using "auth" context and "refresh" function as dependency array. Refresh is included so we can access it inside useEffect
                      // and "auth" is here so it re-runs if "auth" context(which is an object) changes which triggers re-render of this component.

   // return an instance of axios with interceptors called "axiosPrivate"
   return axiosPrivate;
}

export default useAxiosPrivate