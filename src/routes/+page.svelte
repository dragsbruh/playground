<script>
  import assets from "$lib/assets";
  import MusicPlayer from "$lib/components/MusicPlayer.svelte";
</script>

<svelte:head>
  <meta property="og:title" content="dragsbruh" />
  <meta
    property="og:description"
    content="i do stuff"
  />
  <meta property="og:url" content="https://based.nya.pub" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="based" />

  <meta
    property="og:image"
    content="https://based.nya.pub/avatar.webp"
  />
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />
  <meta property="og:image:alt" content="i said i do some stuff" />
</svelte:head>

<MusicPlayer />

<div
  class="w-full h-full flex flex-col gap-4 justify-center items-center select-none cursor-pointer will-change-transform drop-shadow-[0_0_15px_#acf]"
>
  <img
    src={assets.avatar}
    alt=""
    class="w-32 aspect-square rounded-full"
    loading="lazy"
  />
  <h1 class="text-4xl mb-6 text-center">work in progress</h1>
</div>
