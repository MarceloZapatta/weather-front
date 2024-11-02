<script lang="ts" setup>
import { ref } from 'vue'
import InputText from '../components/InputText.vue'
import ButtonDefault from '../components/ButtonDefault.vue'
import { login } from '../services/api'

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  if (loading.value) {
    return
  }

  loading.value = true
  login(email.value, password.value)
    .then(() => {
      alert('logged in sucessfully')
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="login">
    <div class="login-container">
      <h2>Please enter your credentials</h2>
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
}
</style>
