<script lang="ts" setup>
import { useUserStore } from '../stores/user'
import LogoComponent from './LogoComponent.vue'
import ButtonDefault from './ButtonDefault.vue'
import { logout } from '../services/api'
import router from '../router'
import { ref } from 'vue'

const { user } = useUserStore()
const loading = ref(false)

const signOut = () => {
  if (loading.value) return

  loading.value = true
  logout()
    .then(() => router.push('/login'))
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <header class="header-default">
    <LogoComponent />
    <div class="greeting-container">
      <p class="greeting">Hello, {{ user?.name }}!</p>
      <ButtonDefault @click="signOut" :loading="loading">
        Sign out
      </ButtonDefault>
    </div>
  </header>
</template>

<style scoped>
.header-default {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: transparent;
  color: white;
  margin-bottom: 30px;
}

.greeting-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.greeting {
  margin: 20px 0;
}

.greeting-container button {
  margin-left: 20px;
}
</style>
