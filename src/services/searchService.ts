import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL
const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export interface PhotoObj {
  alt_description: string
  assert_type: string
  blur_hash: string
  breadcrumbs: []
  color: string
  created_at: string
  current_user_collections: string[]
  description: string
  height: number
  id: string
  liked_by_user: boolean
  likes: number
  promoted_at: null | any
  slug: string
  sponsorship: null | any
  updated_at: string
  width: number
  urls: { small: string; regular: string }
  user: { name: string; location: string }
}

export interface QueryObj {
  query: string
  per_page?: number
  page?: number
}

export const searchPhotos = async (query: QueryObj): Promise<any> => {
  if (!query) return []

  try {
    const response = await axios.get(
      `${baseUrl}/search/photos?query=${query.query}&per_page=${query.per_page ? query.per_page : 10}&page=${query.page ? query.page : 1}`,
      {
        headers: {
          Authorization: `Client-ID ${apiKey}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching photos:', error)
    throw error
  }
}
