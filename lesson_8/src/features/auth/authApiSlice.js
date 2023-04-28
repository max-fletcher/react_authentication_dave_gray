import { apiSlice } from "../../app/api/apiSlice";

// Here we are injecting the endpoints for apiSlice.js

export const authApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      login: builder.mutation({
         query: credentials => ({
            url: '/auth',
            method: 'POST',
            body: {...credentials}
         })
      }),
   })
})