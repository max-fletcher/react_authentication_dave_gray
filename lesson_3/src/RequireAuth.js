import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAuth = () => {
   const { auth } = useAuth()
   const location = useLocation()

   return(
      // The state={{ from:location }} is because the user didn't navigate to the login. He was forcefully sent there
      // so we are replacing the URL "/login" with the location where we came from(i.e "from:location" and "replace")
      auth?.user ? <Outlet /> : <Navigate to="/login" state={{ from:location }} replace />
   )
}

export default RequireAuth