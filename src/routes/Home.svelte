<script lang="ts">
  import { onMount } from 'svelte'
  import appStore, { fetchNews } from '../store/appStore'
  import type { AppState } from '../interfaces/appInterfaces'

  let appState: AppState

  onMount(() => {
    // loading news when component is ready
    fetchNews()
  })

  // reactive vars
  $: {
    // reading the app state updates
    appStore.subscribe((value) => {
      appState = value
      console.log('appState: ', appState?.news)
    })
  }
</script>

{#if appState.loading}
  <p>Loading...</p>
{:else if appState.error}
  <p>Error: {appState.error}</p>
{:else if appState.news.length > 0}
  <ul>
    {#each appState.news as article}
      <li>
        <h3>{article.title}</h3>
      </li>
    {/each}
  </ul>
{:else}
  <p>No news found.</p>
{/if}
