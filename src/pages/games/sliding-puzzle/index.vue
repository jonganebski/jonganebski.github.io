<script setup lang="ts">
import { randArrayElements } from '~/libs/random';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

type Direction = 'top' | 'bottom' | 'right' | 'left';

const SIZE_X = 4;
const SIZE_Y = 4;
const MOVE_COUNT = SIZE_X * SIZE_Y * 2;
const SIZE_NODE = computed(() => (lgAndLarger.value ? 160 : smAndLarger.value ? 120 : 80));

const breakpoints = useBreakpoints(breakpointsTailwind);

const smAndLarger = breakpoints.greater('sm');
const lgAndLarger = breakpoints.greater('lg');

const status = ref<'shuffle' | 'ready' | 'playing' | 'done'>('shuffle');
const clickCount = ref(0);
const score = computed(() => clickCount.value - MOVE_COUNT);

const images = [
  {
    name: 'Jean Alter',
    url: 'https://preview.redd.it/m2dst4o2hds61.png?width=640&crop=smart&auto=webp&s=29b4040ebc7ca6f7c368ef690cec55212a51bc29',
  },
  {
    name: 'Fox',
    url: 'https://images.unsplash.com/photo-1647821172233-d1b0d2926b1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
  },
  { name: 'Lena-1', url: 'https://wallpapercave.com/wp/wp9322869.jpg' },
  { name: 'Lena-2', url: 'https://wallpapercave.com/wp/wp9322942.jpg' },
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

function selectImage(value: string | number) {
  imageUrl.value = typeof value === 'string' ? value : value.toString();
  initialize();
}

function getRandomNodeAround(rowIdx: number, colIdx: number, prevNode?: number) {
  let result: number[] = [];
  const top = bluePrint.value[rowIdx - 1][colIdx];
  const bottom = bluePrint.value[rowIdx + 1][colIdx];
  const right = bluePrint.value[rowIdx][colIdx + 1];
  const left = bluePrint.value[rowIdx][colIdx - 1];
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
    const rowIdx = Number(voidEl.dataset.rowidx);
    const colIdx = Number(voidEl.dataset.colidx);
    const node = getRandomNodeAround(rowIdx, colIdx, prevNode);
    const el = document.getElementById(node.toString()) as HTMLDivElement | null;
    if (!el) return;
    await switchNode(el, Number(el.dataset.rowidx), Number(el.dataset.colidx), false);
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

async function switchNode(node: HTMLDivElement, rowIdx: number, colIdx: number, transition = true) {
  const direction = getDirection(rowIdx, colIdx);
  if (transition) node.style.transition = 'transform linear 0.1s';
  if (direction === 'top') {
    if (transition) {
      node.style.transform = `translateY(-${SIZE_NODE.value}px)`;
      await sleep(100);
    }
    [bluePrint.value[rowIdx][colIdx], bluePrint.value[rowIdx - 1][colIdx]] = [
      bluePrint.value[rowIdx - 1][colIdx],
      bluePrint.value[rowIdx][colIdx],
    ];
  }
  if (direction === 'bottom') {
    if (transition) {
      node.style.transform = `translateY(${SIZE_NODE.value}px)`;
      await sleep(100);
    }
    [bluePrint.value[rowIdx][colIdx], bluePrint.value[rowIdx + 1][colIdx]] = [
      bluePrint.value[rowIdx + 1][colIdx],
      bluePrint.value[rowIdx][colIdx],
    ];
  }
  if (direction === 'right') {
    if (transition) {
      node.style.transform = `translateX(${SIZE_NODE.value}px)`;
      await sleep(100);
    }
    [bluePrint.value[rowIdx][colIdx], bluePrint.value[rowIdx][colIdx + 1]] = [
      bluePrint.value[rowIdx][colIdx + 1],
      bluePrint.value[rowIdx][colIdx],
    ];
  }
  if (direction === 'left') {
    if (transition) {
      node.style.transform = `translateX(-${SIZE_NODE.value}px)`;
      await sleep(100);
    }
    [bluePrint.value[rowIdx][colIdx], bluePrint.value[rowIdx][colIdx - 1]] = [
      bluePrint.value[rowIdx][colIdx - 1],
      bluePrint.value[rowIdx][colIdx],
    ];
  }
  if (transition) node.style.transition = '';
  return direction ? true : false;
}

async function sleep(milliseconds: number) {
  await new Promise((resolve) => setTimeout(() => resolve(true), milliseconds));
}

function getDirection(rowIdx: number, colIdx: number): Direction | null {
  return bluePrint.value[rowIdx - 1][colIdx] === -1
    ? 'top'
    : bluePrint.value[rowIdx + 1][colIdx] === -1
    ? 'bottom'
    : bluePrint.value[rowIdx][colIdx + 1] === -1
    ? 'right'
    : bluePrint.value[rowIdx][colIdx - 1] === -1
    ? 'left'
    : null;
}

async function onClick(e: MouseEvent, rowIdx: number, colIdx: number) {
  if (status.value === 'shuffle' || status.value === 'done') return;
  const node = e.currentTarget as HTMLDivElement;
  if (!node) return;
  if (await switchNode(node, rowIdx, colIdx)) clickCount.value += 1;
  if (status.value === 'ready') status.value = 'playing';
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
  <div class="my-10 grid gap-5 place-items-center">
    <ui-select :model-value="imageUrl" @update:model-value="selectImage" label="Image" class="w-56">
      <ui-option
        v-for="(image, index) in images"
        :key="index"
        :value="image.url"
        :label="image.name"
      />
    </ui-select>
    <div>
      <div>{{ clickCount }}</div>
      <div
        :class="[
          score < 0 ? 'text-green-500' : score < MOVE_COUNT ? 'text-yellow-500' : 'text-red-500',
        ]"
      >
        {{ score > 0 ? `+${score}` : score }} moves
      </div>
    </div>
  </div>
  <div
    :style="{
      display: 'grid',
      gap: '1px',
      gridTemplateRows: `auto repeat(${SIZE_Y}, ${SIZE_NODE}px) auto`,
    }"
  >
    <div
      v-for="(row, rowIdx) in bluePrint"
      :key="rowIdx"
      :style="{
        display: 'grid',
        gridTemplateColumns: `auto repeat(${SIZE_X}, ${SIZE_NODE}px) auto`,
        gap: '1px',
        transition: 'all linear 1s',
      }"
    >
      <div v-for="(node, colIdx) in row" :key="node">
        <div v-if="node === 0" :style="{ width: '0px', height: '0px' }"></div>
        <div
          v-else-if="node === -1"
          id="void"
          :data-rowIdx="rowIdx"
          :data-colIdx="colIdx"
          :style="{ width: `${SIZE_NODE}px`, height: `${SIZE_NODE}px` }"
        ></div>
        <button
          v-else
          :id="node.toString()"
          :data-rowIdx="rowIdx"
          :data-colIdx="colIdx"
          :style="{
            position: 'relative',
            width: `${SIZE_NODE}px`,
            height: `${SIZE_NODE}px`,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: `${SIZE_NODE * SIZE_X}px ${SIZE_NODE * SIZE_Y}px`,
            backgroundPosition: computeBgPosition(node),
            color: 'white',
            transform: 'translate(0px)',
          }"
          @click="onClick($event, rowIdx, colIdx)"
        >
          <div
            class="absolute top-0 left-0 w-full h-full bg-white opacity-0"
            :class="{ done: status === 'done' }"
          ></div>
          {{ status === 'done' ? '' : node }}
        </button>
      </div>
    </div>
  </div>
  <div v-if="status === 'done'">Congratulations!</div>
  <ui-contour-lines />
</template>

<style scoped lang="css">
@keyframes done {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.done {
  animation: done linear 5s;
}
</style>
