<script>
  import config from "$lib/config.svelte";
  import { onMount } from "svelte";

  onMount(()=>{
    const stored = localStorage.getItem("config");
    if (stored) {
      Object.assign(config, JSON.parse(stored));
    }
    $effect(()=>{
      localStorage.setItem("config", JSON.stringify(config));
    })
  })
</script>