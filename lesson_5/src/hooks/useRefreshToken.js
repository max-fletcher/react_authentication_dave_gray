import axios from "../api/axios"
import useAuth from "./useAuth"

// this component sends API requests to refreshed the "acessToken" using the "refreshToken". It is used to get a new token using interceptors in "axiosPrivate"

const useRefreshToken = () => {
   const { setAuth } = useAuth() // importing from custom hook. We are only importing "setAuth" and not "auth" since we only wanna write over it not read the data

   const refresh = async () => {
      const response = await axios.get('/refresh', { withCredentials: true }) // withCredentials allows us to send cookies with the request

      setAuth(prev => { //remember that "setState" can take a function as argument with which you can return something which will be set as new value of that state
         console.log(JSON.stringify(prev)) // see the response as a json string
         console.log(response.data.accessToken) // see the response accessToken
         return {...prev,
                  roles: response.data.roles, // add a roles object to the "auth" context
                  accessToken: response.data.accessToken //replace accessToken with new accessToken. Also added roles
               }
      })

      return response.data.accessToken
   }

   return refresh // not returning a component. We are returning the function called "refresh" since this is a custom hook.
}

export default useRefreshToken