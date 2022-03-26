<script setup lang="ts">
const imageUrl =
  'https://images.unsplash.com/photo-1630788232884-01f4cbad0e18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3570&q=80';

const bluePrint = ref([
  [0, 0, 0, 0, 0, 0],
  [0, 1, 2, 3, 4, 0],
  [0, 5, 6, 7, 8, 0],
  [0, 9, 10, 11, 12, 0],
  [0, 13, 14, 15, 16, 0],
  [0, 0, 0, 0, -1, 0],
  [0, 0, 0, 0, 0, 0],
]);

function validate() {
  let value = 0;
  for (let i = 0; i < bluePrint.value.length; i++) {
    for (let j = 0; j < bluePrint.value[i].length; j++) {
      const element = bluePrint.value[i][j];
      if (element === 0) continue;
      if (value === 16 && element === -1) return true;
      if (value + 1 !== element) return false;
      value++;
    }
  }
  return true;
}

async function onClick(e: MouseEvent, rowNum: number, colNum: number) {
  const node = e.currentTarget as HTMLDivElement;
  if (!node) return;
  const nodeT = bluePrint.value[rowNum - 1][colNum];
  const nodeB = bluePrint.value[rowNum + 1][colNum];
  const nodeR = bluePrint.value[rowNum][colNum + 1];
  const nodeL = bluePrint.value[rowNum][colNum - 1];
  if (nodeT === -1) {
    [bluePrint.value[rowNum][colNum], bluePrint.value[rowNum - 1][colNum]] = [
      bluePrint.value[rowNum - 1][colNum],
      bluePrint.value[rowNum][colNum],
    ];
  }
  if (nodeB === -1) {
    node.style.transform = 'translateY(51px)';
    await new Promise((resolve) => setTimeout(() => resolve(true), 100));
    [bluePrint.value[rowNum][colNum], bluePrint.value[rowNum + 1][colNum]] = [
      bluePrint.value[rowNum + 1][colNum],
      bluePrint.value[rowNum][colNum],
    ];
  }
  if (nodeR === -1) {
    [bluePrint.value[rowNum][colNum], bluePrint.value[rowNum][colNum + 1]] = [
      bluePrint.value[rowNum][colNum + 1],
      bluePrint.value[rowNum][colNum],
    ];
  }
  if (nodeL === -1) {
    [bluePrint.value[rowNum][colNum], bluePrint.value[rowNum][colNum - 1]] = [
      bluePrint.value[rowNum][colNum - 1],
      bluePrint.value[rowNum][colNum],
    ];
  }
  console.log(validate());
}

const SIZE_X = 4;
const SIZE_Y = 4;
const SIZE_NODE = 50;

function computeBgPosition(node: number) {
  const x = ((node - 1) % SIZE_X) * SIZE_NODE * -1;
  const y = Math.floor((node - 1) / SIZE_Y) * SIZE_NODE * -1;
  const t = `${x}px ${y}px`;
  return t;
}
</script>

<template>
  <div
    :style="{
      display: 'grid',
      gap: '1px',
      gridTemplateRows: `repeat(${SIZE_Y + 2}, ${SIZE_NODE}px)`,
    }"
  >
    <div
      v-for="(row, rowNum) in bluePrint"
      :key="rowNum"
      :style="{
        display: 'grid',
        gridTemplateColumns: `repeat(${SIZE_X + 2}, ${SIZE_NODE}px)`,
        gap: '1px',
        transition: 'all linear 1s',
      }"
    >
      <div v-for="(node, colNum) in row" :key="node">
        <div v-if="node === 0" :style="{ width: '0px', height: '0px' }"></div>
        <div
          v-else-if="node === -1"
          :style="{ width: `${SIZE_NODE}px`, height: `${SIZE_NODE}px` }"
        ></div>
        <button
          v-else
          :style="{
            width: `${SIZE_NODE}px`,
            height: `${SIZE_NODE}px`,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: `${SIZE_NODE * SIZE_X}px ${SIZE_NODE * SIZE_Y}px`,
            transition: 'transform linear 0.1s',
            backgroundPosition: computeBgPosition(node),
            color: 'white',
          }"
          @click="onClick($event, rowNum, colNum)"
        >
          {{ node }}
        </button>
      </div>
    </div>
  </div>
  <div
    :style="{
      width: `${SIZE_NODE * SIZE_X}px`,
      height: `${SIZE_NODE * SIZE_Y}px`,
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: `${SIZE_NODE * SIZE_X}px ${SIZE_NODE * SIZE_Y}px`,
    }"
  ></div>
</template>
