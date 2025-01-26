<script lang="ts">
  import { onMount } from 'svelte'
  import appStore, { fetchNews } from '../store/appStore'
  import type { AppState, NewsArticle } from '../interfaces/appInterfaces'
  import PreloaderCard from '../components/PreloaderCard.svelte'
  import Carousel from '../components/Carousel.svelte'

  // data for the carousel
  let carouselItems: NewsArticle[] = []
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

      if (appState.news.length > 0 && !isFBLoaded) {
        window.fbAsyncInit()
        isFBLoaded = true
        // console.log('fbAsyncInit: Home')
      }
    })
  }
</script>

<div class="container mx-md m-auto p-5 pt-0 mb-16 mt-8">
  {#if appState.loading}
    <PreloaderCard></PreloaderCard>
  {:else}
    <Carousel items={carouselItems} interval={20000} />
  {/if}
</div>
