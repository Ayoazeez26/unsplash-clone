<script></script>
<script setup lang="ts">
import SkeletonLoader from './SkeletonLoader.vue'
import { usePhotosStore } from '@/stores/photos'
import type { PhotoObj } from '@/services/searchService'

const photosStore = usePhotosStore()

const selectPhoto = (photo: PhotoObj) => {
  photosStore.singlePhoto = photo;
  photosStore.showModal = true;
}
</script>
<template>
  <div class="container">
    <div class="photo-layout">
      <template v-if="photosStore.isLoading">
        <div v-for="item in 6" :key="item" class="photos">
          <SkeletonLoader />
        </div>
      </template>
      <template v-else>
        <div
          v-for="photo in photosStore.photos"
          :key="photo.id"
          @click="selectPhoto(photo)"
          class="photos"
          :style="{ backgroundImage: `url(${photo.urls.small})` }"
        >
          <!-- <img :src="photo.urls.small" :alt="photo.alt_description" /> -->
          <div class="photos--details">
            <div>
              <p class="photos--details__name">{{ photo.user.name }}</p>
              <p class="photos--details__location">{{ photo.user.location }}</p>
            </div>
          </div>
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

  & .photo-layout {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: 300px;
    // grid-template-rows: masonry;
    grid-auto-flow: dense;
    gap: 20px;
    & .photos {
      cursor: pointer;
      overflow: hidden;
      position: relative;
      border-radius: 8px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
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
