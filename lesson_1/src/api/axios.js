import axios from 'axios'

// This sets a default URL for axios
export default axios.create({
   baseURL: "http://localhost:3500"
})