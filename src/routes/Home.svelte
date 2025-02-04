<script lang="ts">
  import { onMount } from 'svelte'
  import appStore, { fetchNews } from '../store/appStore'
  import type { IAppState, INewsArticle } from '../interfaces/appInterfaces'
  import PreloaderCard from '../components/PreloaderCard.svelte'
  import Carousel from '../components/Carousel.svelte'
  import ImageModal from '../components/ImageModal.svelte'

  // data for the carousel
  let carouselItems: INewsArticle[] = []
  let appState: IAppState
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

  const fbInit = () => {
    if (appState.news.length > 0 && !isFBLoaded) {
      window.fbAsyncInit()
      isFBLoaded = true
    }
  }

  const onCurrentSlide = async (index: any) => {
    if (Number(index) >= carouselItems.length - 1) {
      await fetchNews()
      // reset FB loaded to re-init for newly loaded items
      isFBLoaded = false
      fbInit()
    }
  }
</script>

<div
  class="container mx-md m-auto p-4 pt-0 mb-8 sm:mb-16 mt-4 sm:mt-8 lg:mt-12"
>
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

<ImageModal />
