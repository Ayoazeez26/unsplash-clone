<script></script>
<script setup lang="ts">
// import { ref, reactive } from 'vue';
import SkeletonLoader from './SkeletonLoader.vue'
import MasonryLayout from './MasonryLayout.vue'
import { usePhotosStore } from '@/stores/photos'

const photosStore = usePhotosStore();

</script>
<template>
  <div class="container">
    <div ref="photoLayout" class="photo-layout">
      <template v-if="photosStore.isLoading && photosStore.page === 1">
        <div v-for="item in 6" :key="item" class="photos">
          <SkeletonLoader />
        </div>
      </template>
      <template v-else>
        <div class="photo-layout--column">
          <MasonryLayout
            :photos="photosStore.photos"
          />
        </div>
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
    // display: grid;
    // grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    // grid-auto-rows: 300px;
    // // grid-template-rows: masonry;
    // grid-auto-flow: dense;
    width: 100%;
    display: flex;
    // gap: 20px;
    // &--column {
    //   display: flex;
    //   flex-direction: column;
    //   margin: 1rem;
    // }
    & .photos {
      cursor: pointer;
      overflow: hidden;
      position: relative;
      border-radius: 8px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      width: 300px;
      margin-bottom: 1rem;
      &--details {
        position: absolute;
        border-radius: 8px;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.1) 50%,
          rgba(0, 0, 0, 0.9) 100%
        );
        display: flex;
        align-items: flex-end;
        padding: 20px;
        color: white;
        &__name {
          font-size: 18px;
        }
        &__location {
          font-size: 12px;
        }
      }

      &:nth-child(even) {
        height: 450px;
        grid-row: span 3;
      }
      &:nth-child(odd) {
        height: 350px;
        grid-row: span 2;
      }
    }
  }
}
</style>
