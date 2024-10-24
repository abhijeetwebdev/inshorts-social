<script lang="ts">
  import { navigate } from 'svelte-routing'
  import '../app.css'
</script>

<header>
  <div class="container mx-md m-auto">
    <a
      class="pointer"
      on:click={() => {
        navigate('/')
      }}
    >
      <h2 class="flex items-center pl-4 pr-4">
        <img src="/favicon.png" alt="" />
        Inshorts Social
      </h2>
    </a>
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
</style>
