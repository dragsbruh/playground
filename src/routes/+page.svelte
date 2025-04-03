<script lang="ts">
  import Desktop from "$lib/desktop/Desktop.svelte";
  import MusicPlayer from "$lib/components/MusicPlayer.svelte";
  import OpenGyat from "$lib/components/OpenGyat.svelte";
  import Presence from "$lib/components/Presence.svelte";
  import Profile from "$lib/components/Profile.svelte";
  import Socials from "$lib/components/Socials.svelte";
  import { configExists } from "$lib/config.svelte";
  import Lander from "$lib/components/Lander.svelte";
  import { LoaderPinwheel } from "@lucide/svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let firstTime: boolean | null = $state(null);
  onMount(() => {
    firstTime = !configExists();
  });
</script>

<OpenGyat />

{#if firstTime === null}
  <div class="w-full h-full flex justify-center items-center">
    <LoaderPinwheel class="animate-spin" />
  </div>
{:else if firstTime}
  <Lander />
{:else}
  <div class="flex w-full p-4 justify-center" in:fade>
    <div
      class="flex flex-col w-full md:max-w-3/4 gap-2 lg:max-w-none lg:grid lg:grid-cols-8"
    >
      <div class="flex flex-col gap-4 w-full lg:col-span-2">
        <Profile />
        <Socials />
      </div>
      <div class="lg:col-span-4 flex flex-col gap-4">
        <Desktop />
      </div>
      <div class="lg:col-span-2 flex flex-col gap-4">
        <Presence />
        <MusicPlayer />
      </div>
    </div>
  </div>
{/if}
