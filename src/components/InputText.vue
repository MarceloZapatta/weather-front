<script lang="ts" setup>
defineProps(['label', 'type', 'placeholder', 'autofocus'])
const model = defineModel()
</script>

<template>
  <div class="input-text">
    <label :for="label">
      {{ label }}
    </label>
    <input
      :name="label"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :autofocus="autofocus"
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
.input-text input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
