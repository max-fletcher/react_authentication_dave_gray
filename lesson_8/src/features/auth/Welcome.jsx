import { useSelector } from "react-redux" //useSelector that can be used to call selector(selectors fetch and show data only not mutate them)
import { selectCurrentUser, selectCurrentToken } from "./authSlice" // custom selectors
import { Link } from "react-router-dom"

const Welcome = () => {
      const user = useSelector(selectCurrentUser)
      const token = useSelector(selectCurrentToken)

      const welcome = user ? `Welcome ${user}!` : 'Welcome!' // construct a welcome message based on if user exists
      const tokenAbbr = `${token.slice(0, 9)}...` // slice off the first 9 characters of the token

      const content = (
         <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbr}</p>
            <p><Link to="/userslist">Go to the Users List</Link></p>
         </section>
      )

      return content
}
export default Welcome