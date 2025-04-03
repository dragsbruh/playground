<script>
  import socials from "$lib/socials";
</script>

<div class="flex flex-col gap-2 p-4 border border-white/15">
  <div class="flex w-full justify-center gap-4">
    {#each socials.primary as social}
      <a
        class="px-4 py-2 flex gap-2 {social.className ?? ''} rounded-sm text-sm"
        href={social.url}
        style={social.style ?? ""}
        target="_blank"
        title={social.name}
      >
        <img src={social.icon} class="w-4" alt="" />
        {social.name}
      </a>
    {/each}
  </div>
  <div class="flex justify-center items-baseline gap-2">
    {#each socials.all as social}
      <a
        class="p-2 flex gap-2 {social.className ?? ''} rounded-sm text-sm"
        href={social.url}
        style={social.style ?? ""}
        target="_blank"
        title={social.name}
      >
        <img src={social.icon} class="w-4" alt="" />
      </a>
    {/each}
    <p class="text-sm">
      ...or just <a
        href="https://www.google.com/search?q=%22dragsbruh%22"
        class="text-[#a298e4] underline"
        target="_blank"
        title="i guess i have a unique username"
        >google me</a
      >
    </p>
  </div>
</div>
