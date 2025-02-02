export interface AppState {
  news: NewsArticle[]
  loading: boolean
  error: string | null
  newsOffset: string
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
    created_at: number
  }
}

export interface NewsArticle {
  hashID: string
  title: string
  authorName: string
  content: string
  sourceURL: string
  sourceName: string
  imageURL: string
  categoryNames: string[]
  createdAt: string
}

export interface NewsParams {
  id: string
}
