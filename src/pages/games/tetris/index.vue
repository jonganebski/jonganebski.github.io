<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';
import NextTetromino from './components/next-tetromino.vue';
import { NODE } from './composables/@types';
import { useController } from './composables/useController';
import { useGameInfo } from './composables/useGameInfo';
import { useNodes } from './composables/useNodes';
import { useStyles } from './composables/useStyles';

const { nodes, TOP_RESERVE, X_SIZE } = useNodes();

const {
  startGame,
  rotateTetromino,
  moveTetrominoToRight,
  moveTetrominoToLeft,
  moveTetrominoDown,
  dropTetromino,
  isGuide,
} = useController();

const { score, level } = useGameInfo();

const { bg } = useStyles();

onKeyStroke('ArrowUp', rotateTetromino);
onKeyStroke('ArrowRight', moveTetrominoToRight);
onKeyStroke('ArrowLeft', moveTetrominoToLeft);
onKeyStroke('ArrowDown', moveTetrominoDown);
onKeyStroke(' ', dropTetromino);
</script>

<template>
  <h1 class="my-20 text-3xl md:text-5xl text-center">Tetris</h1>
  <br />
  <div class="flex justify-center items-start gap-20">
    <div class="grid gap-px shadow-lg">
      <div
        v-for="(raw, rowIdx) in nodes"
        :key="rowIdx"
        :style="{
          display: 'grid',
          gap: '1px',
          gridTemplateColumns: `repeat(${X_SIZE - 2}, 1fr)`,
        }"
      >
        <div
          v-for="(node, colIdx) in raw"
          :key="colIdx"
          class="bg-gray-400"
          :class="[
            node === NODE.WALL || rowIdx < TOP_RESERVE ? 'w-0 h-0 hidden' : 'w-8 h-8',
            isGuide(rowIdx, colIdx) ? 'border border-red-500' : '',
            node === NODE.I || node === NODE.FOSSIL_I
              ? bg.I
              : node === NODE.J || node === NODE.FOSSIL_J
              ? bg.J
              : node === NODE.L || node === NODE.FOSSIL_L
              ? bg.L
              : node === NODE.O || node === NODE.FOSSIL_O
              ? bg.O
              : node === NODE.S || node === NODE.FOSSIL_S
              ? bg.S
              : node === NODE.T || node === NODE.FOSSIL_T
              ? bg.T
              : node === NODE.Z || node === NODE.FOSSIL_Z
              ? bg.Z
              : '',
          ]"
        ></div>
      </div>
    </div>
    <div class="grid gap-10">
      <NextTetromino />
      <div>Level: {{ level }}</div>
      <div>Score: {{ score }}</div>
      <button class="py-2 px-3 border border-red-600 rounded" @click="startGame">Start</button>
    </div>
  </div>
  <client-only>
    <ui-contour-lines class="opacity-50" />
  </client-only>
</template>
