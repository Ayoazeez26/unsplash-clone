<script></script>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import MasonryLayout from './MasonryLayout.vue'
import MasonrySkeleton from './MasonrySkeleton.vue'
import { usePhotosStore } from '@/stores/photos'

const photosStore = usePhotosStore()

const columnCount = ref<number>(3)

const updateColumnCount = () => {
  const width = window.innerWidth

  if (width <= 768) {
    columnCount.value = 1
  } else if (width <= 1040) {
    columnCount.value = 2
  } else {
    columnCount.value = 3
  }
}

const setupResponsiveColumns = () => {
  updateColumnCount()

  window.addEventListener('resize', updateColumnCount)
}

onMounted(() => {
  setupResponsiveColumns()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateColumnCount)
})
</script>
<template>
  <div class="container">
    <div ref="photoLayout" class="photo-layout">
      <template v-if="photosStore.isLoading && photosStore.page === 1">
        <MasonrySkeleton :count="8" :columnCount="columnCount" />
      </template>
      <template v-else>
        <div>
          <MasonryLayout :photos="photosStore.photos" :columnCount="columnCount" />
        </div>
        <template v-if="photosStore.isLoading && photosStore.page !== 1">
          <MasonrySkeleton :count="10" :columnCount="columnCount" />
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 1020px;
  margin: 0 auto;
  margin-top: -60px;
  @media screen and (max-width: 1158px) {
    padding: 0 16px;
  }
  & .photo-layout {
    width: 100%;
  }
}
</style>
