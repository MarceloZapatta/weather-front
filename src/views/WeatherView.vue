<script lang="ts" setup>
import { getLocations, storeLocation } from '../services/api'
import CountrySelect from '../components/CountrySelect.vue'
import InputText from '../components/InputText.vue'
import { useUserStore } from '../stores/user'
import { ref, onMounted } from 'vue'
import ButtonDefault from '../components/ButtonDefault.vue'
import { useLocationStore } from '../stores/locations'
import type { LocationForecast } from '../interfaces/location'
import LocationForecastTable from '../components/LocationForecastTable.vue'

const selectedLocationForecasts = ref<LocationForecast[]>([])
const loading = ref(true)
const error = ref(null)
const { user } = useUserStore()
const city = ref('')
const country = ref('')
const addCityForm = ref(false)
const locations = useLocationStore()

const storeCity = async () => {
  loading.value = true
  storeLocation(city.value, country.value)
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

const fetchSavedLocations = async () => {
  loading.value = true
  getLocations()
    .then(response => {
      console.log(response.data)
      locations.$patch({ locations: response.data })
    })
    .catch(err => {
      error.value = err.message
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  fetchSavedLocations()
})
</script>

<template>
  <div class="weather-view">
    <h1>Weather Forecast</h1>
    <h2>Hello, {{ user?.name }}</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="addCityForm">
      <InputText v-model="city" label="City" />
      <CountrySelect v-model="country" label="Country" />
      <ButtonDefault @click="storeCity">Save</ButtonDefault>
      <ButtonDefault @click="addCityForm = false">
        {{ 'Close' }}
      </ButtonDefault>
    </div>
    <div>
      <ButtonDefault
        :key="location.id"
        v-for="location in locations.locations"
        @click="selectedLocationForecasts = location.forecasts"
      >
        {{ location.city }} - {{ location.country }}
      </ButtonDefault>
      <ButtonDefault @click="addCityForm = true">
        {{ 'Add City' }}
      </ButtonDefault>
    </div>
    <LocationForecastTable :locationForecasts="selectedLocationForecasts" />
    <div>
      <div></div>
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
