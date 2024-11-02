import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Location } from '../interfaces/location'

export const useLocationStore = defineStore('locations', () => {
  const locations = ref<Location[]>([])

  return { locations }
})
