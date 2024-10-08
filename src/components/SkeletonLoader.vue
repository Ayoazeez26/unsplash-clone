<template>
  <div class="skeleton">
    <div class="skeleton--long" />
    <div class="skeleton--short" />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@keyframes pulse-bg {
  0% {
    background-color: $grey-3;
  }
  50% {
    background-color: $grey-5;
  }
  100% {
    background-color: $grey-3;
  }
}

.skeleton {
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 8px;
  background-color: $grey-3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  animation: pulse-bg 1s infinite;
  &--long {
    height: 12px;
    border-radius: 2px;
    width: 50%;
    background-color: $grey-4;
  }
  &--short {
    height: 12px;
    border-radius: 2px;
    width: 30%;
    margin-top: 6px;
    background-color: $grey-4;
  }
}
</style>