<script lang="ts">
  import { onMount } from "svelte";
  import gifs from "../assets/gifs.json";

  let gif = $state("");
  onMount(() => (gif = gifs[Math.floor(Math.random() * gifs.length)]));
</script>

<img alt="furina" src={gif} class="w-full" />
