<script lang="ts" setup>
defineProps(['loading', 'type'])
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
  border: none;
}
</style>
