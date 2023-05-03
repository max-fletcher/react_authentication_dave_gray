import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux" //useSelector that can be used to call selector
import { selectCurrentToken } from "./authSlice" //a custom selector

const RequireAuth = () => {

   const token = useSelector(selectCurrentToken)
   const location = useLocation() // get current location

   return (
      token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace/>
   )
}

export default RequireAuth