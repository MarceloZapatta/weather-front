import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/interfaces/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  return { user }
})
