<script lang="ts">
  import { onMount } from "svelte";
  import images from "../assets/images.json";

  let image = $state("");

  const updateImage = () =>
    (image = `https://catbox.moe/pictures/qts/${images[Math.floor(Math.random() * images.length)]}`);

  onMount(() => {
    updateImage();
  });
</script>

<div class="relative">
  <button
    onclick={updateImage}
    ondblclick={() => window.open("https://catbox.moe")}
    title="this image is from my beloved catbox.moe"
    class="absolute bottom-0 right-0 z-50 transition-all cursor-pointer"
  >
    <img src={image} alt="" class="max-w-full max-h-full" />
  </button>
</div>
