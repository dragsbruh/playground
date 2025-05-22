<!-- presence updates are managed here, since status bar is always visible, unlike the profile sidebar -->

<script lang="ts">
  import { onMount } from "svelte";
  import { getStatusColor, presence, updatePresence } from "../stores/discord";

  let now: Date = $state(new Date());
  let statusColor: string | null = $state(null);

  onMount(() => {
    const interval = setInterval(() => (now = new Date()), 1000);

    presence.subscribe((presence) => {
      if (!presence) return;
      statusColor = getStatusColor(presence.data.discord_status);
    });

    updatePresence();
    const presenceInterval = setInterval(() => {
      updatePresence();
    }, 10_000);

    return () => {
      clearInterval(interval);
      clearInterval(presenceInterval);
    };
  });
</script>

<div
  class="h-10 bg-surface-alt flex items-center justify-center gap-4 text-sm border-b border-border"
>
  {#if statusColor}
    <div class="relative flex size-2">
      <span
        class="absolute inline-flex h-full w-full animate-ping {statusColor} opacity-75"
      ></span>
      <span class="relative inline-flex h-full w-full {statusColor}"></span>
    </div>
  {/if}
  <span>{now.toLocaleDateString()} • {now.toLocaleTimeString()}</span>
</div>
