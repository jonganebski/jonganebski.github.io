<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core';
import KeyboardGuide from './components/keyboard-guide.vue';
import MobileController from './components/mobile-controller.vue';
import NextTetromino from './components/next-tetromino.vue';
import { NODE } from './composables/@types';
import { useController } from './composables/useController';
import { useGameInfo } from './composables/useGameInfo';
import { useNodes } from './composables/useNodes';

const { lg } = useBreakpoints(breakpointsTailwind);

const { nodes, TOP_RESERVE, X_SIZE } = useNodes();

const {
  moveTetrominoToRight,
  moveTetrominoToLeft,
  moveTetrominoDown,
  rotateTetromino,
  dropTetromino,
  startGame,
  isGuide,
} = useController();

const { isGameStarted, score, level } = useGameInfo();

onKeyStroke('ArrowRight', moveTetrominoToRight);
onKeyStroke('ArrowLeft', moveTetrominoToLeft);
onKeyStroke('ArrowDown', moveTetrominoDown);
onKeyStroke('ArrowUp', rotateTetromino);
onKeyStroke(' ', dropTetromino);
</script>

<template>
  <h1 class="my-20 mb-10 text-3xl md:text-5xl text-center">Tetris</h1>
  <div class="flex justify-center gap-3 lg:gap-20">
    <div class="grid gap-px shadow-lg bg-gray-700">
      <div
        v-for="(raw, rowIdx) in nodes"
        :key="rowIdx"
        :style="{
          ...(rowIdx < TOP_RESERVE
            ? { display: 'none' }
            : { display: 'grid', gap: '1px', gridTemplateColumns: `repeat(${X_SIZE - 2}, 1fr)` }),
        }"
      >
        <div
          v-for="(node, colIdx) in raw"
          :key="colIdx"
          class="bg-gray-900"
          :class="[
            node === NODE.WALL || rowIdx < TOP_RESERVE
              ? 'w-0 h-0 hidden'
              : 'w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8',
            node === NODE.VOID
              ? isGuide(rowIdx, colIdx)
                ? 'guide border'
                : ''
              : node === NODE.I || node === NODE.FOSSIL_I
              ? 'tetromino__I border border-[0.625rem] md:border-[1rem]'
              : node === NODE.J || node === NODE.FOSSIL_J
              ? 'tetromino__J border border-[0.625rem] md:border-[1rem]'
              : node === NODE.L || node === NODE.FOSSIL_L
              ? 'tetromino__L border border-[0.625rem] md:border-[1rem]'
              : node === NODE.O || node === NODE.FOSSIL_O
              ? 'tetromino__O border border-[0.625rem] md:border-[1rem]'
              : node === NODE.S || node === NODE.FOSSIL_S
              ? 'tetromino__S border border-[0.625rem] md:border-[1rem]'
              : node === NODE.T || node === NODE.FOSSIL_T
              ? 'tetromino__T border border-[0.625rem] md:border-[1rem]'
              : node === NODE.Z || node === NODE.FOSSIL_Z
              ? 'tetromino__Z border border-[0.625rem] md:border-[1rem]'
              : '',
          ]"
        ></div>
      </div>
    </div>
    <div class="flex flex-col gap-10">
      <NextTetromino />
      <div>Level: {{ level }}</div>
      <div>Score: {{ score }}</div>
      <button
        v-if="!isGameStarted"
        class="py-2 px-3 border border-red-600 rounded"
        @click="startGame"
      >
        Start
      </button>
      <div class="mt-auto">
        <KeyboardGuide v-if="lg" />
        <MobileController
          v-else
          @on-touch-arrow-right-btn="moveTetrominoToRight"
          @on-touch-arrow-left-btn="moveTetrominoToLeft"
          @on-touch-arrow-down-btn="dropTetromino"
          @on-touch-rotate-btn="rotateTetromino"
        />
      </div>
    </div>
  </div>
  <client-only>
    <ui-contour-lines class="opacity-50" />
  </client-only>
</template>

<style scoped lang="css">
.guide {
  @apply border-t-red-500 border-r-red-500 border-b-red-500 border-l-red-500;
}
</style>

<style lang="css">
.tetromino__I {
  border-top-color: rgba(120, 239, 255, 1);
  border-right-color: rgba(120, 239, 255, 0.8);
  border-bottom-color: rgba(120, 239, 255, 0.6);
  border-left-color: rgba(120, 239, 255, 0.4);
}

.tetromino__J {
  border-top-color: rgba(25, 154, 255, 1);
  border-right-color: rgba(25, 154, 255, 0.8);
  border-bottom-color: rgba(25, 154, 255, 0.6);
  border-left-color: rgba(25, 154, 255, 0.4);
}

.tetromino__L {
  border-top-color: rgba(82, 230, 73, 1);
  border-right-color: rgba(82, 230, 73, 0.8);
  border-bottom-color: rgba(82, 230, 73, 0.6);
  border-left-color: rgba(82, 230, 73, 0.4);
}

.tetromino__O {
  border-top-color: rgba(255, 13, 19, 1);
  border-right-color: rgba(255, 13, 19, 0.8);
  border-bottom-color: rgba(255, 13, 19, 0.6);
  border-left-color: rgba(255, 13, 19, 0.4);
}

.tetromino__S {
  border-top-color: rgba(230, 106, 226, 1);
  border-right-color: rgba(230, 106, 226, 0.8);
  border-bottom-color: rgba(230, 106, 226, 0.6);
  border-left-color: rgba(230, 106, 226, 0.4);
}

.tetromino__T {
  border-top-color: rgba(255, 232, 3, 1);
  border-right-color: rgba(255, 232, 3, 0.8);
  border-bottom-color: rgba(255, 232, 3, 0.6);
  border-left-color: rgba(255, 232, 3, 0.4);
}

.tetromino__Z {
  border-top-color: rgba(255, 154, 0, 1);
  border-right-color: rgba(255, 154, 0, 0.8);
  border-bottom-color: rgba(255, 154, 0, 0.6);
  border-left-color: rgba(255, 154, 0, 0.4);
}
</style>
