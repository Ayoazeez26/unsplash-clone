import { ref } from 'vue'
import { defineStore } from 'pinia'
import { searchPhotos, type PhotoObj, type QueryObj } from '@/services/searchService'

export const usePhotosStore = defineStore('photos', () => {
  const photos = ref<PhotoObj[] | []>([])
  const singlePhoto = ref<PhotoObj | null>(null)
  const isLoading = ref(false)
  const showModal = ref(true)
  const page = ref(1)
  const totalPages = ref(0)
  const photoSearch = async (query: QueryObj) => {
    isLoading.value = true
    try {
      const photosData = await searchPhotos(query)
      if (page.value !== 1) {
        photos.value = [...photos.value, ...photosData.results]
      } else {
        photos.value = photosData.results
      }
      isLoading.value = false
      totalPages.value = photosData.total_pages
    } catch (error) {
      console.error('Error fetching photos:', error)
    }
  }

  return { photos, photoSearch, isLoading, singlePhoto, showModal, totalPages, page }
})
