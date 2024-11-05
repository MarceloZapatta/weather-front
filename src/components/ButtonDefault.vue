<script lang="ts" setup>
defineProps(['loading', 'type', 'large'])
</script>

<template>
  <button class="button-default" :type="type || 'button'">
    <div v-if="loading">Loading...</div>
    <slot v-else></slot>
  </button>
</template>

<style scoped>
.button-default {
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
}

.button-default:hover {
  opacity: 0.8;
}
</style>
