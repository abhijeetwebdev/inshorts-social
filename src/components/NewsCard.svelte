<script lang="ts">
  import { fbBaseUrl } from '../constants'
  import type { NewsArticle } from '../interfaces/appInterfaces'
  export let newsArticle: NewsArticle
</script>

<div class="card mt-4">
  <div
    class="image-wrapper h-40 bg-cover bg-center rounded-t-md"
    style="background-image: url('{newsArticle.imageURL}');"
    aria-label={newsArticle.title}
  ></div>
  <div class="content-wrapper scrollable overflow-y-auto">
    <!-- <img src={news.imageURL} alt="Image: {news.title}" /> -->
    <h3 class="pt-2"><strong>{newsArticle.title}</strong></h3>
    <p class="pt-2">{newsArticle.content}</p>

    <!-- FB like and comment -->
    <div class="mt-4">
      <hr class="my-2" />
      <div
        class="fb-like"
        data-href="{fbBaseUrl}/news/{newsArticle.hashID}"
        data-width=""
        data-layout="standard"
        data-action="like"
        data-size="small"
        data-share="false"
      ></div>

      <div
        class="fb-comments"
        data-href="{fbBaseUrl}/news/{newsArticle.hashID}"
        data-width=""
        data-numposts="5"
      ></div>
    </div>
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

  hr {
    margin: 1rem auto;
  }

  .image-wrapper {
    height: 300px;
    width: 40%;
    border-radius: 0.5rem;
  }

  .content-wrapper {
    /* min-height: 300px; */
    height: 300px;
    overflow-y: auto;
    width: 60%;
    padding: 0 0 0 1rem;
  }
</style>
