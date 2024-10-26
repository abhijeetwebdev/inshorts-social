<script lang="ts">
  import { onMount } from 'svelte'
  // import { Link } from 'svelte-routing'
  import appStore, { fetchNews } from '../store/appStore'
  import type { AppState } from '../interfaces/appInterfaces'
  import PreloaderCard from '../components/PreloaderCard.svelte'
  import NewsCard from '../components/NewsCard.svelte'

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

      if (appState.news.length > 0 && !isFBLoaded) {
        // window.fbAsyncInit()
        // isFBLoaded = true
      }
    })
  }
</script>

<div class="container mx-md m-auto p-5 pt-0 mb-16">
  {#if appState.loading}
    {#each Array(20) as _}
      <PreloaderCard></PreloaderCard>
    {/each}
  {:else}
    {#each appState.news as newsArticle}
      <!-- <Link to="/news/{newsArticle.hashID}"> -->
      <NewsCard bind:newsArticle></NewsCard>
      <!-- </Link> -->
    {/each}
  {/if}
</div>
