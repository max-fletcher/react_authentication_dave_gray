import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAuth = () => {
   const { auth } = useAuth()
   const location = useLocation() // get current location before entering the protected component so back button works as expected(see below)

   return(
      // The state={{ from:location }} is because the user didn't navigate to the login. He was forcefully sent there so we are
      // replacing the protected URL (say "/" or "/admin" or "/editor" etc.) with the location where we came from
      // (i.e "/login" or "/register" etc. using "state={{ from:location }}" and "replace"). So if you  flow is supposed 
      // to be LinkPage->Home->Login, but since you are now in Login, pressing back takes you back to Home which bounces you back to
      // Login, so we need to replace the history or router so it looks like this LinkPage->LinkPage->Login. That is the purpose of these
      // 2 statements. Hence, the back button will properly send you to the previous route if its not inside any protected route
      auth?.user ? <Outlet /> : <Navigate to="/login" state={{ from:location }} replace />
   )
}

export default RequireAuth