<script setup lang="ts">
import { breakpointsTailwind, MaybeElementRef } from '@vueuse/core';
import { useMyI18n } from '~/plugins/i18n';
import AuthWarning from '../components/auth-warning.vue';
import Records from '../components/records.vue';
import { useRecordsQuery } from './apis/useRecordsQuery';
import KeyboardGuide from './components/keyboard-guide.vue';
import MeanCat from './components/mean-cat.vue';
import MobileController from './components/mobile-controller.vue';
import NextTetromino from './components/next-tetromino.vue';
import Node from './components/node.vue';
import { useController } from './composables/useController';
import { useGameInfo } from './composables/useGameInfo';
import { useNodes } from './composables/useNodes';

const { lg } = useBreakpoints(breakpointsTailwind);

const { t } = useMyI18n();

const { isLoading: isRecordsLoading, data: records } = useRecordsQuery();

const { nodes, TOP_RESERVE, X_SIZE } = useNodes();

const {
  moveTetrominoToRight,
  moveTetrominoToLeft,
  moveTetrominoDown,
  rotateTetromino,
  dropTetromino,
  resetGame,
  startGame,
  tetromino,
  isGuide,
} = useController();

const { gameStatus, isCatHere, score, level } = useGameInfo();

onKeyStroke('ArrowRight', moveTetrominoToRight);
onKeyStroke('ArrowLeft', moveTetrominoToLeft);
onKeyStroke('ArrowDown', moveTetrominoDown);
onKeyStroke('ArrowUp', rotateTetromino);
onKeyStroke(' ', dropTetromino);

const tetrisContainerEl = ref<HTMLDivElement | null>(null);
const { left } = useElementBounding(tetrisContainerEl as MaybeElementRef);
</script>

<template>
  <h1 class="my-20 text-3xl md:text-5xl text-center">{{ t('tetris') }}</h1>
  <MeanCat :position="tetromino().position" :left="left" />
  <div class="flex px-10 sm:pl-32 md:pl-50 xl:pl-64 gap-3 lg:gap-20">
    <div ref="tetrisContainerEl" class="grid gap-px shadow-lg bg-gray-700">
      <div
        v-for="(raw, rowIdx) in nodes"
        :key="rowIdx"
        :style="{
          ...(rowIdx < TOP_RESERVE
            ? { display: 'none' }
            : { display: 'grid', gap: '1px', gridTemplateColumns: `repeat(${X_SIZE - 2}, 1fr)` }),
        }"
      >
        <Node
          v-for="(node, colIdx) in raw"
          :key="colIdx"
          :rowIdx="rowIdx"
          :colIdx="colIdx"
          :is-guide="isGuide(rowIdx, colIdx)"
          :node="node"
          :is-cat-here="isCatHere"
        />
      </div>
    </div>
    <div class="flex flex-col gap-10">
      <NextTetromino />
      <div>{{ t('level') }}: {{ level }}</div>
      <div>{{ t('score') }}: {{ score }}</div>
      <button
        v-if="gameStatus === 'READY'"
        class="py-2 px-3 border border-red-600 rounded"
        @click="startGame"
      >
        {{ t('start') }}
        <span v-if="isCatHere">🐈</span>
      </button>
      <button
        v-if="gameStatus === 'END'"
        class="py-2 px-3 border border-red-600 rounded"
        @click="resetGame"
      >
        {{ t('reset') }}
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
  <AuthWarning class="mt-10 text-center" />
  <Records :is-loading="isRecordsLoading" :data="records" />
  <client-only>
    <ui-contour-lines class="opacity-50" />
  </client-only>
</template>

<style lang="css">
.border-color__tetromino__I {
  border-top-color: rgba(120, 239, 255, 1);
  border-right-color: rgba(120, 239, 255, 0.8);
  border-bottom-color: rgba(120, 239, 255, 0.6);
  border-left-color: rgba(120, 239, 255, 0.4);
}

.border-color__tetromino__J {
  border-top-color: rgba(25, 154, 255, 1);
  border-right-color: rgba(25, 154, 255, 0.8);
  border-bottom-color: rgba(25, 154, 255, 0.6);
  border-left-color: rgba(25, 154, 255, 0.4);
}

.border-color__tetromino__L {
  border-top-color: rgba(82, 230, 73, 1);
  border-right-color: rgba(82, 230, 73, 0.8);
  border-bottom-color: rgba(82, 230, 73, 0.6);
  border-left-color: rgba(82, 230, 73, 0.4);
}

.border-color__tetromino__O {
  border-top-color: rgba(255, 13, 19, 1);
  border-right-color: rgba(255, 13, 19, 0.8);
  border-bottom-color: rgba(255, 13, 19, 0.6);
  border-left-color: rgba(255, 13, 19, 0.4);
}

.border-color__tetromino__S {
  border-top-color: rgba(230, 106, 226, 1);
  border-right-color: rgba(230, 106, 226, 0.8);
  border-bottom-color: rgba(230, 106, 226, 0.6);
  border-left-color: rgba(230, 106, 226, 0.4);
}

.border-color__tetromino__T {
  border-top-color: rgba(255, 232, 3, 1);
  border-right-color: rgba(255, 232, 3, 0.8);
  border-bottom-color: rgba(255, 232, 3, 0.6);
  border-left-color: rgba(255, 232, 3, 0.4);
}

.border-color__tetromino__Z {
  border-top-color: rgba(255, 154, 0, 1);
  border-right-color: rgba(255, 154, 0, 0.8);
  border-bottom-color: rgba(255, 154, 0, 0.6);
  border-left-color: rgba(255, 154, 0, 0.4);
}
</style>
