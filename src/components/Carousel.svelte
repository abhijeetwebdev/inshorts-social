<script lang="ts">
  import { onDestroy } from 'svelte'
  import NewsCard from './NewsCard.svelte'
  import { createEventDispatcher } from 'svelte'
  import type { INewsArticle } from '../interfaces/appInterfaces'
  import { newsSliderInterval } from '../utils/constants'
  import * as appStore from '../store/appStore'

  export let items: INewsArticle[] = []
  export let interval = newsSliderInterval

  let currentIndex = 0
  let timer: ReturnType<typeof setInterval>
  const dispatch = createEventDispatcher()

  // Custom events for next and prev clicks
  const goToNext = () => {
    resetInterval()
    currentIndex = (currentIndex + 1) % items.length
    dispatch('nextClicked', currentIndex) // Emit custom event
    updateViewedNewsId()
  }

  const goToPrev = () => {
    resetInterval()
    currentIndex = (currentIndex - 1 + items.length) % items.length
    dispatch('prevClicked', currentIndex) // Emit custom event
    updateViewedNewsId()
  }

  const updateViewedNewsId = () => {
    if (items.length > 0) {
      let article = items[currentIndex - 1]
      if (article) {
        appStore.updateViewedNewsId(article.newsId)
      }
    }
  }

  const goToIndex = (index: number) => {
    resetInterval()
    currentIndex = index
    dispatch('indexChanged', currentIndex) // Emit event when the slide changes
  }

  // Auto slide functionality
  onDestroy(() => {
    if (timer) clearInterval(timer)
  })

  // Set up the interval for automatic slide change
  $: {
    if (items.length > 0) {
      resetInterval()
    }
  }

  function resetInterval() {
    dispatch('currentSlide', currentIndex)
    if (interval) {
      // Reset the timer whenever `interval` or `items` change
      if (timer) clearInterval(timer)
      timer = setInterval(() => {
        goToNext()
      }, interval)
    }
  }
</script>

<div class="carousel-container">
  <div
    class="carousel-items"
    style="transform: translateX(-{currentIndex * 100}%)"
  >
    {#each items as item, index}
      <div class="carousel-item">
        <NewsCard newsArticle={item}></NewsCard>
      </div>
    {/each}
  </div>

  <button
    disabled={currentIndex === 0}
    class="carousel-controls carousel-button-left"
    on:click={goToPrev}>&nbsp;❮&nbsp;</button
  >
  <button class="carousel-controls carousel-button-right" on:click={goToNext}
    >&nbsp;❯&nbsp;</button
  >
</div>

<style>
  .carousel-container {
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  .carousel-items {
    display: flex;
    transition: transform 0.3s ease-in-out;
  }

  .carousel-item {
    min-width: 100%;
    box-sizing: border-box;
  }

  .carousel-controls {
    top: 50vh;
    z-index: 1;
    position: fixed;
    transform: translateY(-50%);
  }

  .carousel-button-right,
  .carousel-button-left {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    font-size: 1.2rem;
    border-radius: 0.5rem;
  }

  .carousel-button-right {
    right: 2.5rem;
  }

  .carousel-button-left {
    left: 2.5rem;
  }

  .active {
    background-color: black;
  }

  button:disabled {
    visibility: hidden;
  }
</style>
