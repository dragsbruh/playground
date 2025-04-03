<script lang="ts">
  import type { DesktopApp } from "$lib/apps";
  import { fade } from "svelte/transition";

  const {
    changeApp,
    apps,
  }: {
    changeApp: (target: DesktopApp) => void;
    apps: { [key: string]: DesktopApp };
  } = $props();

  const appsArray = $derived(Object.values(apps));
</script>

<div
  class="w-full grid py-4 grid-cols-3 md:grid-cols-6"
  in:fade={{ duration: 100 }}
>
  <!-- svelte-ignore a11y_consider_explicit_label -->
  {#each appsArray as app}
    {#if app.hidden !== true}
      <button onclick={() => changeApp(app)}>
        <div
          class="flex justify-center select-none items-center flex-col hover:rounded-md hover:scale-105 cursor-pointer transition-all"
        >
          <img
            src={app.icon}
            alt=""
            class="w-12 aspect-square bg-white/10 p-2 rounded-sm"
          />
          <p class="text-sm text-center">{app.name}</p>
        </div>
      </button>
    {/if}
  {/each}
</div>
