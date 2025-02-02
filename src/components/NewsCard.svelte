<script lang="ts">
  import { fbBaseUrl } from '../utils/constants'
  import type { NewsArticle } from '../interfaces/appInterfaces'
  export let newsArticle: NewsArticle
</script>

<div class="card">
  <div class="card flex flex-col md:flex-row card-wrapper">
    <div
      class="image-wrapper bg-cover bg-center bg-no-repeat rounded-t-md md:rounded-l-md"
      style="background-image: url('{newsArticle.imageURL}');"
      aria-label={newsArticle.title}
    ></div>
    <div class="content-wrapper w-full md:w-3/5 p-4">
      <h3 class="pt-2"><strong>{newsArticle.title}</strong></h3>
      <p class="pt-2 time">
        {new Date(newsArticle.createdAt).toLocaleString()}
      </p>
      <p class="pt-2">{newsArticle.content}</p>
      <p class="pt-2 categories">{newsArticle.categoryNames.join(', ')}</p>
    </div>
  </div>

  <!-- FB like and comment -->
  <div class="fb-wrapper">
    <div
      class="fb-like"
      data-href="{fbBaseUrl}/news/{newsArticle.hashID}"
      data-layout="standard"
      data-action="like"
      data-size="small"
      data-share="false"
      data-width="100%"
    ></div>

    <div
      class="fb-comments"
      data-href="{fbBaseUrl}/news/{newsArticle.hashID}"
      data-numposts="5"
      data-width="100%"
    ></div>
  </div>
</div>

<style>
  .card {
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  }

  .card-wrapper {
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .image-wrapper {
    width: 100%;
    min-height: 20rem;
    border-radius: 0.5rem 0 0 0;
  }

  .content-wrapper {
    height: auto;
    overflow-y: auto;
    width: 100%;
    padding: 1rem;
  }

  .fb-wrapper {
    /* margin-top: -1rem; */
  }

  .time {
    color: grey;
    font-style: italic;
  }

  .categories {
    color: blue;
  }
</style>
