// removed "useContext" and "AuthContext" in favor of the custom "useAuth"
/*, useContext */
import { useRef, useState, useEffect } from 'react'
// import AuthContext from './context/AuthProvider'
import useAuth from '../hooks/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from '../api/axios'
// import useLocalStorage from '../hooks/useLocalStorage' // hook below uses "useLocalStorage" so not needed here anymore
import useInput from '../hooks/useInput'
import useToggle from '../hooks/useToggle'
const LOGIN_URL = '/auth'

const Login = () => {
   // removed "useContext" and "AuthContext" and this in favor of the custom "useAuth"
   // const { setAuth } = useContext(AuthContext) //importing setAuth from AuthContext.
   // We are removing "persist" and "setPersist" from authContext and moving them to "useToggle" hook
   const { setAuth /* , persist, setPersist */ } = useAuth() // cleaner way of importing setAuth from AuthContext.

   const navigate = useNavigate()
   const location = useLocation() // get current location URL
   // remember that we passed "state={{ from:location }}" and "replace" in RequireAuth Middleware. If exists then store in variable
   // "location", else store "/".
   const from = location.state?.from?.pathname || "/"

   const userRef = useRef()
   const errRef = useRef()

   // replacing "useState" with "useLocalStorage" so value is stored in localStorage.
   // The useLocalStorage accepts 2 params; "key" and "initValue".
   // We are passing those 2 params so that "key='user'" and "initValue=''".
   // const [user, setUser] = useLocalStorage('user', '') //useState('')

   // replaced above line with this. Its a hook that uses "useLocalStorage" inside it(hook inside another hook).
   const [user, resetUser, userAttribute] = useInput('user', '') //useState('')
   const [pwd, setPwd] = useState('')
   const [errMsg, setErrMsg] = useState('')
   // const [success, setSuccess] = useState(false) // not needed anymore due to the line "navigate(from, {replace: true})"
   const [check, toggleCheck] = useToggle('persist', false)

   useEffect(() => {
      userRef.current.focus()
   }, []);

   useEffect(() => {
      setErrMsg('')
   }, [user, pwd]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      console.log(user, pwd, JSON.stringify({user, pwd})); // stringify and log inputs
      try {
         // if needed, you can use destructuring and changing that variable name to something else e.g using JSON.stringify({username: user, pwd}) will
         // cause the "user" to be named "username" instead
         const response = await axios.post(
            LOGIN_URL,
            JSON.stringify({user, pwd}),
            {
               headers: {'Content-Type': 'application/json'},
               withCredentials: true
            }
         )
         console.log(response?.data);
         // console.log(JSON.stringify(response));
         const accessToken = response?.data?.accessToken
         // const roles = response?.data?.roles
         // setAuth({user, pwd, roles, accessToken}) // saving data in context API

         // Removed above 2 lines with line below since we don't need roles. It was initially passed from backend but accessToken already contains
         // those roles so we removed them
         setAuth({user, pwd, accessToken}) // saving data in context API

         // Clear Fields after submit
         // setUser('')
         resetUser()

         setPwd('')
         // redirect to the "from" page. If it was passed a value from <RequireAuth>(i.e "/admin" or "/editor")
         // go there. Else, just go to the default which is "/"
         navigate(from, {replace: true})
         // setSuccess(true) // not needed anymore due to the above line
      } catch (error) {
         if(!error?.response){
            setErrMsg('No Server Errors')
         }
         else if(error.response?.status === 400){
            setErrMsg('Missing Username or Password')
         }
         else if(error.response?.status === 401){
            setErrMsg('Unauthorized')
         }
         else{
            setErrMsg('Login Failed')
         }

         errRef.current.focus()
      }
   }

   // 2 BLOCKS BELOW NOT NEEDED ANYMORE SINCE WE ARE USING "useToggle" HOOK AND NOT authContext ANYMORE

   // // function for changing persist state
   // const togglePersist = () => {
   //    setPersist(prev => !prev)
   // }

   // // store "persist" in localStorage when "persist" changes
   // useEffect(() => {
   //    localStorage.setItem("persist", persist)
   // }, [persist])

   return(
      <>
         {
            // not needed anymore due to the line "navigate(from, {replace: true})"
            // success ? (
            //    <section>
            //       <h1>You are logged in!</h1>
            //       <br />
            //       <p>
            //          <a href="#">Go to home</a>
            //       </p>
            //    </section>
            // ):
         (
            <section>
               {/* aria-live="assertive" uses the screen reader to read the text here as soon as it shows/pops up */}
               <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
               <h1>Sign In</h1>
               <form onSubmit={handleSubmit}>
                  <label htmlFor="username">Username:</label>
                  <input
                     type="text"
                     id="username"
                     ref={userRef}
                     autoComplete="off"
                     // value={user}
                     // onChange={(e) => setUser(e.target.value)}

                     // spreads an object "userAttribute" that comes from useInput hook. Contains "value" and an "onChange" function
                     // that can replace the "value={user}" and "onChange={(e) => setuser(e.target.value)}"(2 lines above)
                     {...userAttribute} 
                     required
                  />

                  <label htmlFor="password">Password:</label>
                  <input 
                     type="password"
                     id="password"
                     onChange={(e) => setPwd(e.target.value)}
                     value={pwd}
                     required
                  />

                  <button>Sign In</button>
                  <div className="persistCheck">
                     {/* <input type="checkbox" id="persist" onChange={togglePersist} checked={persist} /> */}
                     {/* LINE ABOVE REPLACED WITH LINE BELOW SINCE WE ARE USING "useToggle" HOOK AND NOT authContext ANYMORE */}
                     <input type="checkbox" id="persist" onChange={toggleCheck} checked={check} />
                     <label htmlFor="persist">Remember Me</label>
                  </div>
               </form>

               <p>
                  Need An Account ? <br />
                  <span className="line">
                     {/* Put router link here */}
                     <a href="#">Sign Up</a>
                  </span>
               </p>
            </section>
         )}
      </>
   )
}

export default Login