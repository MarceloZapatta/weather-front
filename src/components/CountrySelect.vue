<script lang="ts" setup>
import VueSelect from 'vue3-select-component'
import { countries } from '../fixtures/countries'

defineProps(['label', 'type', 'placeholder', 'autofocus'])
const model = defineModel()
</script>

<template>
  <div class="input-select">
    <label :for="label">
      {{ label }}
    </label>
    <VueSelect
      v-model="model"
      :options="countries"
      placeholder="Select a country"
      class="select"
    />
  </div>
</template>

<style scoped>
.input-select {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.input-select label {
  padding-right: 10px;
}
.input-select .select {
  widows: 100%;
  width: 200px;
}
</style>
