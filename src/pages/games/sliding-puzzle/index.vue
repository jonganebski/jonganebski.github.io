<script setup lang="ts">
import { randArrayElements } from '~/libs/random';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

type Direction = 'top' | 'bottom' | 'right' | 'left';

const MOVE_COUNT = 30;
const SIZE_X = 4;
const SIZE_Y = 4;
const SIZE_NODE = computed(() => (lgAndLarger.value ? 160 : smAndLarger.value ? 120 : 80));

const breakpoints = useBreakpoints(breakpointsTailwind);

const smAndLarger = breakpoints.greater('sm');
const lgAndLarger = breakpoints.greater('lg');

const status = ref<'shuffle' | 'ready' | 'playing' | 'done'>('shuffle');
const clickCount = ref(0);
const score = computed(() => Math.round((clickCount.value / MOVE_COUNT) * 100));

const images = [
  'https://preview.redd.it/m2dst4o2hds61.png?width=640&crop=smart&auto=webp&s=29b4040ebc7ca6f7c368ef690cec55212a51bc29',
  'https://images.unsplash.com/photo-1647821172233-d1b0d2926b1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
  'https://wallpapercave.com/wp/wp9322869.jpg',
  'https://wallpapercave.com/wp/wp9322942.jpg',
];

const imageUrl = ref(
  'https://images.unsplash.com/photo-1647821172233-d1b0d2926b1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
);

const bluePrint = ref([
  [0, 0, 0, 0, 0, 0],
  [0, 1, 2, 3, 4, 0],
  [0, 5, 6, 7, 8, 0],
  [0, 9, 10, 11, 12, 0],
  [0, 13, 14, 15, 16, 0],
  [0, 0, 0, 0, -1, 0],
  [0, 0, 0, 0, 0, 0],
]);

function selectImage(index: number) {
  imageUrl.value = images[index];
  initialize();
}

function getRandomNodeAround(rowNum: number, colNum: number, prevNode?: number) {
  let result: number[] = [];
  const top = bluePrint.value[rowNum - 1][colNum];
  const bottom = bluePrint.value[rowNum + 1][colNum];
  const right = bluePrint.value[rowNum][colNum + 1];
  const left = bluePrint.value[rowNum][colNum - 1];
  if (0 < top && top !== prevNode) result.push(top);
  if (0 < bottom && bottom !== prevNode) result.push(bottom);
  if (0 < right && right !== prevNode) result.push(right);
  if (0 < left && left !== prevNode) result.push(left);
  if (prevNode) {
    result = result.filter((node) => node !== 16);
  }
  return randArrayElements(1, result)[0];
}

async function initialize() {
  clickCount.value = 0;
  status.value = 'shuffle';
  let prevNode;
  for (let i = 0; i < MOVE_COUNT; i++) {
    const voidEl = document.getElementById('void') as HTMLDivElement | null;
    if (!voidEl) return;
    const rowNum = Number(voidEl.dataset.rownum);
    const colNum = Number(voidEl.dataset.colnum);
    const node = getRandomNodeAround(rowNum, colNum, prevNode);
    const el = document.getElementById(node.toString()) as HTMLDivElement | null;
    if (!el) return;
    await switchNode(el, Number(el.dataset.rownum), Number(el.dataset.colnum), false);
    prevNode = node;
  }
  status.value = 'ready';
}

onMounted(async () => {
  await initialize();
});

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

async function switchNode(node: HTMLDivElement, rowNum: number, colNum: number, transition = true) {
  const direction = getDirection(rowNum, colNum);
  if (transition) node.style.transition = 'transform linear 0.1s';
  if (direction === 'top') {
    if (transition) {
      node.style.transform = `translateY(-${SIZE_NODE.value}px)`;
      await sleep(100);
    }
    [bluePrint.value[rowNum][colNum], bluePrint.value[rowNum - 1][colNum]] = [
      bluePrint.value[rowNum - 1][colNum],
      bluePrint.value[rowNum][colNum],
    ];
  }
  if (direction === 'bottom') {
    if (transition) {
      node.style.transform = `translateY(${SIZE_NODE.value}px)`;
      await sleep(100);
    }
    [bluePrint.value[rowNum][colNum], bluePrint.value[rowNum + 1][colNum]] = [
      bluePrint.value[rowNum + 1][colNum],
      bluePrint.value[rowNum][colNum],
    ];
  }
  if (direction === 'right') {
    if (transition) {
      node.style.transform = `translateX(${SIZE_NODE.value}px)`;
      await sleep(100);
    }
    [bluePrint.value[rowNum][colNum], bluePrint.value[rowNum][colNum + 1]] = [
      bluePrint.value[rowNum][colNum + 1],
      bluePrint.value[rowNum][colNum],
    ];
  }
  if (direction === 'left') {
    if (transition) {
      node.style.transform = `translateX(-${SIZE_NODE.value}px)`;
      await sleep(100);
    }
    [bluePrint.value[rowNum][colNum], bluePrint.value[rowNum][colNum - 1]] = [
      bluePrint.value[rowNum][colNum - 1],
      bluePrint.value[rowNum][colNum],
    ];
  }
  if (transition) node.style.transition = '';
}

async function sleep(milliseconds: number) {
  await new Promise((resolve) => setTimeout(() => resolve(true), milliseconds));
}

function getDirection(rowNum: number, colNum: number): Direction | null {
  return bluePrint.value[rowNum - 1][colNum] === -1
    ? 'top'
    : bluePrint.value[rowNum + 1][colNum] === -1
    ? 'bottom'
    : bluePrint.value[rowNum][colNum + 1] === -1
    ? 'right'
    : bluePrint.value[rowNum][colNum - 1] === -1
    ? 'left'
    : null;
}

async function onClick(e: MouseEvent, rowNum: number, colNum: number) {
  if (status.value === 'shuffle' || status.value === 'done') return;
  const node = e.currentTarget as HTMLDivElement;
  if (!node) return;
  await switchNode(node, rowNum, colNum);
  if (status.value === 'ready') status.value = 'playing';
  clickCount.value += 1;
  if (validate()) status.value = 'done';
}

function computeBgPosition(node: number) {
  const x = ((node - 1) % SIZE_X) * SIZE_NODE.value * -1;
  const y = Math.floor((node - 1) / SIZE_Y) * SIZE_NODE.value * -1;
  const t = `${x}px ${y}px`;
  return t;
}
</script>

<template>
  <div>
    <div>{{ clickCount }}</div>
    <div>{{ score }}%</div>
  </div>
  <div>
    <button v-for="(image, index) in images" @click="selectImage(index)">
      <img :src="image" width="200" height="200" class="w-[200px] h-[200px] object-fill" />
    </button>
  </div>
  <div
    :style="{
      display: 'grid',
      gap: '1px',
      gridTemplateRows: `auto repeat(${SIZE_Y}, ${SIZE_NODE}px) auto`,
    }"
  >
    <div
      v-for="(row, rowNum) in bluePrint"
      :key="rowNum"
      :style="{
        display: 'grid',
        gridTemplateColumns: `auto repeat(${SIZE_X}, ${SIZE_NODE}px) auto`,
        gap: '1px',
        transition: 'all linear 1s',
      }"
    >
      <div v-for="(node, colNum) in row" :key="node">
        <div v-if="node === 0" :style="{ width: '0px', height: '0px' }"></div>
        <div
          v-else-if="node === -1"
          id="void"
          :data-rowNum="rowNum"
          :data-colNum="colNum"
          :style="{ width: `${SIZE_NODE}px`, height: `${SIZE_NODE}px` }"
        ></div>
        <button
          v-else
          :id="node.toString()"
          :data-rowNum="rowNum"
          :data-colNum="colNum"
          :style="{
            width: `${SIZE_NODE}px`,
            height: `${SIZE_NODE}px`,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: `${SIZE_NODE * SIZE_X}px ${SIZE_NODE * SIZE_Y}px`,
            backgroundPosition: computeBgPosition(node),
            color: 'white',
            transform: 'translate(0px)',
          }"
          @click="onClick($event, rowNum, colNum)"
        >
          {{ status === 'done' ? '' : node }}
        </button>
      </div>
    </div>
  </div>
  <div v-if="status === 'done'">Congratulations!</div>
</template>
