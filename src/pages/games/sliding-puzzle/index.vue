<script setup lang="ts">
import Controller from './components/controller.vue';
import Score from './components/score.vue';
import { useSlidingPuzzle } from './composables/useSlidingPuzzle';

const {
  SHUFFLE_COUNT,
  SIZE_NODE,
  SIZE_X,
  SIZE_Y,
  clickCount,
  imageUrl,
  status,
  nodes,
  score,
  computeBgPosition,
  onClickNode,
} = useSlidingPuzzle();
</script>

<template>
  <div class="my-10 grid gap-5 place-items-center">
    <Controller v-model="imageUrl" />
    <Score :shuffle-count="SHUFFLE_COUNT" :click-count="clickCount" :score="score" />
  </div>
  <div
    class="relative grid gap-px transition-all duration-1000 ease-linear"
    :style="{ gridTemplateRows: `auto repeat(${SIZE_Y}, ${SIZE_NODE}px) auto` }"
  >
    <div
      class="absolute top-0 left-1/2 transform -translate-x-1/2 z-1 pointer-events-none"
      :style="{
        width: `${SIZE_X * SIZE_NODE + SIZE_X}px`,
        height: `${SIZE_Y * SIZE_NODE + SIZE_Y}px`,
      }"
    >
      <div
        class="absolute top-0 left-0 z-1 w-full h-full bg-white opacity-0"
        :class="{ 'done__anim-mask': status === 'done' }"
      />
      <div
        class="w-full h-full bg-cover"
        :class="[status === 'done' ? 'done__anim-image opacity-100' : 'opacity-0']"
        :style="{ backgroundImage: `url(${imageUrl})` }"
      />
    </div>
    <div
      v-for="(row, rowIdx) in nodes"
      :key="rowIdx"
      class="grid gap-px transition-all duration-1000 ease-linear"
      :style="{ gridTemplateColumns: `auto repeat(${SIZE_X}, ${SIZE_NODE}px) auto` }"
    >
      <div v-for="(node, colIdx) in row" :key="node">
        <div v-if="node === 0" class="w-0 h-0" />
        <div
          v-else-if="node === -1"
          id="void"
          :data-rowIdx="rowIdx"
          :data-colIdx="colIdx"
          :style="{ width: `${SIZE_NODE}px`, height: `${SIZE_NODE}px` }"
        />
        <button
          v-else
          :id="node.toString()"
          :data-rowIdx="rowIdx"
          :data-colIdx="colIdx"
          class="text-white"
          :style="{
            width: `${SIZE_NODE}px`,
            height: `${SIZE_NODE}px`,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: `${SIZE_NODE * SIZE_X}px ${SIZE_NODE * SIZE_Y}px`,
            backgroundPosition: computeBgPosition(node),
            transform: 'translate(0px)',
          }"
          @click="onClickNode($event, rowIdx, colIdx)"
        >
          {{ status === 'done' ? '' : node }}
        </button>
      </div>
    </div>
  </div>
  <div v-if="status === 'done'">Congratulations!</div>
  <ui-contour-lines />
</template>

<style scoped lang="css">
@keyframes done-mask {
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
@keyframes done-image {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  11% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

.done__anim-mask {
  animation: done-mask linear 5s;
}
.done__anim-image {
  animation: done-image linear 5s;
}
</style>
