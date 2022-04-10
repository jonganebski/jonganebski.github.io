<script setup lang="ts">
import { NODE } from '../composables/@types';
import { useGameInfo } from '../composables/useGameInfo';
import { useNodes } from '../composables/useNodes';

const { nextNode } = useNodes();

const { destroyedRawsCount, gameStatus, isCatHere, level } = useGameInfo();

const meanCat = computed(() => {
  if (!isCatHere.value) return 0;
  if (level.value < 5) return 0;
  return destroyedRawsCount.value % 10;
});
</script>

<template>
  <div
    class="relative w-20 md:w-28 h-20 md:h-28 flex items-center justify-center bg-gray-900 border border-gray-600 rounded-md"
  >
    <div v-if="gameStatus === 'PLAYING'">
      <img
        v-show="meanCat === 1"
        class="absolute top-0 left-0 w-full h-full object-cover object-left"
        src="https://media.greenmatters.com/brand-img/gsNnIF17C/0x0/what-does-it-mean-if-my-cat-stares-at-me1-1612842120372.jpg"
        width="80"
        height="80"
        alt=""
      />
      <!-- src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/rainbow-buddha-karl-morfett.jpg" -->
      <div v-if="nextNode === NODE.I" class="grid gap-px">
        <div v-for="num in 4" :key="num" class="node-size tetromino-border tetromino__I" />
      </div>
      <div v-if="nextNode === NODE.J" class="grid gap-px grid-cols-2">
        <div
          v-for="num in 6"
          :key="num"
          class="node-size"
          :class="{
            'tetromino__J tetromino-border': num === 5 || num % 2 === 0,
          }"
        />
      </div>
      <div v-if="nextNode === NODE.L" class="grid gap-px grid-cols-2">
        <div
          v-for="num in 6"
          :key="num"
          class="node-size"
          :class="{
            'tetromino__L tetromino-border': num === 6 || num % 2 === 1,
          }"
        />
      </div>
      <div v-if="nextNode === NODE.O" class="grid gap-px grid-cols-2">
        <div v-for="num in 4" :key="num" class="tetromino__O node-size tetromino-border" />
      </div>
      <div v-if="nextNode === NODE.S" class="grid gap-px grid-cols-3">
        <div
          v-for="num in 6"
          :key="num"
          class="node-size"
          :class="{
            'tetromino__S tetromino-border': [2, 3, 4, 5].includes(num),
          }"
        />
      </div>
      <div v-if="nextNode === NODE.T" class="grid gap-px grid-cols-3">
        <div
          v-for="num in 6"
          :key="num"
          class="node-size"
          :class="{
            'tetromino__T tetromino-border': [2, 4, 5, 6].includes(num),
          }"
        />
      </div>
      <div v-if="nextNode === NODE.Z" class="grid gap-px grid-cols-3">
        <div
          v-for="num in 6"
          :key="num"
          class="node-size"
          :class="{
            'tetromino__Z tetromino-border': [1, 2, 5, 6].includes(num),
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.node-size {
  @apply w-3 md:w-4 h-3 md:h-4;
}

.tetromino-border {
  @apply border border-[0.375rem] md:border-[0.5rem];
}
</style>
