<script lang="ts">
  import config from "$lib/config.svelte";
  import { audios, type Audio } from "$lib/media";
  import {
    LoaderPinwheel,
    Pause,
    Play,
    Volume1,
    Volume2,
    VolumeOff,
    SkipForward,
  } from "@lucide/svelte";
  import { onMount } from "svelte";

  let audioPlayer: HTMLAudioElement;

  let playerState = $state({
    started: false,
    paused: true,
    volume: 1,

    current: {} as Audio,
  });

  async function playAudio() {
    if (config.noMusic) {
      audioPlayer.pause();
      return;
    }
    try {
      await audioPlayer.play();
      document.removeEventListener("click", playAudio);
      playerState.started = true;
      playerState.paused = false;
    } catch (err) {
      console.log(err);
      audioPlayer.load();
    }
  }

  function nextAudio(play = true) {
    playerState.current = audios[Math.floor(Math.random() * audios.length)];
    audioPlayer.src = playerState.current.source;
    if (play) playAudio();
  }

  onMount(() => {
    playerState.volume = (() => {
      const state = localStorage.getItem("volume");
      if (state) return JSON.parse(state);
      return playerState.volume;
    })();
    
    audioPlayer.volume = playerState.volume;
    
    $effect(() => {
      localStorage.setItem("volume", JSON.stringify(playerState.volume));
    });
    
    nextAudio(true);

    $effect(() => {
      audioPlayer.volume = Math.min(1, Math.max(0, playerState.volume));
      playerState.paused || config.noMusic
        ? audioPlayer.pause()
        : audioPlayer.play();
    });

    navigator.mediaSession.setActionHandler("nexttrack", () => {
      nextAudio(true);
    });
    navigator.mediaSession.setActionHandler(
      "play",
      () => (playerState.paused = false)
    );
    navigator.mediaSession.setActionHandler(
      "pause",
      () => (playerState.paused = true)
    );
    navigator.mediaSession.setActionHandler(
      "stop",
      () => (playerState.paused = true)
    );
  });
</script>

<audio bind:this={audioPlayer} onended={() => nextAudio(true)}></audio>

<div class="flex w-full p-4 border border-white/15">
  {#if playerState.current.name === undefined}
    <div class="w-full flex justify-center items-center">
      <LoaderPinwheel class="animate-spin" />
    </div>
  {:else if !playerState.started || config.noMusic}
    <div class="w-full flex justify-center">
      <button
        class="bg-[#a298e4] text-black px-4 py-2 rounded-sm text-sm cursor-pointer disabled:bg-white/20"
        onclick={playAudio}
        disabled={config.noMusic}
      >
        {config.noMusic ? "you disabled music :(" : "start music player"}
      </button>
    </div>
  {:else}
    <div class="flex gap-2">
      <img src="/covers/{playerState.current.cover}" alt="" class="w-20 h-20" />
      <div class="flex flex-col justify-between">
        <h1 class="text-md">
          now playing <a
            href={playerState.current.attribution}
            class="text-[#a298e4] underline"
            target="_blank">{playerState.current.name.toLowerCase()}</a
          >
        </h1>
        <div class="flex gap-3 items-center">
          <button
            class="cursor-pointer"
            onclick={() => {
              playerState.paused = !playerState.paused;
            }}
          >
            {#if playerState.paused}
              <Play />
            {:else}
              <Pause />
            {/if}
          </button>
          <button class="cursor-pointer" onclick={() => nextAudio(true)}>
            <SkipForward />
          </button>
          <div class="flex group gap-2">
            <button
              class="cursor-pointer"
              onclick={() => {
                playerState.volume = playerState.volume > 0 ? 0 : 1;
              }}
            >
              {#if playerState.volume === 1}
                <Volume2 />
              {:else if playerState.volume > 0}
                <Volume1 />
              {:else}
                <VolumeOff />
              {/if}
            </button>
            <input
              type="range"
              class="hidden lg:group-hover:block"
              bind:value={playerState.volume}
              max="1"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
