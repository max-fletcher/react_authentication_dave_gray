import { createContext, useState } from "react";

// creating a contextAPI for all children to inherit
const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
   const [auth, setAuth] = useState({})
   const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false) // if "persist" exists in localStorage, use that, or default to false

   return (
      <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthContext