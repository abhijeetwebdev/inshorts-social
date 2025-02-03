import type {
  INewsArticle,
  INewsAPIRespArticle,
} from '../interfaces/appInterfaces'

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
export const getLocalStorageItem = async (name: string): Promise<string> => {
  let data = (await localStorage.getItem(name)) || ''
  try {
    // Try to parse the input as JSON
    return JSON.parse(data)
  } catch (e) {
    // If parsing fails, return the original string
    return data
  }
}
