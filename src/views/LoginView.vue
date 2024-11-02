<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from '../components/InputText.vue'
import ButtonDefault from '../components/ButtonDefault.vue'
import { login } from '../services/api'
import { useUserStore } from '../stores/user'

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
  <div class="login">
    <div class="login-container">
      <form>
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
        <ButtonDefault @click="handleLogin" :loading="loading">
          Login
        </ButtonDefault>
      </form>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  .error {
    color: red;
  }
}
</style>
