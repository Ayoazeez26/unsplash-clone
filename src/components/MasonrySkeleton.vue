<template>
  <div class="masonry-container">
    <div v-for="(column, index) in imageColumns" :key="index" class="masonry-column">
      <div v-for="item in column" :key="item" class="empty">
        <SkeletonLoader />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import SkeletonLoader from './SkeletonLoader.vue'

// Define Props
const props = defineProps({
  count: {
    type: Number,
    default: 8
  },
  columnCount: {
    type: Number,
    default: 3
  }
})

// Function to generate image columns
const generateImageColumns = (count: number, columnCount: number) => {
  const columns: number[][] = Array.from({ length: columnCount }, () => [])

  for (let index = 1; index <= count; index++) {
    const columnIndex = index % columnCount
    columns[columnIndex].push(index)
  }

  return columns
}

// Computed property to hold the image columns
const imageColumns = computed(() => generateImageColumns(props.count, props.columnCount))
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
  align-items: center;
  gap: 20px; /* Adjust the gap between images in a column */
  max-width: fit-content;

  & .empty {
    width: 300px;
    &:nth-child(2n) {
      height: 450px;
    }
    &:nth-child(odd) {
      height: 350px;
    }
  }
}
</style>
