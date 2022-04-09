import axios from "axios"
const baseUrl = 'http://localhost:3000/api'

const apiAxios = axios.create({
    baseURL: baseUrl,
})
export default apiAxios

