<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import Home from './routes/Home.svelte'
  import About from './routes/About.svelte'
  import Header from './components/Header.svelte'
  import Footer from './components/Footer.svelte'
  import PrivacyPolicy from './routes/PrivacyPolicy.svelte'
</script>

<Header></Header>

<Router>
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/privacy" component={PrivacyPolicy} />
</Router>

<Footer></Footer>
