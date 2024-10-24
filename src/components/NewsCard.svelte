<script lang="ts">
  import type { NewsArticle } from '../interfaces/appInterfaces'
  export let news: NewsArticle
</script>

<div class="card mt-4 pointer">
  <div
    class="image-container h-40 bg-cover bg-center rounded-t-md"
    style="background-image: url('{news.image_url}');"
    aria-label={news.title}
  ></div>
  <h3 class="pt-2"><strong>{news.title}</strong></h3>
  <p class="pt-2">{news.content}</p>
</div>

<style>
  .card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    background-color: white;
  }

  .card:hover {
    transform: scale(1.02);
  }

  .pointer {
    cursor: pointer;
  }
</style>
