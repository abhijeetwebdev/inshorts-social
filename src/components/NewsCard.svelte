<script lang="ts">
  import { onMount } from 'svelte'
  import type { NewsArticle } from '../interfaces/appInterfaces'
  export let news: NewsArticle

  onMount(() => {})
</script>

<div class="card mt-4">
  <div
    class="image-wrapper h-40 bg-cover bg-center rounded-t-md"
    style="background-image: url('{news.image_url}');"
    aria-label={news.title}
  ></div>
  <div class="content-wrapper">
    <!-- <img src={news.image_url} alt="Image: {news.title}" /> -->
    <h3 class="pt-2"><strong>{news.title}</strong></h3>
    <p class="pt-2">{news.content}</p>
  </div>
</div>

<style>
  .card {
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    padding: 1rem;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: auto;
    transition: transform 0.2s;
    display: flex;
  }

  .image-wrapper {
    height: 300px;
    width: 40%;
    border-radius: 0.5rem;
  }

  .content-wrapper {
    height: 300px;
    width: 60%;
    padding: 0 0 0 1rem;
  }
</style>
