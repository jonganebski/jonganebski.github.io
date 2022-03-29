<script setup lang="ts">
import Score from './components/score.vue';
import { useImages } from './composables/useImages';
import { useSlidingPuzzle } from './composables/useSlidingPuzzle';

const {
  SHUFFLE_COUNT,
  SIZE_NODE,
  SIZE_X,
  SIZE_Y,
  clickCount,
  status,
  nodes,
  score,
  computeBgPosition,
  onClickNode,
  initialize,
} = useSlidingPuzzle();

const { selectedImage, openBackDoor, images } = useImages();

watch(
  () => selectedImage.value.url,
  () => initialize(),
  { deep: true },
);
</script>

<template>
  <div class="my-10 grid gap-5 place-items-center">
    <button @click="openBackDoor">Back Door</button>
    <div class="w-52">
      <ui-select v-model="selectedImage" label="Image" class="w-56">
        <ui-option-group
          v-for="{ categoryName, options } in images"
          :key="categoryName"
          :category-name="categoryName"
        >
          <ui-option v-for="option in options" :key="option.url" :value="option"></ui-option>
        </ui-option-group>
      </ui-select>
    </div>
    <Score :shuffle-count="SHUFFLE_COUNT" :click-count="clickCount" :score="score" />
  </div>
  <div
    class="relative grid gap-px transition-all duration-1000 ease-linear"
    :style="{ gridTemplateRows: `auto repeat(${SIZE_Y}, ${SIZE_NODE}px) auto` }"
  >
    <div
      class="absolute top-0 left-1/2 transform -translate-x-1/2 z-1 pointer-events-none"
      :class="[status === 'done' ? 'shadow-2xl' : 'shadow']"
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
        :style="{ backgroundImage: `url(${selectedImage.url})` }"
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
            backgroundImage: `url(${selectedImage.url})`,
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
  <div class="mt-4 px-2 text-center">
    <span class="text-sm text-gray-700 dark:text-gray-300">
      Photo by
      <a
        :class="[
          selectedImage.creator?.url
            ? 'underline hover:text-dark-500 dark:hover:text-light-500'
            : 'pointer-events-none',
        ]"
        :href="selectedImage.creator?.url"
        target="_blank"
        rel="noopener"
      >
        {{ selectedImage.creator?.name }}
      </a>
    </span>
    <span class="text-sm text-gray-700 dark:text-gray-300">
      on
      <a
        :class="[
          selectedImage.creator?.url
            ? 'underline hover:text-dark-500 dark:hover:text-light-500'
            : 'pointer-events-none',
        ]"
        :href="selectedImage.provider?.url"
        target="_blank"
        rel="noopener"
      >
        {{ selectedImage.provider?.name }}
      </a>
    </span>
    <p class="text-xs text-gray-500">All rights of the photo belong to the creator.</p>
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
