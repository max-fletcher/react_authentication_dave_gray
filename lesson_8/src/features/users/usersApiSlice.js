import { apiSlice } from "../../app/api/apiSlice";

// Here we are injecting the endpoints for apiSlice.js

export const authApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      getUsers: builder.query({
         query: () => ({
            url: '/users'
         }),
         keepUnusedDataFor: 5,  //keep data in cache for 5 sec instaed of the default which is 60 sec
      }),
   })
})

// Exporting builder mutations. The hooks exported inside are generated automatically with prefix "use" and postfix "Mutation" and name
// sandwitched between for builder mutations, and prefix "use" and postfix "Query" for builder query
export const {
   useGetUsersQuery
} = authApiSlice