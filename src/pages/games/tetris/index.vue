<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';
import { useI } from './composables/useI';
import { useJ } from './composables/useJ';
import { useNodes } from './composables/useNodes';
import { useO } from './composables/useO';

const { nodes, NODE, NODE_SIZE, currNode, nextNode, switchNode, X_SIZE, Y_SIZE, TOP_RESERVE } =
  useNodes();

const I = useI();
const J = useJ();
const O = useO();

const defaultSetTimeoutMs = 700;
let setTimeoutId: NodeJS.Timeout;
const setTimeoutMs = ref(defaultSetTimeoutMs);

function tetromino() {
  const t = [O, I, J].find(({ id }) => id === currNode.value);
  if (!t) throw Error('Tetromino not found');
  return t;
}

function startGame() {
  tetromino().prepare();
  fall();
}

function fall() {
  clearTimeout(setTimeoutId);
  setTimeoutId = setTimeout(() => {
    if (!tetromino().fall()) {
      clearTimeout(setTimeoutId);
      if (!validate()) {
        window.alert('Game Over!');
        return;
      }
      switchNode();
      tetromino().prepare();
    }
    fall();
  }, setTimeoutMs.value);
}

function validate() {
  const target = tetromino().position.value;
  for (let i = 0; i < target.length; i++) {
    const [rowIdx] = target[i];
    if (rowIdx < TOP_RESERVE) return false;
  }
  return true;
}

onKeyStroke('ArrowUp', (e) => {
  e.preventDefault();
  tetromino().changeShape();
});
onKeyStroke('ArrowRight', (e) => {
  e.preventDefault();
  tetromino().moveRight();
});
onKeyStroke('ArrowLeft', (e) => {
  e.preventDefault();
  tetromino().moveLeft();
});
onKeyStroke('ArrowDown', (e) => {
  e.preventDefault();
  setTimeoutMs.value = 0;
  fall();
  setTimeoutMs.value = defaultSetTimeoutMs;
});

function isGuide(rowIdx: number, colIdx: number) {
  return tetromino().endPosition.value.find(([r, c]) => r === rowIdx && c === colIdx);
}
// onRenderTriggered(() => {
//   console.log('render');
// });
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
    <div v-if="nextNode === NODE.O" class="grid gap-px grid-cols-2">
      <div v-for="num in 4" :key="num" class="w-8 h-8 bg-red-500"></div>
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
            'bg-red-500': node === NODE.O || node === NODE.FOSSIL_O,
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
