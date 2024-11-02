<script lang="ts" setup>
defineProps(['label', 'type', 'placeholder', 'autofocus'])
const model = defineModel()
</script>

<template>
  <div class="input-text">
    <label :for="label">
      {{ label }}
    </label>
    <select v-model="model">
      <option value="" selected disabled>Select a country</option>
      <option value="BR">Brazil</option>
      <option value="US">United States</option>
      <option value="CA">Canada</option>
      <option value="UK">United Kingdom</option>
    </select>
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
