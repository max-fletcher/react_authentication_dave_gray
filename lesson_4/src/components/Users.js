import { useState, useEffect } from "react"
import axios from "../api/axios"
// import useRefreshToken from "../hooks/useRefreshToken" // this and commented out segments can be used to see if the refresh token was working or not

const Users = () => {

   const [users, setUsers] = useState()
   // Function and the commented out button can be used to see if the refresh token was working or not.
   // const refresh = useRefreshToken()

   useEffect(() => {
      let isMounted = true;
      // axios used to use cancellation tokens but now it recently started supporting this, which is part of vanilla JS.
      // It is used to cancel our request when the component unmounts.
      const controller = new AbortController()

      const getUsers = async () => {
         try {
            // signal:controller.signal is for terminating
            const response = await axios.get('/users', { signal: controller.signal })
            console.log(response.data)
            isMounted && setUsers(response.data) // if "isMounted" is true, call "setUsers" to store "response.data" in users
         } catch (error) {
            console.log(error);
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