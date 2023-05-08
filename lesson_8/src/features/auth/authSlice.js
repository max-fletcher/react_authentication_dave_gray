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
         state.token = accessToken
      },
      logOut: (state, action) => {
         state.user = null
         state.token = null
      }
   }
})

// exporting the reducer actions/function. These can be used inside 'useDispatch' to call/execute these.
export const { setCredentials, logOut } = authSlice.actions

// exporting the slice. It will be imported with the name "authReducer"(since this is the default export so it can be named whatever you import it as)
// in store.js and registered there so it can be made available globally using provider in index.js(main.js in vite)
export default authSlice.reducer

// Custom selectors. Remember that selectors are used to show reducer states/data while reducer actions/functions are used to modify the state/data of reducers.
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token