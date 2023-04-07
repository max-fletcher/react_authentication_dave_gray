import { useState, useEffect } from "react"
// import useRefreshToken from "../hooks/useRefreshToken" // this and commented out segments can be used to see if the refresh token was working or not
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useNavigate, useLocation } from "react-router-dom"


const Users = () => {

   const [users, setUsers] = useState()
   // Function and the commented out button can be used to see if the refresh token was working or not.
   // const refresh = useRefreshToken()
   const axiosPrivate = useAxiosPrivate() // an instance of axiosPrivate hook
   const navigate = useNavigate()
   // This is the same logic as used in RequireAuth(see that to clarify)
   const location = useLocation()
   console.log('Users', location)

   useEffect(() => {
      let isMounted = true;
      // axios used to use cancellation tokens but now it recently started supporting this, which is part of vanilla JS.
      // It is used to cancel our request when the component unmounts.
      const controller = new AbortController()

      const getUsers = async () => {
         try {
            // signal:controller.signal is for terminating. Also, axiosPrivate is used here
            const response = await axiosPrivate.get('/users', { signal: controller.signal });
            console.log(response.data);
            isMounted && setUsers(response.data); // if "isMounted" is true, call "setUsers" to store "response.data" in users
         } catch (error) {
            console.log(error);
            // 2nd and 3rd param uses the same logic as "RequireAuth" component(see there to understand how it works). Apart from
            // that, the purpose of this line below is to take the user back to the users page in case he was booted out from here
            // due to the "refreshToken" expiring. Also, the "replace" is if the user was just kicked out to "/login", the history
            // stack would look like this: admin->home->login. By using replace, it will look like this: admin->home so pressing back
            // will take you to admin.
            // STUPID ASS FUCKING STRICT MODE CAUSES AXIOS INTERCEPTORS TO RUN TWICE SO USE THIS LINE BELOW WITHOUT STRICT MODE ENABLED.
            navigate('/login', { state: {from: location}, replace: true });
         }
      }

      getUsers() // call "getusers()"

      // CLEANUP FUNCTION
      return() => {
         isMounted = false // we will prevent setting of "users" using the "setUsers" since "isMounted" became false
         controller.abort() // abort the axios request
      }
   }, [])
   
   return (
      <>
         <article>
            <h2>Users List</h2>
            {/* Using ternary. If users exists... */}
            {users?.length
               ? (
                  <ul>
                     {
                        users.map((user, index) => {
                           return(
                              <>
                                 <li key={index}>{user?.username}</li>
                              </>
                           )
                        })
                     }
                  </ul>
               ) : <p>No users to display</p>
            }
            {/* <button onClick={() => {refresh()}}>Refresh</button> */} {/* This button was to see if the refresh token was working or not. */}
            {/* <br /> */}
         </article>
      </>
   )
}

export default Users