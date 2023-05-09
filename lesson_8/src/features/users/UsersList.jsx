import { useGetUsersQuery } from "./usersApiSlice"
import { Link } from "react-router-dom"

const UsersList = () => {
   // getting users data by destructuring it
   const {
      data: users, // renaming data to users by destructuring it
      isLoading,
      isSuccess,
      isError,
      error
   } = useGetUsersQuery()

   let content
   if(isLoading){
      content = (
         <p> Loading... </p>
      )
   }
   else if(isSuccess){
      content = (
         <section className="users">
            <h1>Users List</h1>
            <ul>
               {users.map((user, index) => {
                  return <li key={index}>{user.username}</li>
               })}
            </ul>
            <Link to="/welcome">Back to Welcome</Link>
         </section>
      )
   }
   else if(isError){
      content = ( 
         <p> {JSON.stringify(error)} </p>
      )
   }

   return content
}

export default UsersList