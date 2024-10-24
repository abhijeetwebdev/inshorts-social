export interface AppState {
  news: NewsArticle[]
  loading: boolean
  error: string | null
}

export interface NewsAPIResponse {
  data: {
    min_news_id: string
    news_list: NewsAPIRespArticle[]
  }
  error: boolean
}

export interface NewsAPIRespArticle {
  hash_id: string
  news_type: string
  news_obj: {
    title: string
    author_name: string
    content: string
    source_url: string
    source_name: string
    image_url: string
    category_names: string[]
  }
}

export interface NewsArticle {
  hash_id: string
  title: string
  author_name: string
  content: string
  source_url: string
  source_name: string
  image_url: string
  category_names: string[]
}
