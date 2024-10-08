<script setup lang="ts">
import SearchBar from "../components/SearchBar.vue";
import PhotoGrid from "../components/PhotoGrid.vue";
import PhotoModal from "../components/PhotoModal.vue";
import { usePhotosStore } from "@/stores/photos";

const photosStore = usePhotosStore();
</script>
<template>
  <main>
    <SearchBar />
    <PhotoGrid />
    <PhotoModal v-if="photosStore.showModal" />
  </main>
</template>
