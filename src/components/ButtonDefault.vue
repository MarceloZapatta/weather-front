<script lang="ts" setup>
import LoadingSpinner from './LoadingSpinner.vue'

defineProps(['loading', 'type', 'large'])
</script>

<template>
  <button
    class="button-default"
    :class="{ 'button-default--loading': loading }"
    :type="type || 'button'"
  >
    <LoadingSpinner v-if="loading" :small="true" />
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

.button-default--loading {
  padding: 5px 15px;
}

.button-default:hover {
  opacity: 0.8;
}
</style>
