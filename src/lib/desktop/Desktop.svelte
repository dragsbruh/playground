<script lang="ts">
  import type { DesktopApp } from "$lib/apps";
  import { onMount } from "svelte";
  import Home from "./apps/Home.svelte";
  import TicTacToe from "./apps/TicTacToe.svelte";
  import { Maximize2 } from "@lucide/svelte";
  import { page } from "$app/state";
  import Settings from "./apps/Settings.svelte";

  let windowTitle: string = $state("home");
  const changeApp = (target: DesktopApp) => {
    ActiveApp = target;
  };

  const apps: { [key: string]: DesktopApp } = {
    home: {
      hidden: true,
      name: "home",
      icon: "/apps/home.svg",
      component: Home,
      props: {
        changeApp,
      },
    },
    tictactoe: {
      name: "tic tac toe",
      icon: "/apps/tictactoe.svg",
      component: TicTacToe,
    },
    settings: {
      name: "settings",
      icon: "/apps/settings.svg",
      component: Settings,
      props: {
        external: false
      }
    }
  };
  apps["home"].props["apps"] = apps;

  let ActiveApp: (typeof apps)[keyof typeof apps] = $state(apps["home"]);

  onMount(() => {
    $effect(()=>{
      windowTitle = ActiveApp.name
    })
    if (page.url.pathname === "/desktop") {
      $effect(() => {
        document.title = `desktop - ${windowTitle}`;
      });
    }
  });
</script>

<div
  class="relative {page.url.pathname !== '/desktop'
    ? 'h-[50vh] lg:h-[60vh]'
    : 'h-full'} border border-white/15"
>
  {#if page.url.pathname !== "/desktop"}
    <div
      class="w-full flex justify-between items-center px-2 py-1 bg-white/10 text-sm"
    >
      <p>{windowTitle}</p>
      <a href="/desktop">
        <Maximize2 size="16" />
      </a>
    </div>
  {/if}
  <div
    class="w-full h-full overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-[#a298e4] scrollbar-track-black/50"
  >
    <ActiveApp.component {...ActiveApp.props} />
  </div>
  <div class="absolute bottom-0 w-full p-2 grid grid-cols-7">
    <div class="col-span-3"></div>
    <button onclick={() => changeApp(apps["home"])}>
      <div
        class="w-full select-none text-center bg-white/10 text-white/30 hover:text-white/70 cursor-pointer px-2 py-1 rounded-2xl text-sm col-span-1"
      >
        amogOS
      </div>
    </button>
    <div class="col-span-3"></div>
  </div>
</div>
