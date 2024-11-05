<script lang="ts" setup>
defineProps(['small'])
</script>

<template>
  <div class="loading-container">
    <span class="loader" :class="{ 'loader--small': small }"></span>
  </div>
</template>

<style scoped>
.loader {
  width: 24px;
  height: 24px;
  border: 5px solid #999999;
  border-bottom-color: #ffd900;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.loader--small {
  width: 18px;
  height: 18px;
  border: 3px solid #999999;
  border-bottom-color: #ffd900;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
