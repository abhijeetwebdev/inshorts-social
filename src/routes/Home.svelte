<script lang="ts">
  import { onMount } from 'svelte'
  import appStore, { fetchNews } from '../store/appStore'
  import type { AppState, NewsArticle } from '../interfaces/appInterfaces'
  import PreloaderCard from '../components/PreloaderCard.svelte'
  import Carousel from '../components/Carousel.svelte'

  // data for the carousel
  let carouselItems: NewsArticle[] = []
  let activeSlideIndex = 0
  let appState: AppState
  let isFBLoaded = false

  onMount(() => {
    if (!appState.loading && appState.news.length == 0) {
      // loading news when component is ready
      fetchNews()
    }
  })

  // reactive vars
  $: {
    // reading the app state updates
    appStore.subscribe((value) => {
      appState = value

      if (appState.news) {
        carouselItems = [...appState.news]
      }

      fbInit()
    })
  }

  function fbInit() {
    if (appState.news.length > 0 && !isFBLoaded) {
      window.fbAsyncInit()
      isFBLoaded = true
    }
  }

  async function onCurrentSlide(index: any) {
    if (Number(index) >= carouselItems.length - 1) {
      await fetchNews(appState.newsOffset)
      activeSlideIndex = index
      // reset FB loaded to re-init for newly loaded items
      isFBLoaded = false
      fbInit()
    }
  }
</script>

<div class="container mx-md m-auto p-5 pt-0 mb-16 mt-8">
  {#if appState.loading}
    <PreloaderCard></PreloaderCard>
  {:else}
    <Carousel
      on:currentSlide={(e) => {
        onCurrentSlide(e.detail)
      }}
      items={carouselItems}
    />
  {/if}
</div>
