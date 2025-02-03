import { get, writable } from 'svelte/store'
import type { IAppState, INewsAPIResponse } from '../interfaces/appInterfaces'
import {
  getLocalStorageItem,
  setLocalStorageItem,
  transformResponseData,
} from '../utils/helper'
import { newsItemsPerSlide, viewedNewsIdStorageName } from '../utils/constants'

// Initializing the app store to manage app data
const initialState: IAppState = {
  news: [],
  loading: false,
  error: null,
  imageModal: {
    url: '',
    isOpen: false,
  },
  viewedNewsId: getLocalStorageItem(viewedNewsIdStorageName),
}
// creating a store to read/write app data at one place
const appStore = writable<IAppState>(initialState)

// fn to make get news API call
export const fetchNews = async () => {
  // updating the store for loading state
  appStore.update((state) => ({ ...state, loading: true, error: null }))
  // getting the latest available offset
  let newsOffset = get(appStore).viewedNewsId

  try {
    // Build the URL with the news_offset if it's available
    let url = `/api/news?category=top_stories&max_limit=${newsItemsPerSlide}&include_card_data=true`
    url += newsOffset ? `&news_offset=${newsOffset}` : ''

    const response = await fetch(url)
    // delay to show the preloader
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // handling success response
    if (response.ok) {
      const data: INewsAPIResponse = await response.json()

      if (data.data.news_list.length) {
        appStore.update((state) => {
          // update the pagination offset to app state and local storage
          let newsId = data.data.min_news_id
          return {
            ...state,
            news: transformResponseData(data.data.news_list),
            viewedNewsId: newsId,
            loading: false,
            error: null,
          }
        })
      } else {
        appStore.update((state) => ({
          ...state,
          loading: false,
          error: '[API] Something went wrong!',
        }))
      }
    }
  } catch (error) {
    appStore.update((state) => ({
      ...state,
      loading: false,
      error: '[API] Get news call failed!',
    }))
  }
}

// Image modal events and data handling
export const openImageModal = async (url: string = '') => {
  appStore.update((state) => ({
    ...state,
    imageModal: {
      url: url,
      isOpen: true,
    },
  }))
}

export const closeImageModal = async () => {
  appStore.update((state) => ({
    ...state,
    imageModal: {
      url: '',
      isOpen: false,
    },
  }))
}

export const updateViewedNewsId = (newsId: string) => {
  appStore.update((state) => ({
    ...state,
    viewedNewsId: newsId,
  }))

  // saving the latest pagination state to local storage
  setLocalStorageItem(viewedNewsIdStorageName, newsId)
}

export default appStore
