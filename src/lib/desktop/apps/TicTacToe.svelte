<script lang="ts">
  import { onMount } from "svelte";
  import { getWinner, bestMove, isFilled } from "./tictactoe";
  import { fade } from "svelte/transition";

  const cellColors = {
    0: "bg-white/10", // inactive
    1: "bg-white", // bot
    2: "bg-[#a298e4]", // player
  } as { [key: number]: string };

  let rows = $state([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  let score = $state({
    player: 0,
    bot: 0,
    tie: 0,
  });

  let locked = false;

  async function playerSelect(x: number, y: number) {
    if (locked) return;
    if (rows[y][x] !== 0) return;
    locked = true;
    rows = rows.map((row, ry) =>
      row.map((cell, cx) => (ry === y && cx === x ? 2 : cell))
    );
    await clickAudio.play();

    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 500 + 500)
    );
    const move = bestMove(rows);
    rows = rows.map((row, ry) =>
      row.map((cell, cx) => (ry === move.row && cx === move.col ? 1 : cell))
    );
    locked = false;
  }

  let clickAudio: HTMLAudioElement;

  onMount(() => {
    clickAudio.load();

    $effect(() => {
      const winner = getWinner(rows);
      if (winner !== null) {
        rows = rows.map((row) => row.map(() => 0));
        if (winner === 2) {
          score.player++;
        } else {
          score.bot++;
        }
      } else if (isFilled(rows)) {
        rows = rows.map((row) => row.map(() => 0));
        score.tie++;
      }
    });

    score = (() => {
      const data = localStorage.getItem("score");
      return data
        ? JSON.parse(data)
        : {
            player: 0,
            bot: 0,
            tie: 0,
          };
    })();

    $effect(() => {
      localStorage.setItem("score", JSON.stringify(score));
    });
  });
</script>

<audio src="/audio/plop.mp3" bind:this={clickAudio}></audio>

<div
  class="w-full h-full flex flex-col gap-4 justify-center items-center"
  in:fade={{ duration: 100 }}
>
  <div class="aspect-square flex flex-col gap-2">
    {#each rows as row, y}
      <div class="flex gap-2">
        {#each row as cell, x}
          <button
            aria-label="cell {x},{y}"
            onclick={() => playerSelect(x, y)}
            class="w-12 h-12 rounded-md cursor-pointer hover:scale-105 transition-all {cellColors[
              cell
            ]}"
          ></button>
        {/each}
      </div>
    {/each}
  </div>
  <div class="grid grid-cols-3 gap-4 select-none">
    <div class="flex flex-col gap-2 text-center col-span-1">
      <p class="text-sm text-white/70">player</p>
      <p class="text-xl">{score.player}</p>
    </div>
    <div class="flex flex-col gap-2 text-center col-span-1">
      <p class="text-sm text-white/70">tie</p>
      <p class="text-xl">{score.tie}</p>
    </div>
    <div class="flex flex-col gap-2 text-center col-span-1">
      <p class="text-sm text-white/70">computer</p>
      <p class="text-xl">{score.bot}</p>
    </div>
  </div>
</div>
