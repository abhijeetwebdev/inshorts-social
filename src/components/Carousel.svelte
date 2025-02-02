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
    // Reset the timer whenever `interval` or `items` change
    if (timer) clearInterval(timer)
    timer = setInterval(() => {
      goToNext()
    }, interval)
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

  <div class="carousel-controls">
    <button
      disabled={currentIndex === 0}
      class="carousel-button"
      on:click={goToPrev}>&nbsp;❮&nbsp;</button
    >
    <!-- <button
      disabled={currentIndex === newsItemsPerSlide - 1}
      class="carousel-button"
      on:click={goToNext}>&nbsp;❯&nbsp;</button
    > -->
    <button class="carousel-button" on:click={goToNext}>&nbsp;❯&nbsp;</button>
  </div>
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
    position: fixed;
    top: 50%;
    left: 2.5rem;
    right: 2.5rem;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    z-index: 1;
  }

  .carousel-button {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    cursor: pointer;
    padding: 1rem;
    font-size: 1.2rem;
    border-radius: 0.2rem;
  }

  .active {
    background-color: black;
  }

  button:disabled {
    visibility: hidden;
  }
</style>
