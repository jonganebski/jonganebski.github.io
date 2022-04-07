<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';
import { useI } from './composables/useI';
import { useNodes } from './composables/useNodes';
import { useO } from './composables/useO';

const { nodes, NODE, NODE_SIZE, currNode, nextNode, switchNode, X_SIZE, Y_SIZE, TOP_RESERVE } =
  useNodes();

const I = useI();
const O = useO();

const defaultSetTimeoutMs = 700;
let setTimeoutId: NodeJS.Timeout;
const setTimeoutMs = ref(defaultSetTimeoutMs);

function startGame() {
  currNode.value === NODE.I ? I.prepare() : currNode.value === NODE.O ? O.prepare() : null;
  fall();
}

function fall() {
  clearTimeout(setTimeoutId);
  setTimeoutId = setTimeout(() => {
    if (currNode.value === NODE.I ? !I.fall() : !O.fall()) {
      clearTimeout(setTimeoutId);
      if (!validate()) {
        window.alert('Game Over!');
        return;
      }
      switchNode();
      currNode.value === NODE.I ? I.prepare() : O.prepare();
    }
    fall();
  }, setTimeoutMs.value);
}

function validate() {
  const target = currNode.value === NODE.I ? I.position.value : O.position.value;
  for (let i = 0; i < target.length; i++) {
    const [rowIdx] = target[i];
    if (rowIdx < TOP_RESERVE) return false;
  }
  return true;
}

onKeyStroke('ArrowUp', (e) => {
  e.preventDefault();
  currNode.value === NODE.I ? I.changeShape() : null;
});
onKeyStroke('ArrowRight', (e) => {
  e.preventDefault();
  currNode.value === NODE.I ? I.moveRight() : O.moveRight();
});
onKeyStroke('ArrowLeft', (e) => {
  e.preventDefault();
  currNode.value === NODE.I ? I.moveLeft() : O.moveLeft();
});
onKeyStroke('ArrowDown', (e) => {
  e.preventDefault();
  setTimeoutMs.value = 0;
  fall();
  setTimeoutMs.value = defaultSetTimeoutMs;
});

function isGuide(rowIdx: number, colIdx: number) {
  return currNode.value === NODE.I
    ? !!I.endPosition.value.find(([r, c]) => r === rowIdx && c === colIdx)
    : O.endPosition.value.find(([r, c]) => r === rowIdx && c === colIdx);
}
// onRenderTriggered(() => {
//   console.log('render');
// });
</script>

<template>
  <div>Tetris</div>
  {{ I.endPosition }}
  <button @click="startGame">Start</button>
  <button @click="I.fall">Fall</button>
  <div>
    <p>Current Node: {{ currNode }}</p>
  </div>
  <div class="mx-auto flex">
    <div v-if="nextNode === NODE.I" class="grid gap-px">
      <div v-for="num in 4" :key="num" class="w-8 h-8 bg-blue-200"></div>
    </div>
    <div v-if="nextNode === NODE.O" class="grid gap-px grid-cols-2">
      <div v-for="num in 4" :key="num" class="w-8 h-8 bg-red-200"></div>
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
            'bg-blue-200': node === NODE.I || node === NODE.FOSSIL_I,
            'bg-red-200': node === NODE.O || node === NODE.FOSSIL_O,
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
