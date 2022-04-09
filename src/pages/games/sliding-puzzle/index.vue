<script setup lang="ts">
import { Head } from '@vueuse/head';
import { useMyI18n } from '~/plugins/i18n';
import AuthWarning from '../components/auth-warning.vue';
import Records from '../components/records.vue';
import { useRecordsQuery } from './apis/useRecordsQuery';
import CopyRight from './components/copy-right.vue';
import Score from './components/score.vue';
import SelectImage from './components/select-image.vue';
import { useImages } from './composables/useImages';
import { useSlidingPuzzle } from './composables/useSlidingPuzzle';

const { data: records, isLoading: isRecordsLoading } = useRecordsQuery();

const { t } = useMyI18n();

const {
  SHUFFLE_COUNT,
  SIZE_X,
  SIZE_Y,
  clicksCount,
  nodeSize,
  status,
  nodes,
  score,
  time,
  computeBgPosition,
  onClickNode,
  initialize,
} = useSlidingPuzzle();

const { worshipRatioReverse, selectedImageUrl, findImageByUrl, worship, images } = useImages();

watch(
  () => selectedImageUrl.value,
  () => initialize(),
);
</script>

<template>
  <Head>
    <title>{{ t('sliding_puzzle') }} | {{ t('jon_ganebskis_blog') }}</title>
  </Head>
  <div class="mt-20 grid gap-12 place-items-center text-dark-500 dark:text-light-500">
    <h1 class="relative select-none text-3xl md:text-5xl" @click="worship">
      <span class="inline-block worship__inactive">
        {{ t('sliding_puzzle') }}
      </span>
      <span class="inline-block worship__active" aria-hidden="true">
        {{ t('sliding_puzzle') }}
      </span>
    </h1>
    <SelectImage v-model="selectedImageUrl" :images="images" />
    <Score
      class="min-h-20"
      :shuffle-count="SHUFFLE_COUNT"
      :clicks-count="clicksCount"
      :time="time"
      :score="score"
    />
  </div>
  <client-only>
    <div
      class="relative grid gap-px transition-all duration-1000 ease-linear"
      :style="{ gridTemplateRows: `auto repeat(${SIZE_Y}, ${nodeSize}px) auto` }"
    >
      <div
        class="absolute top-0 left-1/2 transform -translate-x-1/2 z-1 pointer-events-none"
        :class="[status === 'done' ? 'shadow-2xl' : 'shadow']"
        :style="{
          width: `${SIZE_X * nodeSize + SIZE_X}px`,
          height: `${SIZE_Y * nodeSize + SIZE_Y}px`,
        }"
      >
        <div
          class="absolute top-0 left-0 z-1 w-full h-full bg-white opacity-0"
          :class="{ 'done__anim-mask': status === 'done' }"
        />
        <div
          class="w-full h-full bg-cover"
          :class="[status === 'done' ? 'done__anim-image opacity-100' : 'opacity-0']"
          :style="{ backgroundImage: `url(${selectedImageUrl})` }"
        />
      </div>
      <div
        v-for="(row, rowIdx) in nodes"
        :key="rowIdx"
        class="grid gap-px transition-all duration-1000 ease-linear"
        :style="{ gridTemplateColumns: `auto repeat(${SIZE_X}, ${nodeSize}px) auto` }"
      >
        <div v-for="(node, colIdx) in row" :key="node">
          <div v-if="node === 0" class="w-0 h-0" />
          <div
            v-else-if="node === -1"
            id="void"
            :data-rowIdx="rowIdx"
            :data-colIdx="colIdx"
            :style="{ width: `${nodeSize}px`, height: `${nodeSize}px` }"
          />
          <button
            v-else
            :id="node.toString()"
            :data-rowIdx="rowIdx"
            :data-colIdx="colIdx"
            class="text-white"
            :style="{
              width: `${nodeSize}px`,
              height: `${nodeSize}px`,
              backgroundImage: `url(${selectedImageUrl})`,
              backgroundSize: `${nodeSize * SIZE_X}px ${nodeSize * SIZE_Y}px`,
              backgroundPosition: computeBgPosition(node),
              transform: 'translate(0px)',
            }"
            @click="onClickNode($event, rowIdx, colIdx)"
          >
            <div class="absolute inset-0 bg-black bg-opacity-50 grid place-items-center">
              {{ status === 'done' ? '' : node }}
            </div>
          </button>
        </div>
      </div>
    </div>
  </client-only>
  <AuthWarning class="mt-2 text-center" />
  <CopyRight :selected-image="findImageByUrl(selectedImageUrl)" />
  <Records :is-loading="isRecordsLoading" :data="records" />
  <ui-contour-lines />
</template>

<style scoped lang="css">
.worship__inactive {
  display: inline-block;
  clip-path: polygon(
    0 0,
    100% 0,
    100% v-bind(worshipRatioReverse + '%'),
    0% v-bind(worshipRatioReverse + '%')
  );
}
.worship__active {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  color: transparent;
  clip-path: polygon(
    0 100%,
    100% 100%,
    100% v-bind(worshipRatioReverse + '%'),
    0% v-bind(worshipRatioReverse + '%')
  );
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(60deg, #e21143, #ffb03a);
}

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
