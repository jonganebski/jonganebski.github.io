<script setup lang="ts">
enum TETROMINO {
  I = 'I',
  J = 'J',
  L = 'L',
  O = 'O',
  S = 'S',
  T = 'T',
  Z = 'Z',
}

enum NODE {
  BIRTH = 2,
  VOID = -1,
  WALL = 0,
}

const NODE_SIZE = 30;
const X_SIZE = 9;
const Y_SIZE = 15;
const TOP_RESERVE = 4;

const nodes = ref<(TETROMINO | NODE)[][]>(generateCleanTemplate());

function generateCleanTemplate(): (TETROMINO | NODE)[][] {
  return Array.from({ length: Y_SIZE }, (_, i) =>
    i === Y_SIZE - 1
      ? Array.from({ length: X_SIZE }, () => NODE.WALL)
      : Array.from({ length: X_SIZE }, (_, j) =>
          j === 0 || j === X_SIZE - 1 ? NODE.WALL : i <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID,
        ),
  );
}

const positionI = ref([
  [0, 4],
  [1, 4],
  [2, 4],
  [3, 4],
]);
const nextPositionI = computed(() =>
  positionI.value.map(([rowIdx, colIdx]) => [rowIdx + 1, colIdx]),
);

function prepare() {
  positionI.value.forEach(([rowIdx, colIdx]) => (nodes.value[rowIdx][colIdx] = TETROMINO.I));
}

function fall() {
  let isBlocked = false;
  for (let i = 0; i < nextPositionI.value.length; i++) {
    const [rowIdxNext, colIdxNext] = nextPositionI.value[i];
    if (
      nodes.value[rowIdxNext][colIdxNext] === NODE.VOID ||
      nodes.value[rowIdxNext][colIdxNext] === TETROMINO.I
    )
      continue;

    isBlocked = true;
    break;
  }
  if (isBlocked) return;
  positionI.value.forEach(
    ([rowIdx, colIdx]) =>
      (nodes.value[rowIdx][colIdx] = rowIdx <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID),
  );
  nextPositionI.value.forEach(([rowIdx, colIdx]) => (nodes.value[rowIdx][colIdx] = TETROMINO.I));
  positionI.value = nextPositionI.value;
}
</script>

<template>
  <div>Tetris</div>
  <button @click="prepare">Prepare</button>
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
          :class="{ 'bg-blue-200': node === TETROMINO.I }"
          :style="{ width: `${NODE_SIZE}px`, height: `${NODE_SIZE}px` }"
        >
          {{ node }}
        </div>
      </div>
    </div>
  </div>
</template>
