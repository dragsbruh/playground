<script lang="ts">
  import socials from "$lib/socials";
  import { LoaderPinwheel } from "@lucide/svelte";
  import { onMount } from "svelte";
  import { z } from "zod";

  const activityType = {
    0: "Playing",
    1: "Streaming",
    2: "Listening to",
    3: "Watching",
    4: "Custom Status",
    5: "Competing",
  } as { [key: number]: string };

  const activitySchema = z
    .object({
      name: z.string(),
      type: z.number().int().min(0).max(5),
      state: z.string().optional(),
      details: z.string().optional(),
      application_id: z.string().optional(),
      assets: z
        .object({
          large_image: z.string().optional(),
          large_text: z.string().optional(),
          small_image: z.string().optional(),
          small_text: z.string().optional(),
        })
        .optional(),
      timestamps: z
        .object({
          start: z.number().optional(),
        })
        .optional(),
    })
    .transform((o) => ({
      ...o,
      assets: o.assets
        ? {
            ...o.assets,
            large_image: o.assets.large_image
              ? `https://cdn.discordapp.com/app-assets/${o.application_id}/${o.assets.large_image}.png`
              : undefined,
            small_image: o.assets.small_image
              ? `https://cdn.discordapp.com/app-assets/${o.application_id}/${o.assets.small_image}.png`
              : undefined,
          }
        : undefined,
    }));

  const presenceSchema = z.object({
    success: z.literal(true),
    data: z.object({
      discord_status: z.enum(["online", "idle", "dnd", "offline"]),
      discord_user: z.object({
        username: z.string(),
        avatar: z
          .string()
          .transform(
            (s) =>
              `https://cdn.discordapp.com/avatars/${socials.discordId}/${s}.png`
          ),
        avatar_decoration_data: z.object({
          asset: z
            .string()
            .transform(
              (s) =>
                `https://cdn.discordapp.com/avatar-decorations/${socials.discordId}/${s}.png`
            ),
        }),
      }),
      activities: z.array(activitySchema),
    }),
  });

  let presence: z.infer<typeof presenceSchema> | null = $state(null);
  let currentActivity: z.infer<typeof activitySchema> | null = $state(null);

  async function updatePresence() {
    const response = await fetch(
      `https://api.lanyard.rest/v1/users/${socials.discordId}`
    );
    presence = presenceSchema.parse(await response.json());
    currentActivity =
      presence.data.activities.find((a) => a.type !== 4) ?? null;
  }

  const presenceStatusColor = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  };

  onMount(() => {
    updatePresence();
    const interval = setInterval(updatePresence, 1000 * 10);
    return () => clearInterval(interval);
  });
</script>

<div class="flex gap-2 p-4 border border-white/15">
  {#if presence !== null}
    <div class="relative">
      <img
        src={currentActivity === null
          ? "/presence/idle.png"
          : (currentActivity.assets?.large_image ??
            currentActivity.assets?.small_image ??
            "/presence/idle.png")}
        alt=""
        class="w-20 aspect-square object-cover rounded-md select-none {currentActivity !==
        null
          ? 'presence-image'
          : ''}"
      />
      <span
        class="absolute flex size-3 {currentActivity !== null
          ? '-top-1 -right-1'
          : 'top-0 right-0'}"
      >
        <span
          class="absolute inline-flex h-full w-full animate-ping rounded-full {presenceStatusColor[
            presence.data.discord_status
          ]} opacity-75"
        ></span>
        <span
          class="relative inline-flex size-3 rounded-full {presenceStatusColor[
            presence.data.discord_status
          ]}"
        ></span>
      </span>
    </div>

    <div class="flex flex-col justify-center">
      {#if presence.data.discord_status !== "offline"}
        {#if currentActivity !== null}
          <p class="text-md">
            {activityType[currentActivity.type].toLowerCase()}
            <span class="text-[#a298e4]">
              {currentActivity.name.toLowerCase()}
            </span>
          </p>
          <p class="text-sm text-white/40">
            {currentActivity.details?.toLowerCase() ??
              currentActivity.state?.toLowerCase() ??
              "playing"}
          </p>
        {:else}
          <p class="text-md">
            currently
            <span class="text-md text-[#a298e4]">idling</span>
          </p>
          <p class="text-sm">feel free to hit me up</p>
        {/if}
      {:else}
        <p class="text-md">
          im
          <span class="text-md text-red-500">offline</span>
        </p>
        <p class="text-sm text-white/80">thats how it is</p>
      {/if}
    </div>
  {:else}
    <div class="flex w-full items-center justify-center">
      <LoaderPinwheel class="animate-spin" />
    </div>
  {/if}
</div>
