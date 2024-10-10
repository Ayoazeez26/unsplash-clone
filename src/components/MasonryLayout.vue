<template>
  <div class="masonry-container">
    <div v-for="(column, index) in imageColumns" :key="index" class="masonry-column">
      <template v-for="photo in column" :key="photo.id">
        <!-- Assuming you have an Image component or using <img /> tag -->
        <SinglePhoto :photo="photo" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType, defineProps } from 'vue'
import type { PhotoObj } from '@/services/searchService'
import SinglePhoto from './SinglePhoto.vue'

// Define Props
const props = defineProps({
  photos: {
    type: Array as PropType<PhotoObj[]>, // Replace 'PhotoObj[]' with the actual image object type if available
    required: true,
  },
  columnCount: {
    type: Number,
    default: 3,
  },
})

// Function to generate image columns
const generateImageColumns = (photos: PhotoObj[], columnCount: number) => {
  const columns: PhotoObj[][] = Array.from({ length: columnCount }, () => [])
  
  photos.forEach((image, i) => {
    const columnIndex = i % columnCount
    columns[columnIndex].push(image)
  })
  
  return columns
}

// Computed property to hold the image columns
const imageColumns = computed(() => generateImageColumns(props.photos, props.columnCount))
</script>

<style scoped>
.masonry-container {
  display: flex;
  gap: 20px; /* You can adjust the gap between columns */
}

.masonry-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Adjust the gap between images in a column */
}
</style>