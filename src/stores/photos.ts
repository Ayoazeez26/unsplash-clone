import { ref } from 'vue'
import { defineStore } from 'pinia'
import { searchPhotos, type PhotoObj } from '@/services/searchService'

export const usePhotosStore = defineStore('photos', () => {
  const photos = ref<PhotoObj[]>([])
  const singlePhoto = ref<PhotoObj | null>(null);
  const isLoading = ref(false);
  const showModal = ref(true);
  const photoSearch = async (query: string) => {
    isLoading.value = true;
    try {
      photos.value = await searchPhotos(query);
      isLoading.value = false;
      return photos.value;
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  }

  return { photos, photoSearch, isLoading, singlePhoto, showModal }
})
