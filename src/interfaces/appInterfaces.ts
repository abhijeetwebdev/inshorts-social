export interface IAppState {
  news: INewsArticle[]
  loading: boolean
  error: string | null
  newsOffset: string
  imageModal: IImageModal
}

export interface IImageModal {
  url: string
  isOpen: Boolean
}

export interface INewsAPIResponse {
  data: {
    min_news_id: string
    news_list: INewsAPIRespArticle[]
  }
  error: boolean
}

export interface INewsAPIRespArticle {
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

export interface INewsArticle {
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

export interface INewsParams {
  id: string
}
