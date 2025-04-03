<script>
  import config from "$lib/config.svelte";
  import Settings from "$lib/desktop/apps/Settings.svelte";
  import { fade } from "svelte/transition";
</script>

<div class="w-full h-full flex justify-center lg:justify-evenly items-center flex-col lg:flex-row" in:fade>
  <div class="flex flex-col gap-4">
    <img src="/presence/idle.png" alt="" class="w-32 aspect-square" />

    <button
      class="bg-[#a298e4] text-black font-bold px-4 py-2 rounded-sm text-sm cursor-pointer"
      onclick={()=>{
        config.yay = true;
        location.reload();
      }}
      >click to enter</button
    >
  </div>

  <div class="flex flex-col gap-4 p-4">
    <h1 class="text-xl">hi there hello</h1>
    <p class="text-md">
      this site will play some music, but you can disable it below.
    </p>

    <Settings external={true} />

    <p class="text-sm text-white/50">
      ps: you will not see this page again, but you can change these options
      later!
    </p>
  </div>
</div>
