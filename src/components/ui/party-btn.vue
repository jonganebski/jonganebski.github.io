<script setup lang="ts">
import { computeRandInt } from '~/libs/random';

interface Props {
  content: string;
  maskClass?: string;
  to?: string;
}

const props = withDefaults(defineProps<Props>(), {});

let setIntervalId: NodeJS.Timer;

const hue = ref(0);

const parentClass = 'inline-block overflow-visible group';
const parentStyle = computed(() => ({
  backgroundColor: `hsl(${hue.value}, 100%, 60%)`,
}));

function maskComponent() {
  return h('div', {
    class: `px-8 py-3 bg-white transform border group-hover:translate-x-2 group-hover:translate-y-2 transition-transform ${props.maskClass}`,
    innerHTML: props.content,
  });
}

function onMouseEnter() {
  setIntervalId = setInterval(() => {
    hue.value = computeRandInt(30, 225);
  }, 10);
}

function onMouseLeave() {
  clearInterval(setIntervalId);
}

onBeforeUnmount(() => {
  clearInterval(setIntervalId);
});
</script>

<template>
  <router-link
    v-if="to"
    :to="props.to"
    :style="parentStyle"
    :class="parentClass"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <component :is="maskComponent" />
  </router-link>
  <button
    v-else
    :style="parentStyle"
    :class="parentClass"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <component :is="maskComponent" />
  </button>
</template>
