import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import authReducer from '../features/auth/authSlice'

// the reducer object inside will contain all the reducers we will use. We will wrap the <App /> component with this store
// so our App can access these store reducers from all places. Else, it will not work.

// the reducer object inside will contain all the reducers we will use.
export const store = configureStore({
   reducer: {
      // posts: postsReducer,

      // using apiSlice for store. "apiSlice.reducerPath" comes from apiSlice.js so it is dynamic/computed. The "apiSlice.reducer" is the reducer
      // to use for this store. Hence, if you create new apiSlices with builder methods, you won't have to register them here manually.
      // They will be registered here in this store automatically.
      [apiSlice.reducerPath]: apiSlice.reducer,
      // users: usersReducer,

      // adding authReducer(createSlice) along with all other apiSlices(createApi) that uses RTK. This is because these API endpoints will
      // not have any cacheing involved and hence no extra reducers and no RTK.
      auth: authReducer
   },
   // This middleware is required for use with RTK QUERY with an "apiSlice". It manages cache lifetimes and expiration info.
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
   devtools: true
})