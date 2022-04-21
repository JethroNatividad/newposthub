import axios from "axios"
// check if production
const isProduction = process.env.NODE_ENV === "production"
const vercelURL = process.env.VERCEL_URL

const baseURL = isProduction ? '/api' : "http://localhost:3000/api"


const apiAxios = axios.create({
    baseURL: baseURL,
})
export default apiAxios

