import { createContext, useState } from "react";

// creating a contextAPI for all children to inherit
const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
   const [auth, setAuth] = useState({})
   // LINE BELOW REMOVED SINCE WE ARE USING "useToggle" HOOK AND NOT "persist" FROM authContext ANYMORE
   // const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false) // if "persist" exists in localStorage, use that, or default to false

   return (
      // <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      // LINE ABOVE REPLACED WITH LINE BELOW SINCE WE ARE USING "useToggle" HOOK AND NOT "persist" FROM authContext ANYMORE
      <AuthContext.Provider value={{ auth, setAuth }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthContext