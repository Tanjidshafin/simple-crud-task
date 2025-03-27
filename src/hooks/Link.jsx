import axios from "axios"
import { useNavigate } from "react-router"
const link = axios.create({
    baseURL: "https://reqres.in/api",
})
const navigate = useNavigate()
// Add a request interceptor to include the auth token
link.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

// Add a response interceptor to handle errors
link.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token")
            navigate("/login")
        }
        return Promise.reject(error)
    },
)

export default link

