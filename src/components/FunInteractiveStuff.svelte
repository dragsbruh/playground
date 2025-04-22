<script lang="ts">
    import { onMount } from "svelte";
    import Lenis from "lenis";

    let lenis: Lenis;
    let mousething: HTMLDivElement;
    let hasAnimated = false;

    function handleMouseMove(event: MouseEvent) {
        const { clientX, clientY } = event;

        mousething.animate(
            {
                left: `${clientX}px`,
                top: `${clientY}px`,
            },
            {
                duration: hasAnimated ? 3000 : 0,
                fill: "forwards",
            },
        );
        hasAnimated = true;
    }

    onMount(() => {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.5 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        const animate = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            lenis.destroy();
        };
    });
</script>

<div class="relative">
    <div
        class="absolute z-1 pointer-events-none rounded-full border border-primary w-8 aspect-square -translate-1/2 transition-all duration-700 {hasAnimated ? "opacity-100" : "opacity-0"}"
        bind:this={mousething}
    ></div>
</div>
