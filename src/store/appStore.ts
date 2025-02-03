import { writable } from 'svelte/store'
import type { IAppState, INewsAPIResponse } from '../interfaces/appInterfaces'
import { transformResponseData } from '../utils/helper'
import { newsItemsPerSlide } from '../utils/constants'

const initialState: IAppState = {
  news: [],
  loading: false,
  error: null,
  newsOffset: '', // tracking the news_offset for pagination
  imageModal: {
    url: '',
    isOpen: false,
  },
}

// creating a store to read/write app data at one place
const appStore = writable<IAppState>(initialState)

// fn to make get news API call
export const fetchNews = async (newsOffset: string = '') => {
  // updating the store for loading state
  appStore.update((state) => ({ ...state, loading: true, error: null }))

  try {
    // Build the URL with the news_offset if it's available
    let url = `/api/news?category=top_stories&max_limit=${newsItemsPerSlide}&include_card_data=true`
    if (newsOffset) {
      url += `&news_offset=${newsOffset}`
    }

    const response = await fetch(url)
    // delay to show the preloader
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // handling success response
    if (response.ok) {
      const data: INewsAPIResponse = await response.json()

      if (data.data.news_list.length) {
        appStore.update((state) => ({
          ...state,
          news: transformResponseData(data.data.news_list),
          // news: newsOffset
          //   ? [...state.news, ...transformResponseData(data.data.news_list)] // Append new items if it's not the first batch
          //   : transformResponseData(data.data.news_list), // Replace the news on the first batch
          loading: false,
          error: null,
          newsOffset: data.data.min_news_id || '', // Update the news_offset for pagination
        }))
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

export default appStore
