import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../api/axios'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const REGISTRATION_URL = '/register'

const Register = () => {

   const userRef = useRef()
   const errRef = useRef()

   const [user, setUser] = useState('')
   const [validName, setValidName] = useState(false)
   const [userFocus, setUserFocus] = useState(false)

   const [pwd, setPwd] = useState('')
   const [validPwd, setValidPwd] = useState(false)
   const [pwdFocus, setPwdFocus] = useState(false)

   const [matchPwd, setMatchPwd] = useState('')
   const [validMatch, setValidMatch] = useState(false)
   const [matchFocus, setMatchFocus] = useState(false)

   const [errMsg, setErrMsg] = useState('')
   const [success, setSuccess] = useState(false)

   useEffect(() => {
      userRef.current.focus()
   }, []);

   useEffect(() => {
      const result = USER_REGEX.test(user)
      // console.log(result);
      // console.log(user);
      setValidName(result)
   }, [user]);

   useEffect(() => {
      const result = PWD_REGEX.test(pwd)
      // console.log(result);
      console.log(pwd);
      setValidPwd(result)
      const match = pwd === matchPwd
      setValidMatch(match)
   }, [pwd, matchPwd]);

   useEffect(() => {
      setErrMsg('')
   }, [user, pwd, matchPwd]);

   const handleSubmit = async(e) => {
      e.preventDefault();
      // in case someone hacks the button with console or removes the "disabled" property using "inspect element"s
      const v1 = USER_REGEX.test(user)
      const v2 = PWD_REGEX.test(pwd)

      console.log(v1 , v2);

      if(!v1 || !v2){
         setErrMsg('Invalid Entry')
         return
      }
      // console.log(user, pwd);

      try {
         const response = await axios.post(
            REGISTRATION_URL,
            JSON.stringify({user, pwd}),
            {
               headers : { 'Content-Type' : 'application/json'},
               withCredentials : true
            }
         )
         console.log(response.data)
         console.log(response.accessToken)
         console.log(JSON.stringify(response))
         setSuccess(true)
            // clear registration fields
      } catch (error) {
         // if error doesn't exist or error response dosen't exist, this errMsg will be set
         if(!error?.response){
            setErrMsg('No Server Response')
         }
         else if(error.response?.status === 409){
            setErrMsg('Username Taken')
         }
         else{
            setErrMsg('Registration Failed')
         }
         errRef.current.focus() // focus error message p tag
      }
   }

   return (
      <>
         {success ? (
            <section>
               <h1>Success!</h1>
               <p>
                  <a href="#">Sign In</a>
               </p>
            </section>
         ):(
            <section>
               {/* aria-live="assertive" uses the screen reader to read the text here as soon as it shows/pops up */}
               <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
               <h1>Register</h1>
               <form onSubmit={handleSubmit}>
                  <label htmlFor="username">
                     Username: 
                     <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                     </span>
                     <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                     </span>
                  </label>
                  {/* "onFocus" is when the input field is clicked && "onBlur" is when anything other than the input field is clicked */}
                  <input 
                     type="text"
                     id="username"
                     ref={userRef}
                     autoComplete="off"
                     onChange={(e) => setUser(e.target.value)}
                     required
                     aria-invalid={validName ? "false" : "true"}
                     aria-describedby="uidnote"
                     onFocus={() => setUserFocus(true)}
                     onBlur={() => setUserFocus(false)}
                  />

                  {/*
                     "userFocus" has to be true && "user" must have at least 1 character && validName has to be false for "instructions" class 
                     to be applied 
                  */}
                  <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                     <FontAwesomeIcon icon={faInfoCircle} />
                     4 to 24 characters. <br/>
                     Must begin with a letter. <br/>
                  </p>


                  <label htmlFor="password">
                     Password: 
                     <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                     </span>
                     <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                     </span>
                  </label>
                  {/* "onFocus" is when the input field is clicked && "onBlur" is when anything other than the input field is clicked */}
                  <input 
                     type="password"
                     id="password"
                     onChange={(e) => setPwd(e.target.value)}
                     required
                     aria-invalid={validPwd ? "false" : "true"}
                     aria-describedby="pwdnote"
                     onFocus={() => setPwdFocus(true)}
                     onBlur={() => setPwdFocus(false)}
                  />

                  {/*   
                     "pwdFocus" has to be true && validPwd has to be false for "instructions" class to be applied. pwd is absent since we want to
                     keep displaying the error just when the field is focused until the pwd is 8 characters long and meets the other conditions
                     (e.g 1 special character, 1 number and 1 uppercase letter and 1 lowercase letter).
                  */}
                  <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                     <FontAwesomeIcon icon={faInfoCircle} />
                     8 to 24 characters. <br/>
                     Must include uppercase and lowercase letters, a number and a special character. <br/>
                     Allowed special characters: 
                     <span aria-label="exclamation mark">!</span>
                     <span aria-label="at symbol">@</span>
                     <span aria-label="hashtag">#</span>
                     <span aria-label="dollar sign">$</span>
                     <span aria-label="percent">%</span>
                  </p>


                  <label htmlFor="confirm_pwd">
                     Confirm Password: 
                     {/* 
                        Not only does the password and confirm password need to match, if both of them are empty, then the error will display
                        (which we don't want). Hence we want the matchPwd to be non-empty to display the error
                     */}
                     <span className={validMatch && matchPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                     </span>
                     <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                     </span>
                  </label>
                  {/* "onFocus" is when the input field is clicked && "onBlur" is when anything other than the input field is clicked */}
                  <input 
                     type="password"
                     id="confirm_pwd"
                     onChange={(e) => setMatchPwd(e.target.value)}
                     required
                     aria-invalid={validMatch ? "false" : "true"}
                     aria-describedby="confirmnote"
                     onFocus={() => setMatchFocus(true)}
                     onBlur={() => setMatchFocus(false)}
                  />

                  {/*   
                     "pwdFocus" has to be true && validPwd has to be false for "instructions" class to be applied. pwd is absent since we want to
                     keep displaying the error just when the field is focused until the pwd is 8 characters long and meets the other conditions
                     (e.g 1 special character, 1 number and 1 uppercase letter and 1 lowercase letter).
                  */}
                  <p id="pwdnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                     <FontAwesomeIcon icon={faInfoCircle} />
                     Must match the first password input field.
                  </p>

                  <button disabled={!validName || !validPwd || !validMatch ? true : false }>
                     Sign Up
                  </button>
               </form>

               <p>
                  Already Registered ? <br />
                  <span className="line">
                     {/* Put router link here */}
                     <a href="#">Sign In</a>
                  </span>
               </p>
            </section>
         )}
      </>
   )
}

export default Register