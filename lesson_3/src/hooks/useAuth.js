// Custom hook for to restrict access.protect certain routes. Works like an access middleware
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'

// Apparantly, this is a cleaner way of importing context according to react docs. Instead of importing and using context in the
// App.js/Login.js/Register.js(etc.) file, we abstract those into this file, and just import this file from App.js
const useAuth = () => {
      return useContext(AuthContext)
}

export default useAuth