<script lang="ts">
  import { onMount } from "svelte";
  import { discord_server } from "../stores/discord";

  const links = $state([
    {
      title: "github",
      href: "https://github.com/dragsbruh",
      external: true,
    },
    {
      title: "bluesky",
      href: "https://bsky.app/profile/dragsbruh.bsky.social",
      external: true,
    },
    {
      title: "discord",
      href: discord_server,
      external: true,
    },
  ]);

  onMount(() => {
    const alt =
      window.location.hostname === "based.nya.pub"
        ? "based.is-a.dev"
        : "based.nya.pub";

    links.push({
      title: alt,
      href: `https://${alt}`,
      external: false,
    });
  });
</script>

<div class="flex xl:flex-col xl:px-4 pb-4 xl:pb-0 gap-4 xl:gap-2 mt-4">
  {#each links as link}
    <a
      href={link.href}
      class="group text-md font-bold underline hover:transform hover:translate-y-1 xl:hover:translate-y-0 xl:hover:-translate-x-2 transition-all text-muted hover:text-white text-right"
      target={link.external ? "_blank" : ""}
      rel={link.external ? "noreferrer" : ""}
    >
      <span class="hidden xl:group-hover:inline-block"> :3 </span>
      <span>
        {link.title}
      </span>
    </a>
  {/each}
</div>
