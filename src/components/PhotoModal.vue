<script setup lang="ts">
import { usePhotosStore } from '@/stores/photos'
import IconClose from "@/components/icons/IconClose.vue"

const photosStore = usePhotosStore()
</script>
<template>
  <div v-if="photosStore.singlePhoto" @click="photosStore.showModal = false" class="container">
    <IconClose @click="photosStore.showModal = false" class="close" />
    <div
      class="photo"
      :style="{ backgroundImage: `url(${photosStore.singlePhoto?.urls.regular})` }"
    >
      <div class="photo--details">
        <p class="photo--details__name">{{ photosStore.singlePhoto.user.name }}</p>
        <p class="photo--details__location">{{ photosStore.singlePhoto.user.location }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  position: fixed;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  & .photo {
    width: 80%;
    height: 80%;
    margin: 10% auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 12px;
    background-color: white;
    display: flex;
    align-items: flex-end;
    pointer-events:all;
    &--details {
      padding: 40px 60px;
      background-color: white;
      width: 100%;
      height: 170px;
      border-radius: 0 0 12px 12px;
      &__name {
        font-size: 28px;
      }
    }
    @media screen and (max-width: 768px) {
      width: 90%;
      height: 90%;
    }
  }
  .close {
    position: absolute;
    right: 5rem;
    top: 5rem;
    color: $grey-4;
    cursor: pointer;
    @media screen and (max-width: 768px) {
      top: 1rem;
      right: 1rem;
    }
  }
}
</style>
