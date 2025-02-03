<script lang="ts">
  import { onDestroy } from 'svelte'
  import NewsCard from './NewsCard.svelte'
  import { createEventDispatcher } from 'svelte'
  import type { NewsArticle } from '../interfaces/appInterfaces'
  import { newsItemsPerSlide, newsSliderInterval } from '../utils/constants'

  export let items: NewsArticle[] = []
  export let interval = newsSliderInterval

  let currentIndex = 0
  let timer: ReturnType<typeof setInterval>

  const dispatch = createEventDispatcher()

  // Custom events for next and prev clicks
  const goToNext = () => {
    commonActions()
    currentIndex = (currentIndex + 1) % items.length
    dispatch('nextClicked', currentIndex) // Emit custom event
  }

  const goToPrev = () => {
    commonActions()
    currentIndex = (currentIndex - 1 + items.length) % items.length
    dispatch('prevClicked', currentIndex) // Emit custom event
  }

  const goToIndex = (index: number) => {
    commonActions()
    currentIndex = index
    dispatch('indexChanged', currentIndex) // Emit event when the slide changes
  }

  const commonActions = () => {
    resetInterval()
    dispatch('currentSlide', currentIndex)
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
