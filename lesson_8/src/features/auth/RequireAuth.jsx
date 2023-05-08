import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux" //useSelector that can be used to call selector(selectors fetch and show data only not mutate them)
import { selectCurrentToken } from "./authSlice" //a custom selector

const RequireAuth = () => {

   const token = useSelector(selectCurrentToken) // get token from redux auth reducer
   const location = useLocation() // get current location

   return (
      token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace/>
   )
}

export default RequireAuth