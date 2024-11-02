<script lang="ts" setup>
import VueSelect from 'vue3-select-component'
import { countries } from '../fixtures/countries'

defineProps(['label', 'type', 'placeholder', 'autofocus'])
const model = defineModel()
</script>

<template>
  <div class="input-text">
    <label :for="label">
      {{ label }}
    </label>
    <VueSelect
      v-model="model"
      :options="countries"
      placeholder="Select a country"
    />
  </div>
</template>

<style scoped>
.input-text {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.input-text label {
  padding-right: 10px;
}
.input-text select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
