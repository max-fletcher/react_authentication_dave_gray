import axios from 'axios'
const BASE_URL = "http://localhost:3500"

// This sets a default URL for axios
export default axios.create({
   baseURL: BASE_URL
})

// The reason for defining this is to attach interceptors with this which will attach JWTs that will refresh the accessToken
// if it expires(i.e status code 403)
export const axiosPrivate = axios.create({
   baseURL: BASE_URL,
   headers: { 'Content-Type': 'application/json' },
   withCredentials: true
})