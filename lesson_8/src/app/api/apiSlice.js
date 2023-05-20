import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice' // importing 'setCredentials' and 'logout' reducer

// The purpose of this is to declare the base query and export it as an RTK Query. We weil inject the endpoints in .
// It uses an apiSlice called authSlice to re-run "accessToken" refetch so we have a valid "accessToken" if "refreshToken" is a-ok.
// It will do that by using the reducer actions/methods from authSlice and use/dispatch them to make API calls.

// works like axios request with options
const baseQuery = fetchBaseQuery({
   baseUrl: 'http://localhost:3500',
   credentials: 'include', //this is to send all the cookies that are saved to browser along with every request
   // getState makes the reducer's states from store available to baseQuery. It destructured to get state/data directly.
   prepareHeaders: (headers, { getState }) => {
      // get token from 'store' if 'auth' reducer state/data inside 'store' has 'token' nested in it.
      const token = getState().auth.token
      if(token){
         headers.set("authorization", `Bearer ${token}`) // set token as authorization - Bearer token in header. Works only if token exists.
      }
      return headers
   }
})

// this is a wrapper for the base query, which will fire a preflight request & get a new "accessToken" if the old one has expired
// and "refreshToken" is still valid works the same way as axios interceptors in the previous chapters
const baseQueryWithReauth = async (args, api, extraOptions) => {
   let result = await baseQuery(args, api, extraOptions)

   if(result?.error?.originalStatus === 403){ // if the initial query received a status code of 403
      console.log("Sending Refresh Token")
      // send refresh token to get new access token
      const refreshResult = await baseQuery('/refresh', api, extraOptions)
      console.log(refreshResult)
      if(refreshResult?.data){
         const user = api.getState().auth.user // just get the user name/data from state and store it in a variable. Has nothing to do with the API call
         // store the new token along with the user name/data
         api.dispatch(setCredentials({...refreshResult.data, user}))
         // retry the the original query with new access token and store it in result variable
         result = await baseQuery(args, api, extraOptions)
      }
      else{
         //so if token has expired but the API call to "/refresh" also fails(not 403 status code), then run/dispatch logOut()
         api.dispatch(logOut())
      }
   }

   return result // return result of original API call if token was successfully refreshed
}

// we will create the apiSlice(for RTK. "createSlice" on the other hand can only be used with thunks and extra reducers)
// but we won't define any endpoints here since we will be using extended API slice
export const apiSlice = createApi({
   baseQuery: baseQueryWithReauth,
   endpoints: builder => ({})
})