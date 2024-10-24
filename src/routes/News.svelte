<script lang="ts">
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

  $: {
    appStore.subscribe((value) => {
      appState = value

      if (appState.news.length > 0) {
        // find the news by hash_id
        newsArticle =
          appState.news.find((item) => item.hash_id === params.id) || null
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
      <NewsCard news={newsArticle}></NewsCard>
    {/if}
  </div>
</div>
