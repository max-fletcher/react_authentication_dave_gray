import { createSlice } from "@reduxjs/toolkit";

// slice containing the name of the slice, the initial state, and the reducers we will be using to modify the state
const authSlice = createSlice({
   name: 'auth',
   initialState: { user: null, token: null },
   reducers: {
      // defining the reducers(methods that modify the slice state) we will be using to change states
      setCredentials: (state, action) => {
         const { user, accessToken } = action.payload
         state.user = user
         state.token = token
      },
      logOut: (state, action) => {
         state.user = null
         state.token = null
      }
   }
})

// exporting the reducers
export const { setCredentials, logOut } = authSlice.actions

// exporting the slice. It will be imported with the name "authReducer"(since this is the default export so it can be named whatever you import it as)
// in store.js.
export default authSlice.reducer

// Custom selectors
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token