export interface LocationForecast {
  icon: string
  date: string
  description: string
  temperature: number
  humidity: number
  rain: number
  wind_speed: number
  wind_direction: string
  pressure: number
  visibility: number
  cloud_cover: number
}

export interface Location {
  id: number
  city: string
  country: string
  forecasts: LocationForecast[]
}
