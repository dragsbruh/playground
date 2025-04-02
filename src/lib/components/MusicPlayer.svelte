<script lang="ts">
  import assets from "$lib/assets";
  import { onMount } from "svelte";

  let currentAudio: string | null = $state(null);
  let audioPlayer: HTMLAudioElement;

  async function playAudio() {
    try {
      await audioPlayer.play();
      document.removeEventListener("click", playAudio);
    } catch {
      document.addEventListener("click", playAudio);
    }
  }

  onMount(() => {
    currentAudio = assets.wipMusic;
    playAudio();
    return () => document.removeEventListener("click", playAudio);
  });
</script>

<audio bind:this={audioPlayer} src={currentAudio}></audio>
