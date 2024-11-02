<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { ref, onMounted } from 'vue'

const weather = ref({
  temperature: 0,
  condition: '',
  humidity: 0,
})
const loading = ref(true)
const error = ref(null)
const { user } = useUserStore()

const fetchWeatherData = async () => {
  try {
    loading.value = true
    // Replace with your actual API call
    const response = await fetch('your-weather-api-endpoint')
    const data = await response.json()

    weather.value = {
      temperature: data.temperature,
      condition: data.condition,
      humidity: data.humidity,
    }
  } catch (e) {
    error.value = 'Failed to fetch weather data'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchWeatherData()
})
</script>

<template>
  <div class="weather-view">
    <h1>Weather Forecast</h1>
    <h2>Hello, {{ user?.name }}</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="weather-content">
      <div class="current-weather">
        <h2>Current Weather</h2>
        <div class="weather-info">
          <p>Temperature: {{ weather.temperature }}°C</p>
          <p>Condition: {{ weather.condition }}</p>
          <p>Humidity: {{ weather.humidity }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-view {
  padding: 20px;
}

.weather-content {
  max-width: 600px;
  margin: 0 auto;
}

.current-weather {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}

.weather-info {
  margin-top: 10px;
}
</style>
