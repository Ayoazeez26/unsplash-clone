<script setup lang="ts">
import SearchBar from '../components/SearchBar.vue'
import PhotoGrid from '../components/PhotoGrid.vue'
import PhotoModal from '../components/PhotoModal.vue'
import { usePhotosStore } from '@/stores/photos'

const photosStore = usePhotosStore()
</script>
<template>
  <main>
    <SearchBar />
    <PhotoGrid />

    <transition name="fade" mode="out-in" appear>
      <PhotoModal v-if="photosStore.showModal" />
    </transition>
  </main>
</template>
<style scoped lang="scss">
/* Transition for fading in photos */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>