<template>
  <div class="masonry-container">
    <div v-for="(column, index) in imageColumns" :key="index" class="masonry-column">
      <template v-for="photo in column" :key="photo.id">
        <SinglePhoto :photo="photo" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType, defineProps } from 'vue'
import type { PhotoObj } from '@/services/searchService'
import SinglePhoto from './SinglePhoto.vue'

const props = defineProps({
  photos: {
    type: Array as PropType<PhotoObj[]>,
    required: true,
  },
  columnCount: {
    type: Number,
    default: 3,
  },
})

const generateImageColumns = (photos: PhotoObj[], columnCount: number) => {
  const columns: PhotoObj[][] = Array.from({ length: columnCount }, () => [])
  
  photos.forEach((image, i) => {
    const columnIndex = i % columnCount
    columns[columnIndex].push(image)
  })
  
  return columns
}

const imageColumns = computed(() => generateImageColumns(props.photos, props.columnCount))
</script>

<style scoped lang="scss">
.masonry-container {
  display: flex;
  gap: 50px; /* You can adjust the gap between columns */
  justify-content: center;
}

.masonry-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Adjust the gap between images in a column */
  @media screen and (max-width: 1040px) {
    max-width: fit-content;
  }
}
</style>