declare global {
  interface Window {
    FB: {
      init: (options: {
        appId: string
        cookie: boolean
        xfbml: boolean
        version: string
      }) => void
      login: (callback: (response: any) => void, options?: any) => void
      api: (path: string, callback: (response: any) => void) => void
    }
    fbAsyncInit: () => void
  }
}

export {}
