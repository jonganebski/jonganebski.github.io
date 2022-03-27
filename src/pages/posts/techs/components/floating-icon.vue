<script setup lang="ts">
import { useElementBounding, useElementVisibility, useWindowSize } from '@vueuse/core';
import { computeRandInt } from '~/libs/random';

const props = defineProps<{ index: number }>();

const iconContainerRef = ref<HTMLSpanElement | null>(null);

const top = computeRandInt(0, 50);
const left = computeRandInt(0, 100);

const { height: windowHeight } = useWindowSize();
const { top: boundingTop } = useElementBounding(iconContainerRef);
const visible = useElementVisibility(iconContainerRef);

const translateY = computed(() => boundingTop.value - windowHeight.value);
const rotate = computed(() => translateY.value / 2.5);
</script>

<template>
  <span
    v-if="2 <= index"
    ref="iconContainerRef"
    class="absolute z-0 inline-block"
    :style="{ top: `${top}%`, left: `${left}%` }"
  >
    <icon-javascript
      v-if="props.index === 2"
      class="w-16 text-yellow-500"
      :style="{ transform: visible ? `translateY(${translateY}px) rotate(${rotate}deg)` : null }"
    />

    <icon-react
      v-if="props.index === 3"
      class="w-16 text-light-blue-500"
      :style="{ transform: visible ? `translateY(${translateY}px) rotate(${rotate}deg)` : null }"
    />

    <icon-typescript
      v-if="props.index === 4"
      v-show="visible"
      class="w-16 text-blue-500"
      :style="{ transform: visible ? `translateY(${translateY}px) rotate(${rotate}deg)` : null }"
    />

    <icon-vue
      v-if="props.index === 5"
      v-show="visible"
      class="w-16 text-green-600"
      :style="{ transform: visible ? `translateY(${translateY}px) rotate(${rotate}deg)` : null }"
    />
  </span>
</template>
