<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from '../components/InputText.vue'
import ButtonDefault from '../components/ButtonDefault.vue'
import { login } from '../services/api'
import { useUserStore } from '../stores/user'
import LogoComponent from '../components/LogoComponent.vue'

const router = useRouter()
const user = useUserStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const validateFields = () => {
  if (!email.value) {
    error.value = 'Please enter your email'
    return false
  }

  if (!password.value) {
    error.value = 'Please enter your password'
    return false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    error.value = 'Please enter a valid email address'
    return false
  }

  return true
}

const handleLogin = async () => {
  if (loading.value) {
    return
  }

  const valid = validateFields()

  if (!valid) return

  loading.value = true
  login(email.value, password.value)
    .then(response => {
      user.$patch({ user: response.user })
      router.push('/weather')
    })
    .catch(() => {
      error.value = 'Invalid credentials'
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <LogoComponent />
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <h2>Please enter your credentials</h2>
      <p class="error" v-if="error">{{ error }}</p>
      <InputText
        v-model="email"
        type="email"
        label="Email"
        placeholder="jorge@email.com"
        :autofocus="true"
      />
      <InputText
        v-model="password"
        label="Password"
        type="password"
        placeholder="password"
      />
      <ButtonDefault large type="submit" :loading="loading">
        Login
      </ButtonDefault>
    </form>
  </div>
</template>

<style>
.error {
  color: red;
}

.login-container {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
