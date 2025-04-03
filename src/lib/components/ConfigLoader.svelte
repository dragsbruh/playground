<script>
  import config from "$lib/config.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    const stored = localStorage.getItem("config");
    if (stored) {
      Object.assign(config, JSON.parse(stored));
    }
    $effect(() => {
      // TODO: might want to remove this later
      if (localStorage.getItem("config") === null) return;
      localStorage.setItem("config", JSON.stringify(config));
    });
  });
</script>
