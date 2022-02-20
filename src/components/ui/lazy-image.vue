<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';

interface Props {
  height?: number;
  width?: number;
  src: string;
}

const props = withDefaults(defineProps<Props>(), { height: 400, width: 600 });

const imgRef = ref<HTMLImageElement | null>(null);

const { stop } = useIntersectionObserver(imgRef, (entries) => {
  const { isIntersecting } = entries[0];
  if (!isIntersecting) return;
  if (!imgRef.value?.dataset.src) return;
  imgRef.value.src = imgRef.value.dataset.src;
  stop();
});
</script>

<template>
  <img
    ref="imgRef"
    :data-src="props.src"
    :height="props.height"
    :width="props.width"
    class="bg-gray-400"
    loading="lazy"
  />
</template>
