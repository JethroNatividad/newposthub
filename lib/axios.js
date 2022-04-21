import axios from "axios"
// check if production
const isProduction = process.env.NODE_ENV === 'production'
// get baseurl from env vercel
const baseURL = isProduction ? process.env.VERCEL_URI + '/api' : 'http://localhost:3000/api'


const apiAxios = axios.create({
    baseURL: baseURL,
})
export default apiAxios

