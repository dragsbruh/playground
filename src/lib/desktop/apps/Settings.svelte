<script lang="ts">
  import { type Config, config } from "$lib/config.svelte";
  import { fade } from "svelte/transition";

  let { external }: { external: boolean } = $props();
</script>

{#snippet toggle(name: keyof Config)}
  <label class="relative w-12 h-6 flex items-center cursor-pointer">
    <input
      type="checkbox"
      class="sr-only peer"
      onchange={(e) => {
        config[name] = e.currentTarget.checked;
      }}
      checked={config[name]}
    />
    <div
      class="w-12 h-6 bg-gray-300 peer-checked:bg-[#a298e4] rounded-full transition"
    ></div>
    <div
      class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-6"
    ></div>
  </label>
{/snippet}

<div
  class="{external === false
    ? 'w-full h-full'
    : ''} flex flex-col justify-center items-center gap-4 select-none"
  in:fade
>
  {#each Object.keys(config) as key}
    <div class="grid grid-cols-2 gap-4 items-center">
      <p class="text-sm">{key}</p>
      {@render toggle(key as keyof Config)}
    </div>
  {/each}
</div>
