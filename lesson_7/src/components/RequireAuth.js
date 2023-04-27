import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode"

const RequireAuth = ({ allowedRoles }) => { // has a prop called "allowedRoles". May or may not contains 3 roles("admin", "user" & "editor")
   const { auth } = useAuth() // importing from custom hook. We are only importing "auth" and not "setAuth" since we only wanna read the data not write over it
   const location = useLocation() // get current location before entering the protected component so back button works as expected(see below)

   console.log('RequireAuth', location);

   const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined // if "accessToken" exists, decode the token and store it in var, else store undefined

   const roles = decoded?.UserInfo?.roles || [] // if decoded "accessToken" contains roles array, store it in var, else store empty array

   return(
      // The "state={{ from:location }}" is because we are sending the "from" address to the "<Login>" component so that we can
      // redirect to the page he wished to access before he was redirected to login. So, if say the flow is supposed
      // to be LinkPage->Admin->Login(because the user clicked/visited "admin" from "linkpage"), it is sending a string "/admin"(i.e Admin)
      // as data in the "from" state to the login component. There, if "from" exists, we access it using
      // "const from = location.state?.from?.pathname" and hence, we can redirect the user to that location after login.

      // In short, "replace" forcefully takes you to a URL without pushing a new value to the history stack. 
      // It instead replaces the current/top value of the stack

      // The "replace" is because the user didn't navigate to the login. He was forcefully sent there so we are replacing the
      // protected URL (say "/" or "/admin" or "/editor" etc.) with the location where we came from (i.e "/login" or
      // "/register" etc. using "state={{ from:location }}" and "replace"). So if the flow is supposed to be
      // LinkPage->Home->Login(because the user clicked/visited "home" from "linkpage"), but since you are now in Login,
      // pressing back takes you back to Home which bounces you back to Login, so we need to replace the history of the router so
      // it looks like this LinkPage->Login. That is the purpose of "replace"(i.e it forcefully takes you to a URL without
      // pushing a new value to the history stack. It replaces the current/top value of the history stack). Hence, the back 
      // if its not inside any protected route button will properly send you to the previous route (i.e to "/linkpage" since 
      // it thinks we are in the "/home" page not in "/login")

      // auth?.roles?.find(role => allowedRoles?.includes(role)) // comparing if the "roles" passed in auth.roles matches any of the roles in "allowedRoles"
      //       ? <Outlet />
      //       // using chained ternary. You can use "if elseif else" if you want. Here, if the auth user role doesn't match but the
      //       // user exists nonetheless, take them to the "/unauthorized" page
      //       : auth?.user ? <Navigate to="/unauthorized" state={{ from:location }} replace />
      //                      : <Navigate to="/login" state={{ from:location }} replace />

      // I think you can also use "{ state: { from:location }}" instead of state={{ from:location }} as per the docs

      // Replaced above block(line: 35 to 40) with this block since we will be taking roles from "accessToken" now instead of passing it from API
      roles?.find(role => allowedRoles?.includes(role)) // comparing if the "roles" passed in auth.roles matches any of the roles in "allowedRoles"
            ? <Outlet />
            // using chained ternary. You can use "if elseif else" if you want. Here, if the auth user role doesn't match but accessToken 
            // exists nonetheless, take them to the "/unauthorized" page
            : auth?.accessToken ? <Navigate to="/unauthorized" state={{ from:location }} replace />
                           : <Navigate to="/login" state={{ from:location }} replace />
   )
}

export default RequireAuth