<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';
import NextTetromino from './components/next-tetromino.vue';
import { NODE } from './composables/@types';
import { useController } from './composables/useController';
import { useNodes } from './composables/useNodes';
import { useStyles } from './composables/useStyles';

const { nodes, NODE_SIZE, X_SIZE, Y_SIZE } = useNodes();

const {
  startGame,
  rotateTetromino,
  moveTetrominoToRight,
  moveTetrominoToLeft,
  moveTetrominoDown,
  dropTetromino,
  isGuide,
} = useController();

const { bg } = useStyles();

onKeyStroke('ArrowUp', rotateTetromino);
onKeyStroke('ArrowRight', moveTetrominoToRight);
onKeyStroke('ArrowLeft', moveTetrominoToLeft);
onKeyStroke('ArrowDown', moveTetrominoDown);
onKeyStroke(' ', dropTetromino);
</script>

<template>
  <div>Tetris</div>
  <button @click="startGame">Start</button>
  <br />
  <div class="flex justify-center gap-20">
    <div
      class="grid gap-px bg-black"
      :style="{ width: `${NODE_SIZE * X_SIZE + 8}px`, height: `${NODE_SIZE * Y_SIZE + 14}px` }"
    >
      <div v-for="(raw, rowIdx) in nodes" :key="rowIdx" class="grid grid-cols-9 gap-px bg-black">
        <div
          v-for="(node, colIdx) in raw"
          :key="colIdx"
          class="bg-white border border-transparent"
          :class="[
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
          :style="{
            width: `${NODE_SIZE}px`,
            height: `${NODE_SIZE}px`,
          }"
        >
          {{ node }}
        </div>
      </div>
    </div>
    <div>
      <NextTetromino />
    </div>
  </div>
</template>
