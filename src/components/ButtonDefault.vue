<script lang="ts" setup>
defineProps(['loading'])
</script>

<template>
  <button class="button-default">
    <div v-if="loading">Loading...</div>
    <slot v-else></slot>
  </button>
</template>

<style scoped>
.button-default {
  padding: 10px;
}
</style>
