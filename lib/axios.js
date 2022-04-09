import axios from "axios"
const baseUrl = 'http://localhost:3000/api'

export default axios.create({
    baseURL: baseUrl,
})