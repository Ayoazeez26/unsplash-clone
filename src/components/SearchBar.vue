<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePhotosStore } from '@/stores/photos'
import IconSearch from './icons/IconSearch.vue'
import { type PhotoObj } from '@/services/searchService'

const photosStore = usePhotosStore();
const searchTerm = ref('')
const photos = ref<PhotoObj[]>([]);
const show = ref(false);
const searchPhotos = async () => {
  if (!searchTerm.value) return;
  show.value = true;
  const allPhotos = photosStore.photoSearch(searchTerm.value);
  // if (allPhotos) {
  //   photos.value = allPhotos
  //   // show.value = false;
  // }
}

onMounted(() => {
  const allPhotos = photosStore.photoSearch("African");
  // if (allPhotos) {
  //   photos.value = allPhotos
  // }
});
</script>
<template>
  <div class="hero">
    <div v-if="photosStore.isLoading">Searching for <span>"{{ searchTerm }}"</span></div>
    <div v-if="!photosStore.isLoading && show">Search results for <span>"{{ searchTerm }}"</span></div>
    <div class="hero--search">
      <input
        type="text"
        v-model="searchTerm"
        @keyup.enter="searchPhotos"
        placeholder="Search for photo"
        class="hero--search__input"
      />
      <IconSearch class="hero--search__icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  background-color: $grey;
  padding: 80px 0 140px;
  &--search {
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    position: relative;
    &__input {
      padding: 14px;
      padding-left: 48px;
      width: 100%;
      border-radius: 6px;
      font-size: 14px;
      border: 1px solid white;
      box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.12);
      -webkit-box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.12);
      -moz-box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.12);
      color: $blue-1;
      &:focus {
        outline: none;
      }
    }
    &__icon {
      position: absolute;
      left: 16px;
      top: 7px;
      width: 16px;
      color: $grey-2;
    }
  }
}
</style>
