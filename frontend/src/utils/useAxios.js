import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const baseURL = 'http://127.0.0.1:8000/api'

const useAxios = () => {
    const {authTokens, setUser, setAuthTokens} = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL,
        headers: {Authorization: `Bearer ${authTokens?.access}`}
    })

    axiosInstance.interceptors.request.use(async request => {
        const user = jwtDecode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1 // check if current token is valid

        if (isExpired) return request

        const response = await axios.post(`${baseURL}/token/refresh/`, { // trying to get a new refresh token
            refresh: authTokens.refresh // gets refresh token
        })

        localStorage.setItem('authToken', JSON.stringify(response.data))
        // localStorage.setItem('authToken', JSON.stringify(response.data))

        setAuthTokens(response.data)
        setUser(jwtDecode(response.data.access))

        request.headers.Authorization = `Bearer ${response.data.access}`
        return request
    })
    return axiosInstance
}

export default useAxios