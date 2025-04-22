<script lang="ts">
    import { onMount } from "svelte";

    const validKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a",
        "Enter",
    ] as const;

    type KonamiCodeWord = {
        key: (typeof validKeys)[number];
        pressed: boolean;
    };
    const renderCode: Record<(typeof validKeys)[number], string> = {
        ArrowUp: "↑",
        ArrowDown: "↓",
        ArrowLeft: "←",
        ArrowRight: "→",
        b: "B",
        a: "A",
        Enter: "⏎",
    };
    const konamiCode: KonamiCodeWord[] = $state([
        { key: "ArrowUp", pressed: false },
        { key: "ArrowUp", pressed: false },
        { key: "ArrowDown", pressed: false },
        { key: "ArrowDown", pressed: false },
        { key: "ArrowLeft", pressed: false },
        { key: "ArrowRight", pressed: false },
        { key: "ArrowLeft", pressed: false },
        { key: "ArrowRight", pressed: false },
        { key: "b", pressed: false },
        { key: "a", pressed: false },
        { key: "Enter", pressed: false },
    ]);

    let video: HTMLVideoElement;
    let hasLoadedVideo = false;
    let currentCodeIndex = 0;

    function handleKeyDown(event: KeyboardEvent) {
        if (validKeys.includes(event.key as (typeof validKeys)[number])) {
            if (!hasLoadedVideo) {
                video.load();
                hasLoadedVideo = true;
            }

            event.preventDefault();

            if (konamiCode[currentCodeIndex].key !== event.key) {
                konamiCode.forEach((k) => (k.pressed = false));
                currentCodeIndex = 0;
                return;
            }

            konamiCode[currentCodeIndex].pressed = true;
            currentCodeIndex++;

            if (currentCodeIndex === konamiCode.length) {
                currentCodeIndex = 0;
                konamiCode.forEach((k) => (k.pressed = false));

                video.play();
                video.requestFullscreen();
            }
        }
    }

    onMount(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });
</script>

<video
    src="/rick.webm"
    class="z-hidden"
    bind:this={video}
    preload="none"
>
    <track kind="captions" />
</video>

<div class="flex items-center gap-4 select-none">
    {#each konamiCode as { key, pressed }, i}
        <p
            class="text-[0.5em] transition-all {pressed
                ? 'text-primary font-bold scale-120'
                : 'text-muted'}"
        >
            {renderCode[key]}
        </p>
    {/each}
</div>

<style lang="postcss">
    @reference "tailwindcss";

    .z-hidden {
        @apply -z-1 w-1 h-1;
    }
</style>
