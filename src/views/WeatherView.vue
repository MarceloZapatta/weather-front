<script lang="ts" setup>
import { getWeather } from '@/services/api'
import CountrySelect from '../components/CountrySelect.vue'
import InputText from '../components/InputText.vue'
import { useUserStore } from '@/stores/user'
import { ref, onMounted } from 'vue'
import ButtonDefault from '../components/ButtonDefault.vue'

const weather = ref({
  temperature: 0,
  condition: '',
  humidity: 0,
})
const loading = ref(false)
const error = ref(null)
const { user } = useUserStore()
const city = ref('')
const countryCode = ref('')
const addCity = ref(true)

const storeCity = async () => {
  loading.value = true
  getWeather(city.value, countryCode.value)
    .then(response => {
      console.log(response.data)
      weather.value = response.data
    })
    .catch(err => {
      error.value = err.message
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  // fetchWeatherData()
})
</script>

<template>
  <div class="weather-view">
    <h1>Weather Forecast</h1>
    <h2>Hello, {{ user?.name }}</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="addCity">
      <InputText v-model="city" label="City" />
      <CountrySelect v-model="countryCode" label="Country" />
      <ButtonDefault @click="storeCity">Save</ButtonDefault>
    </div>
    <!-- <div v-else-if="error">{{ error }}</div>
    <div v-else class="weather-content">
      <div class="current-weather">
        <h2>Current Weather</h2>
        <div class="weather-info">
          <p>Temperature: {{ weather.temperature }}°C</p>
          <p>Condition: {{ weather.condition }}</p>
          <p>Humidity: {{ weather.humidity }}%</p>
        </div>
      </div>
    </div> -->
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
