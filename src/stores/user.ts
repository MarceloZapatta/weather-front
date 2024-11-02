import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/interfaces/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null'),
  )

  watch(
    user,
    newUser => {
      localStorage.setItem('user', JSON.stringify(newUser))
    },
    { deep: true },
  )

  return { user }
})
