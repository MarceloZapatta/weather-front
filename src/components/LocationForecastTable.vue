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
        <td>
          <img
            :src="locationForecast.icon"
            :alt="locationForecast.description"
            width="50"
            height="50"
          />
        </td>
        <td>{{ locationForecast.description }}</td>
        <td>
          <Popper content="This is the Popper content 🍿">
            <button>More info</button>
            <template #content>
              <p>Humidity: {{ locationForecast.humidity }}%</p>
              <p>Rain: {{ locationForecast.rain }} mm</p>
              <p>Wind speed: {{ locationForecast.wind_speed }} km/h</p>
            </template>
          </Popper>
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else>No forecast data found.</p>
</template>

<style>
:root {
  --popper-theme-background-color: #fff;
  --popper-theme-background-color-hover: #fff;
  --popper-theme-text-color: #333333;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 32px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>
