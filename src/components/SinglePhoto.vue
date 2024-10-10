<template>
  <div @click="selectPhoto(photo)" class="photos">
    <SkeletonLoader v-if="showSkeleton" class="skeleton" />
    <template v-else>
      <img :src="photo.urls.small" alt="" />
      <div class="photos--details">
        <div>
          <p class="photos--details__name">{{ photo.user.name }}</p>
          <p class="photos--details__location">{{ photo.user.location }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { usePhotosStore } from '@/stores/photos'
import type { PhotoObj } from '@/services/searchService'
import SkeletonLoader from './SkeletonLoader.vue'

// interface Props {
//   photo: PhotoObj
// }

// const props = withDefaults(defineProps<Props>(), {
//   photo:
// });
const props = defineProps(['photo'])
const showSkeleton = ref(true)
const img = new Image()
img.src = props.photo.urls.small
img.onload = () => {
  // console.log('old skeleton value is => ', showSkeleton.value)
  showSkeleton.value = false
  // console.log('new skeleton value is => ', showSkeleton.value)
}
const photosStore = usePhotosStore()
const selectPhoto = (photo: PhotoObj) => {
  photosStore.singlePhoto = photo
  photosStore.showModal = true
}
</script>

<style scoped lang="scss">
.photos {
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
  & .skeleton {
    height: 350px;
  }
}
</style>
