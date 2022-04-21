import axios from "axios"
// check if production

const baseURL = process.env.BASE_URL

const apiAxios = axios.create({
    baseURL: baseURL,
})
export default apiAxios

