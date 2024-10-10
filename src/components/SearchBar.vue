<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { usePhotosStore } from '@/stores/photos'
import IconSearch from './icons/IconSearch.vue'
import { type QueryObj } from '@/services/searchService'

const photosStore = usePhotosStore()
const searchTerm = ref('')
const show = ref(false)
watch(searchTerm, () => {
  show.value = false
  photosStore.page = 1;
})
const searchPhotos = async () => {
  const payload = {
    query: searchTerm.value,
    page: photosStore.page
  }
  if (!searchTerm.value) return
  show.value = true
  await photosStore.photoSearch(payload)
  photosStore.page += 1;
}

const handleScroll = () => {
  const buffer = 300;
  const bottomOfWindow =
    window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - buffer;
  if (bottomOfWindow && !photosStore.isLoading && photosStore.page <= photosStore.totalPages) {
    searchPhotos();
  }
};

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

onMounted(async () => {
  const payload: QueryObj = {
    query: 'African',
    per_page: 8
  }
  await photosStore.photoSearch(payload)
  window.addEventListener('scroll', handleScroll);
})
</script>
<template>
  <div class="hero">
    <div class="hero--search">
      <p v-if="photosStore.isLoading && show">
        Searching for <span>"{{ searchTerm }}"</span>
      </p>
      <p v-if="!photosStore.isLoading && show">
        Search results for <span>"{{ searchTerm }}"</span>
      </p>
      <div class="relative">

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
  </div>
</template>

<style scoped lang="scss">
.hero {
  background-color: $grey;
  padding: 80px 0 140px;
  @media screen and (max-width: 1158px) {
    padding: 80px 16px 120px;
  }
  & p {
    color: $blue-2;
    font-size: 38px;
    font-weight: 600;
    margin-bottom: 20px;
    @media screen and (max-width: 768px) {
      font-size: 24px;
    }
    & span {
      color: $blue-3;
      font-weight: 600;
    }
  }
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
.relative {
  position: relative;
}
</style>
