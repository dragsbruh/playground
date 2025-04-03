<script lang="ts">
  import Desktop from "$lib/desktop/Desktop.svelte";
</script>

{#snippet link(href: string, text: string)}
  <a {href} target="_blank" class="text-[#a298e4] underline">{text}</a>
{/snippet}

<div class="w-full h-full flex justify-center">
  <div class="w-full h-full md:max-w-3/4 py-4">
    <h1
      class="group text-md border-b-1 border-white/20 transition-all cursor-pointer select-none"
    >
      <span class="group-hover:hidden">things&nbsp;</span>i did<span
        class="hidden group-hover:inline-block">&nbsp;a thing</span
      >
    </h1>

    <!-- desktop -->
    <div class="flex flex-col gap-4 py-4">
      <p class="text-xl">
        <span class="text-white/70">#</span> "desktop"
      </p>
      <p class="text-sm text-white/80">
        its a "desktop" with some "apps". i plan to add other interesting things
        here, like a fluid simulation and many other interesting things and
        tools. its not a separate project but part of my {@render link(
          "https://github.com/dragsbruh/playground",
          "playground"
        )}
      </p>
      <Desktop />
    </div>

    <!-- dune -->
    <div class="flex flex-col gap-4 py-4">
      <p class="text-xl">
        <span class="text-white/70">#</span> dune
      </p>
      <p class="text-sm text-white/80">
        i made it to handle rate limits for groq, i dont need it but {@render link(
          "https://github.com/dragsbruh/dune",
          "here"
        )} it is
      </p>
    </div>

    <!-- lcase -->
    <div class="flex flex-col gap-4 py-4">
      <p class="text-xl">
        <span class="text-white/70">#</span> lcase
      </p>
      <p class="text-sm text-white/80">
        a really simple tool to lowercase files, experimented with goreleaser. ({@render link(
          "https://github.com/dragsbruh/lcase",
          "github repo"
        )})
      </p>
    </div>

    <!-- hiive -->
    <div class="flex flex-col gap-4 py-4">
      <p class="text-xl">
        <span class="text-white/70">#</span> hiive
      </p>
      <p class="text-sm text-white/80">
        (not public yet) i made this because render.com doesnt allow multiple
        projects to run 24x7. it "combines" mini-services i make into one web
        service. although it limits on how much system resources each
        mini-service can use, it works great for projects that do not consume
        much ram and cpu. written in deno.
      </p>
    </div>
  </div>
</div>
