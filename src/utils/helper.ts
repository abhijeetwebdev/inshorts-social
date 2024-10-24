import type {
  NewsArticle,
  NewsAPIRespArticle,
} from '../interfaces/appInterfaces'

// transforming the API response news articles to UI articles
export const transformResponseData = (
  data: NewsAPIRespArticle[]
): NewsArticle[] => {
  return data.map((item) => ({
    hash_id: item.hash_id,
    title: item.news_obj.title,
    author_name: item.news_obj.author_name,
    content: item.news_obj.content,
    source_url: item.news_obj.source_url,
    source_name: item.news_obj.source_name,
    image_url: item.news_obj.image_url,
    category_names: item.news_obj.category_names,
  }))
}
