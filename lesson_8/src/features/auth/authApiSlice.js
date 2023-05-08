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

// Exporting builder mutations. The hooks exported inside are generated automatically with prefix "use" and postfix "Mutation" and name
// sandwitched between for builder mutations, and prefix "use" and postfix "Query" for builder query
export const {
   useLoginMutation
} = authApiSlice