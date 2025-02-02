import type {
  NewsArticle,
  NewsAPIRespArticle,
} from '../interfaces/appInterfaces'

// transforming the API response news articles to UI articles
export const transformResponseData = (
  data: NewsAPIRespArticle[]
): NewsArticle[] => {
  return data.map((item) => ({
    hashID: item.hash_id,
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
  array: NewsArticle[],
  size: number
): NewsArticle[][] => {
  return array.reduce<NewsArticle[][]>((acc, _, index) => {
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
