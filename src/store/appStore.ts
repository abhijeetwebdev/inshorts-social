import { writable } from 'svelte/store'
import type { AppState, NewsAPIResponse } from '../interfaces/appInterfaces'
import { transformResponseData } from '../utils/helper'
// import cachedData from './data.json'

const initialState: AppState = {
  news: [],
  loading: false,
  error: null,
}

// creating a store to read/write app data at one place
const appStore = writable<AppState>(initialState)

// fn to make get news API call
export const fetchNews = async () => {
  // updating the store for loading state
  appStore.update((state) => ({ ...state, loading: true, error: null }))

  try {
    const response = await fetch(
      '/api/news?category=top_stories&max_limit=5&include_card_data=true'
    )
    if (response.ok) {
      const data: NewsAPIResponse = await response.json()
      // const data: NewsAPIResponse = cachedData

      if (data.data.news_list.length) {
        appStore.set({
          news: transformResponseData(data.data.news_list),
          loading: false,
          error: null,
        })
      } else {
        appStore.set({
          news: [],
          loading: false,
          error: '[API] Something went wrong!',
        })
      }
    }
  } catch (error) {
    appStore.set({
      news: [],
      loading: false,
      error: '[API] Get news call failed!',
    })
  }
}

export default appStore
