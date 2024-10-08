import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL
const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export interface PhotoObj {
  id: string
  urls: { small: string, regular: string }
  alt_descriptoin: string | null
  user: { name: string, location: string }
}

export const searchPhotos = async (query: string): Promise<PhotoObj[]> => {
  if (!query) return []

  try {
    const response = await axios.get(`${baseUrl}/search/photos?query=${query}`, {
      headers: {
        Authorization: `Client-ID ${apiKey}`
      }
    })
    return response.data.results
  } catch (error) {
    console.error('Error fetching photos:', error)
    throw error
  }
}
