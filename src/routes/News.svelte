<script lang="ts">
  interface NewsParams {
    id: string
  }

  export let params: NewsParams
</script>

<h1>News Item</h1>
<p>News ID: {params.id}</p>
