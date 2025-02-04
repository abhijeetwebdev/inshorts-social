import type {
  INewsArticle,
  INewsAPIRespArticle,
} from '../interfaces/appInterfaces'
import { viewedDate, viewedNewsIdStorageName } from './constants'

// transforming the API response news articles to UI articles
export const transformResponseData = (
  data: INewsAPIRespArticle[]
): INewsArticle[] => {
  return data.map((item) => ({
    newsId: item.hash_id,
    title: item.news_obj.title,
    authorName: item.news_obj.author_name,
    content: item.news_obj.content,
    sourceURL: item.news_obj.source_url,
    sourceName: item.news_obj.source_name,
    imageURL: item.news_obj.image_url,
    categoryNames: formattedCategories(item.news_obj.category_names),
    createdAt: formattedDate(item.news_obj.created_at),
  }))
}

// transforming array to grouped array
export const chunkArray = (
  array: INewsArticle[],
  size: number
): INewsArticle[][] => {
  return array.reduce<INewsArticle[][]>((acc, _, index) => {
    if (index % size === 0) {
      acc.push([])
    }
    acc[acc.length - 1].push(array[index])
    return acc
  }, [])
}

const formattedDate = (timestamp: number): string => {
  const localTimeString = new Date(timestamp).toLocaleString()
  return localTimeString
}

const formattedCategories = (categories: string[]): string[] => {
  return categories.map((cat) => `#${cat}`)
}

// Generic fn to set local storage item
export const setLocalStorageItem = (name: string, value: string) => {
  localStorage.setItem(name, value)
}

// Generic fn to get local storage item
export const getLocalStorageItem = (name: string): string => {
  let data = localStorage.getItem(name) || ''
  try {
    // Try to parse the input as JSON
    return JSON.parse(data)
  } catch (e) {
    // If parsing fails, return the original string
    return data
  }
}

// Function to clear localStorage if it's a new day
export const clearViewedNewsIdIfNewDay = () => {
  const lastClearDate = localStorage.getItem(viewedDate)
  const currentDate = new Date().toISOString().split('T')[0] // Get current date in YYYY-MM-DD format

  if (lastClearDate !== currentDate) {
    // It's a new day, so clear localStorage items
    localStorage.removeItem(viewedNewsIdStorageName) // Or other items you want to delete
    // Set the current date as the "last cleared date"
    localStorage.setItem(viewedDate, currentDate)
  }
}
