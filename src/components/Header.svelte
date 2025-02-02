<script lang="ts">
  import '../app.css'
</script>

<header>
  <div class="container mx-md m-auto">
    <a class="pointer" href="/">
      <h2 class="flex items-center">
        <img src="/favicon.png" alt="" />
        Social
      </h2>
    </a>
    |
    <a class="pointer" href="/privacy">Policy</a>
    |
    <a class="pointer" href="/about">About</a>
  </div>
</header>

<style>
  header {
    background-color: #333;
    position: sticky;
    text-align: left;
    padding: 1rem;
    color: white;
    z-index: 1;
    width: 100%;
    top: 0;
  }

  img {
    height: 1.5rem;
    padding-right: 0.5rem;
  }

  .container {
    display: flex;
  }

  a {
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>
