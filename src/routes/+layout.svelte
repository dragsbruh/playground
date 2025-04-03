<script lang="ts">
  import ConfigLoader from "$lib/components/ConfigLoader.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <title>dragsbruh</title>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Lexend:wght@100..900"
    rel="stylesheet"
  />
</svelte:head>

<ConfigLoader />

{@render children()}
