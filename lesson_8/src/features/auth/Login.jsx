import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux' // used to dispatch reducer actions
import { setCredentials } from './authSlice' // a reducer action
import { useLoginMutation } from './authApiSlice' // importing a builder mutations that can be used to hit an endpoint and fetch & cache data

const Login = () => {
   const userRef = useRef()
   const errRef = useRef()
   const [user, setUser] = useState('')
   const [pwd, setPwd] = useState('')
   const [errMsg, setErrMsg] = useState('')
   const navigate = useNavigate()

   const [login, { isLoading }] = useLoginMutation() //destructuring "login" mutation and "isLoading" state(which can be used to show loader)
   const dispatch = useDispatch()

   useEffect(() => {
      userRef.current.focus()
   }, [])

   useEffect(() => { // used to reset error message when a user starts typing
      setErrMsg('')
   }, [user, pwd])

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         // use login mutation to fetch user data. Remember, unwrap is provided by redux-toolkit that allows us to use try-catch and respond accordingly
         const userData = await login({ user, pwd }).unwrap()
         console.log('userData', userData);
         // "userData" only returns an "accessToken" so we use spread operator to unwrap the object to get the "accessToken" but pass the
         // "accessToken" and the "user" to the "setCredentials" method
         dispatch(setCredentials({ ...userData, user }))
         setUser('') // clear "user" field
         setPwd('') // clear "password" field
         navigate('/welcome') // navigate to "/welcome" url
      } catch (error) {
         console.log(error)
         if (error?.originalStatus){
            setErrMsg('No Server Response')
         }
         else if(error.originalStatus === 400){
            setErrMsg('Missing Username or Password')
         }
         else if(error.originalStatus === 401){
            setErrMsg('Unauthorized')
         }
         else{
            setErrMsg('Login Failed')
         }
         errRef.current.focus()
      }
   }

   const handleUserInput = (e) => setUser(e.target.value)
   const handlePwdInput = (e) => setPwd(e.target.value)

   const content = isLoading ? <h1>Loading...</h1> : (
      <section className="login">
         <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

         <h1>Employee Login</h1>

         <form onSubmit={handleSubmit}>
            <label htmlFor="username"> Username: </label>
            <input 
               type="text"
               id="username"
               ref={userRef}
               value={user}
               onChange={handleUserInput}
               autoComplete="off"
               required
            />

            <label htmlFor="password"> Password: </label>
            <input 
               type="password"
               id="password"
               value={pwd}
               onChange={handlePwdInput}
               required
            />

            <button>Sign In</button>
         </form>
      </section>
   )

   return content
}

export default Login