import axios from "axios"
// check if production
const isProduction = process.env.NODE_ENV === 'production'
// get baseurl from env vercel
const baseURL = isProduction ? process.env.VERCEL_URI : 'http://localhost:3000'


const apiAxios = axios.create({
    baseURL: baseUrl,
})
export default apiAxios

