<script lang="ts" setup>
import type { LocationForecast } from '../interfaces/location'

interface LocationForecastsTableProps {
  locationForecasts: LocationForecast[]
}

defineProps<LocationForecastsTableProps>()
</script>

<template>
  <table v-if="locationForecasts.length > 0">
    <tbody>
      <tr
        v-for="locationForecast in locationForecasts"
        :key="locationForecast.date"
      >
        <td>{{ locationForecast.date }}</td>
        <td>{{ locationForecast.temperature }}°C</td>
        <td>{{ locationForecast.humidity }}%</td>
        <td>{{ locationForecast.rainfall }}</td>
        <td>More info</td>
      </tr>
    </tbody>
  </table>
  <p v-else>No forecast data found.</p>
</template>
