<script lang="ts">
  import { onMount } from 'svelte'
  import appStore, { fetchNews } from '../store/appStore'
  import type { AppState, NewsArticle } from '../interfaces/appInterfaces'
  import PreloaderCard from '../components/PreloaderCard.svelte'
  import NewsCard from '../components/NewsCard.svelte'
  import { chunkArray } from '../utils/helper'
  import { Link } from 'svelte-routing'

  let appState: AppState
  let groupedNews: NewsArticle[][] = []

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
      if (appState.news.length > 0) {
        // grouping the news articles for the masonry tiles UI
        groupedNews = chunkArray(appState.news, 3)
      }
    })
  }
</script>

<div class="container mx-md m-auto p-5">
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    {#if appState.loading}
      {#each Array(20) as _}
        <div class="grid gap-4">
          <PreloaderCard></PreloaderCard>
        </div>
      {/each}
    {:else}
      <!-- <div class="flex flex-wrap gap-4">
      {#each news as item, index}
        <NewsCard bind:news={item}></NewsCard>
      {/each}
    </div> -->
      {#each groupedNews as group}
        <div class="grid gap-4">
          {#each group as item}
            <div class="card-wrapper">
              <Link to="/news/{item.hash_id}">
                <NewsCard bind:news={item}></NewsCard>
              </Link>
            </div>
          {/each}
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .card-wrapper {
    transition: transform 0.2s;
  }

  .card-wrapper:hover {
    transform: scale(1.02);
  }
</style>
