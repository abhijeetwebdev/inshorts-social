<script lang="ts">
  import { onMount } from 'svelte'
  import { navigate } from 'svelte-routing'
  import NewsCard from '../components/NewsCard.svelte'
  import type {
    AppState,
    NewsArticle,
    NewsParams,
  } from '../interfaces/appInterfaces'
  import appStore from '../store/appStore'

  export let params: NewsParams
  let appState: AppState
  let newsArticle: NewsArticle | null

  onMount(() => {
    window.fbAsyncInit()
  })

  $: {
    appStore.subscribe((value) => {
      appState = value

      if (appState.news.length > 0) {
        // find the news by hashID
        newsArticle =
          appState.news.find((item) => item.hashID === params.id) || null
        if (!newsArticle) navigate('/')
      } else {
        navigate('/')
      }
    })
  }
</script>

<div class="container mx-md m-auto">
  <div class="grid mb-16">
    {#if newsArticle}
      <NewsCard {newsArticle}></NewsCard>
    {/if}
  </div>
</div>
