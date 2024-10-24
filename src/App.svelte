<script lang="ts">
  import { Router, Route, Link } from 'svelte-routing'
  import Home from './routes/Home.svelte'
  import About from './routes/About.svelte'
  import News from './routes/News.svelte'
</script>

<Router>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/news/1">News Item 1</Link>
    <Link to="/news/2">News Item 2</Link>
  </nav>
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/news/:id" let:params>
    <News params={{ id: params.id }} />
  </Route>
</Router>
