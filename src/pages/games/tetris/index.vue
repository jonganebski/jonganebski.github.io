<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';

enum NODE {
  WALL = 0,
  BIRTH,
  VOID,
  I,
  J,
  L,
  O,
  S,
  T,
  Z,
  FOSSIL_I,
  FOSSIL_J,
  FOSSIL_L,
  FOSSIL_O,
  FOSSIL_S,
  FOSSIL_T,
  FOSSIL_Z,
}

const NODE_SIZE = 30;
const X_SIZE = 9;
const Y_SIZE = 15;
const TOP_RESERVE = 4;

const nodes = ref<NODE[][]>(generateCleanTemplate());

function generateCleanTemplate(): NODE[][] {
  return Array.from({ length: Y_SIZE }, (_, i) =>
    i === Y_SIZE - 1
      ? Array.from({ length: X_SIZE }, () => NODE.WALL)
      : Array.from({ length: X_SIZE }, (_, j) =>
          j === 0 || j === X_SIZE - 1 ? NODE.WALL : i <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID,
        ),
  );
}
const defaultPositionI = Object.freeze([
  [0, 4],
  [1, 4],
  [2, 4],
  [3, 4],
]);
const positionI = ref([...defaultPositionI]);
const shape = ref<0 | 1>(0);
const nextPositionI = computed(() =>
  positionI.value.map(([rowIdx, colIdx]) => [rowIdx + 1, colIdx]),
);

function prepare() {
  shape.value = 0;
  positionI.value = [...defaultPositionI];
  positionI.value.forEach(([rowIdx, colIdx]) => (nodes.value[rowIdx][colIdx] = NODE.I));
}

function fall() {
  let isBlocked = false;
  for (let i = 0; i < nextPositionI.value.length; i++) {
    const [nextRowIdx, nextColIdx] = nextPositionI.value[i];
    if (
      nodes.value[nextRowIdx][nextColIdx] === NODE.BIRTH ||
      nodes.value[nextRowIdx][nextColIdx] === NODE.VOID ||
      nodes.value[nextRowIdx][nextColIdx] === NODE.I
    )
      continue;
    isBlocked = true;
    break;
  }
  if (isBlocked) {
    positionI.value.forEach(([rowIdx, colIdx]) => (nodes.value[rowIdx][colIdx] = NODE.FOSSIL_I));
    return false;
  }
  positionI.value.forEach(([rowIdx, colIdx]) => {
    nodes.value[rowIdx][colIdx] = rowIdx <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID;
  });
  nextPositionI.value.forEach(([nextRowIdx, nextColIdx]) => {
    nodes.value[nextRowIdx][nextColIdx] = NODE.I;
  });

  positionI.value = nextPositionI.value;
  return true;
}

let setTimeoutId: NodeJS.Timeout;
const setTimeoutMs = ref(500);

function startGame() {
  prepare();
  startFalling();
}

function startFalling() {
  clearTimeout(setTimeoutId);
  setTimeoutId = setTimeout(() => {
    if (!fall()) {
      clearTimeout(setTimeoutId);
      prepare();
    }
    startFalling();
  }, setTimeoutMs.value);
}

onKeyStroke('ArrowUp', (e) => {
  e.preventDefault();
  positionI.value.forEach(([rowIdx, colIdx]) => {
    nodes.value[rowIdx][colIdx] = rowIdx <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID;
  });
  if (shape.value === 0) {
    positionI.value.forEach(([rowIdx, colIdx], i, arr) => {
      if (i === 0) positionI.value[i] = [arr[2][0], arr[2][1] - 2];
      if (i === 1) positionI.value[i] = [arr[2][0], arr[2][1] - 1];
      if (i === 2) positionI.value[i] = [rowIdx, colIdx];
      if (i === 3) positionI.value[i] = [arr[2][0], arr[2][1] + 1];
    });
    shape.value = 1;
  } else {
    positionI.value.forEach(([rowIdx, colIdx], i, arr) => {
      if (i === 0) positionI.value[i] = [arr[2][0] - 2, arr[2][1]];
      if (i === 1) positionI.value[i] = [arr[2][0] - 1, arr[2][1]];
      if (i === 2) positionI.value[i] = [rowIdx, colIdx];
      if (i === 3) positionI.value[i] = [arr[2][0] + 1, arr[2][1]];
    });
    shape.value = 0;
  }
  positionI.value.forEach(([rowIdx, colIdx]) => {
    nodes.value[rowIdx][colIdx] = NODE.I;
  });
});
onKeyStroke('ArrowRight', (e) => {
  e.preventDefault();
  let willCollide = false;
  positionI.value.forEach(([rowIdx, colIdx], i) => {
    if (
      nodes.value[rowIdx][colIdx + 1] !== NODE.VOID &&
      nodes.value[rowIdx][colIdx + 1] !== NODE.BIRTH
    )
      willCollide = true;
  });
  if (willCollide) return;
  positionI.value.forEach(([rowIdx, colIdx], i) => {
    nodes.value[rowIdx][colIdx] = rowIdx <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID;
    positionI.value[i] = [rowIdx, colIdx + 1];
  });
  positionI.value.forEach(([rowIdx, colIdx]) => {
    nodes.value[rowIdx][colIdx] = NODE.I;
  });
});
onKeyStroke('ArrowLeft', (e) => {
  e.preventDefault();
  let willCollide = false;
  positionI.value.forEach(([rowIdx, colIdx], i) => {
    if (
      nodes.value[rowIdx][colIdx - 1] !== NODE.VOID &&
      nodes.value[rowIdx][colIdx - 1] !== NODE.BIRTH
    )
      willCollide = true;
  });
  if (willCollide) return;
  positionI.value.forEach(([rowIdx, colIdx], i) => {
    nodes.value[rowIdx][colIdx] = rowIdx <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID;
    positionI.value[i] = [rowIdx, colIdx - 1];
  });
  positionI.value.forEach(([rowIdx, colIdx]) => {
    nodes.value[rowIdx][colIdx] = NODE.I;
  });
});

// onRenderTriggered(() => {
//   console.log('render');
// });
</script>

<template>
  <div>Tetris</div>
  <button @click="startGame">Start</button>
  <button @click="fall">Fall</button>
  <div class="flex justify-center items-center">
    <div
      class="grid gap-px bg-black"
      :style="{ width: `${NODE_SIZE * 9 + 8}px`, height: `${NODE_SIZE * 15 + 14}px` }"
    >
      <div v-for="(raw, index) in nodes" :key="index" class="grid grid-cols-9 gap-px bg-black">
        <div
          v-for="(node, index) in raw"
          :key="index"
          class="bg-white"
          :class="{ 'bg-blue-200': node === NODE.I || node === NODE.FOSSIL_I }"
          :style="{ width: `${NODE_SIZE}px`, height: `${NODE_SIZE}px` }"
        >
          {{ node }}
        </div>
      </div>
    </div>
  </div>
</template>
