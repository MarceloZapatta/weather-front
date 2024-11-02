import type { Location } from '@/interfaces/location'
import type { User } from '../interfaces/user'
import axios from 'axios'

interface LoginResponse {
  message: string
  user: User
  token: string
}

interface LocationResponse {
  data: Location[]
}

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await api.post('/login', { email, password })

    localStorage.setItem('token', response.data.token)

    return response.data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

export const storeLocation = async (city: string, countryCode: string) => {
  try {
    const response = await api.post(
      `/user/locations`,
      {
        city,
        country: countryCode,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}

export const getLocations = async (): Promise<LocationResponse> => {
  try {
    const response = await api.get(`/user/locations`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}

export const deleteLocation = async (id: number) => {
  try {
    const response = await api.delete(`/user/locations/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}

export default api
