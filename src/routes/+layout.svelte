<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Lexend:wght@100..900"
    rel="stylesheet"
  />
</svelte:head>

{@render children()}
