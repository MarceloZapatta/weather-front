import type { User } from '@/interfaces/user'
import axios from 'axios'

interface LoginResponse {
  message: string
  user: User
  token: string
}

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
})

export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await api.post('/login', { email, password })
    return response.data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

export const getWeather = async (city: string) => {
  try {
    const response = await api.get(`/weather?city=${city}`)
    return response.data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}

export default api
