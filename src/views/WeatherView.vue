<script lang="ts" setup>
import {
  deleteLocation,
  getLocations,
  logout,
  storeLocation,
} from '../services/api'
import CountrySelect from '../components/CountrySelect.vue'
import InputText from '../components/InputText.vue'
import { useUserStore } from '../stores/user'
import { ref, onMounted } from 'vue'
import ButtonDefault from '../components/ButtonDefault.vue'
import { useLocationStore } from '../stores/locations'
import type { Location } from '../interfaces/location'
import LocationForecastTable from '../components/LocationForecastTable.vue'
import router from '@/router'

const selectedLocation = ref<Location | null>(null)
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
    .then(() => {
      city.value = ''
      country.value = ''
      addCityForm.value = false
      fetchSavedLocations()
    })
    .catch(err => {
      error.value = err.message
    })
    .finally(() => {
      loading.value = false
    })
}

const destroyCity = async () => {
  if (!selectedLocation.value) return

  loading.value = true
  deleteLocation(selectedLocation.value.id)
    .then(() => {
      alert('City removed successfully.')
      selectedLocation.value = null
      fetchSavedLocations()
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

      selectedLocation.value = response.data[0] || null
    })
    .catch(err => {
      error.value = err.message
    })
    .finally(() => {
      loading.value = false
    })
}

const signOut = () => {
  loading.value = true
  logout()
    .then(() => router.push('/'))
    .finally(() => {
      loading.value = false
    })
}

const handleBack = () => {
  error.value = null
  addCityForm.value = false
}

const handleAddCity = () => {
  if (locations.locations.length >= 3) {
    alert('You can only save up to 3 cities.')
    return
  }
  addCityForm.value = true
  selectedLocation.value = null
}

onMounted(() => {
  fetchSavedLocations()
})
</script>

<template>
  <div class="weather-view">
    <h1>Weather Forecast</h1>
    <div class="greeting-container">
      <h2 class="greeting">Hello, {{ user?.name }}!</h2>
      <ButtonDefault @click="signOut">Sign out</ButtonDefault>
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="addCityForm">
      <InputText v-model="city" label="City" />
      <CountrySelect v-model="country" label="Country" />
      <ButtonDefault @click="storeCity">Save</ButtonDefault>
      <ButtonDefault @click="handleBack">
        {{ 'Back' }}
      </ButtonDefault>
    </div>
    <div v-else class="saved-cities-container">
      Saved cities:
      <div class="saved-cities-buttons-container">
        <ButtonDefault
          :key="location.id"
          v-for="location in locations.locations"
          @click="selectedLocation = location"
        >
          {{ location.city }} - {{ location.country }}
        </ButtonDefault>
        <div v-if="locations.locations.length <= 0">No cities saved.</div>
      </div>
      <ButtonDefault @click="handleAddCity">
        {{ 'Add New City' }}
      </ButtonDefault>
    </div>
    <div v-if="selectedLocation">
      <div class="selected-location-header">
        <h3>
          Selected city: {{ selectedLocation.city }} -
          {{ selectedLocation.country }}
        </h3>
        <ButtonDefault @click="destroyCity">
          {{ 'Remove city' }}
        </ButtonDefault>
      </div>
      <LocationForecastTable :locationForecasts="selectedLocation.forecasts" />
    </div>
  </div>
</template>

<style scoped>
.greeting-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.greeting {
  margin: 20px 0;
}

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

.saved-cities-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.selected-location-header {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
