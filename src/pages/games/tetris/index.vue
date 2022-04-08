<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';
import { useController } from './composables/useController';
import { useNodes } from './composables/useNodes';

import { NODE } from './composables/@types';

const { nodes, NODE_SIZE, nextNode, X_SIZE, Y_SIZE } = useNodes();

const {
  startGame,
  rotateTetromino,
  moveTetrominoToRight,
  moveTetrominoToLeft,
  moveTetrominoDown,
  dropTetromino,
  tetromino,
} = useController();

onKeyStroke('ArrowUp', rotateTetromino);
onKeyStroke('ArrowRight', moveTetrominoToRight);
onKeyStroke('ArrowLeft', moveTetrominoToLeft);
onKeyStroke('ArrowDown', moveTetrominoDown);
onKeyStroke(' ', dropTetromino);

function isGuide(rowIdx: number, colIdx: number) {
  return tetromino().endPosition.value.find(([r, c]) => r === rowIdx && c === colIdx);
}
</script>

<template>
  <div>Tetris</div>
  <button @click="startGame">Start</button>
  <br />
  <div class="mx-auto flex">
    <div v-if="nextNode === NODE.I" class="grid gap-px">
      <div v-for="num in 4" :key="num" class="w-8 h-8 bg-sky-500"></div>
    </div>
    <div v-if="nextNode === NODE.J" class="grid gap-px grid-cols-2">
      <div
        v-for="num in 6"
        :key="num"
        class="w-8 h-8"
        :class="{ 'bg-blue-500': num === 5 || num % 2 === 0 }"
      ></div>
    </div>
    <div v-if="nextNode === NODE.L" class="grid gap-px grid-cols-2">
      <div
        v-for="num in 6"
        :key="num"
        class="w-8 h-8"
        :class="{ 'bg-orange-500': num === 6 || num % 2 === 1 }"
      ></div>
    </div>
    <div v-if="nextNode === NODE.O" class="grid gap-px grid-cols-2">
      <div v-for="num in 4" :key="num" class="w-8 h-8 bg-red-500"></div>
    </div>
    <div v-if="nextNode === NODE.S" class="grid gap-px grid-cols-3">
      <div
        v-for="num in 6"
        :key="num"
        class="w-8 h-8"
        :class="{ 'bg-emerald-500': [2, 3, 4, 5].includes(num) }"
      ></div>
    </div>
    <div v-if="nextNode === NODE.Z" class="grid gap-px grid-cols-3">
      <div
        v-for="num in 6"
        :key="num"
        class="w-8 h-8"
        :class="{ 'bg-yellow-500': [1, 2, 5, 6].includes(num) }"
      ></div>
    </div>
    <div v-if="nextNode === NODE.T" class="grid gap-px grid-cols-3">
      <div
        v-for="num in 6"
        :key="num"
        class="w-8 h-8"
        :class="{ 'bg-purple-500': [2, 4, 5, 6].includes(num) }"
      ></div>
    </div>
  </div>
  <div class="flex justify-center items-center">
    <div
      class="grid gap-px bg-black"
      :style="{ width: `${NODE_SIZE * X_SIZE + 8}px`, height: `${NODE_SIZE * Y_SIZE + 14}px` }"
    >
      <div v-for="(raw, indexR) in nodes" :key="indexR" class="grid grid-cols-9 gap-px bg-black">
        <div
          v-for="(node, indexC) in raw"
          :key="indexC"
          class="bg-white border border-transparent"
          :class="{
            'bg-sky-500': node === NODE.I || node === NODE.FOSSIL_I,
            'bg-blue-500': node === NODE.J || node === NODE.FOSSIL_J,
            'bg-orange-500': node === NODE.L || node === NODE.FOSSIL_L,
            'bg-red-500': node === NODE.O || node === NODE.FOSSIL_O,
            'bg-emerald-500': node === NODE.S || node === NODE.FOSSIL_S,
            'bg-yellow-500': node === NODE.Z || node === NODE.FOSSIL_Z,
            'bg-purple-500': node === NODE.T || node === NODE.FOSSIL_T,
            'border-red-700': isGuide(indexR, indexC),
          }"
          :style="{ width: `${NODE_SIZE}px`, height: `${NODE_SIZE}px` }"
        >
          {{ node }}
        </div>
      </div>
    </div>
  </div>
</template>
