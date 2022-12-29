<script setup lang="ts">
import { MaybeElementRef, useIntersectionObserver } from '@vueuse/core';

interface Props {
  cfVariant?: 'public' | 'post' | 'avatar';
  cfId?: string;
  height?: number;
  width?: number;
  src?: string;
}

const props = withDefaults(defineProps<Props>(), { height: 400, width: 600, cfVariant: 'post' });

const imgRef = ref<HTMLImageElement | null>(null);

const isLoading = ref<boolean>(false);

const { stop } = useIntersectionObserver(imgRef as MaybeElementRef, (entries) => {
  const { isIntersecting } = entries[0];
  if (!isIntersecting) return;
  if (!imgRef.value?.dataset.src) return;
  isLoading.value = true;
  imgRef.value.src = imgRef.value.dataset.src;
  stop();
});
</script>

<template>
  <img
    ref="imgRef"
    :data-src="
      props.cfId
        ? `https://imagedelivery.net/fOEhHq_KNsIgC-hb-3NU0w/${props.cfId}/${props.cfVariant}`
        : props.src
    "
    :height="props.height"
    :width="props.width"
    class="bg-gray-400"
    :class="{ 'animate-pulse': isLoading }"
    loading="lazy"
    @load="isLoading = false"
  />
</template>
